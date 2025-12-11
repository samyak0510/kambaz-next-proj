"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { findQuizById, findQuestionsForQuiz } from "../../../../client";

// Fisher-Yates shuffle algorithm for randomizing questions
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Timer component for quiz countdown
const QuizTimer = ({ timeLimit, onTimeUp }: { timeLimit: number; onTimeUp: () => void }) => {
    const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // Convert minutes to seconds
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [onTimeUp]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isLowTime = timeRemaining < 60; // Less than 1 minute
    const isCriticalTime = timeRemaining < 30; // Less than 30 seconds

    return (
        <div
            className={`d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${isCriticalTime ? 'bg-danger text-white' :
                    isLowTime ? 'bg-warning text-dark' :
                        'bg-dark text-white'
                }`}
            style={{
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                animation: isCriticalTime ? 'pulse 1s infinite' : 'none'
            }}
        >
            <i className={`bi bi-clock${isCriticalTime ? '-history' : ''}`}></i>
            <span>{formatTime(timeRemaining)}</span>
        </div>
    );
};

export default function Preview() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [i, setI] = useState(0);
    const [locked, setLocked] = useState(false);
    const [answers, setAnswers] = useState<any>({});

    useEffect(() => {
        if (!qid) return;

        const load = async () => {
            try {
                const quizData = await findQuizById(qid as string);
                setQuiz(quizData);

                const allQuestions = await findQuestionsForQuiz(qid as string);
                // Filter out metadata questions from quiz preview
                let quizQuestions = allQuestions.filter((q: any) =>
                    q.title !== "__METADATA__" && q.type !== "metadata"
                );

                // Shuffle questions if shuffle_answers is true
                if (quizData.shuffle_answers) {
                    quizQuestions = shuffleArray(quizQuestions);
                }

                setQuestions(quizQuestions);
            } catch (error: any) {
                if (error.response && error.response.status === 403) {
                    setLocked(true);
                } else {
                    console.error(error);
                }
            }
        };

        load();
    }, [qid]);

    const goBack = () => router.push(`/Courses/${cid}/Quizzes`);

    // Handle time up
    const handleTimeUp = useCallback(() => {
        alert("Time's up! Your quiz will be submitted automatically.");
        router.push(`/Courses/${cid}/Quizzes`);
    }, [cid, router]);

    const submitQuiz = () => {
        alert("Quiz Submitted!");
        router.push(`/Courses/${cid}/Quizzes`);
    };

    // Show locked message for unpublished quizzes (students only)
    if (locked) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning text-center">
                    <h4><i className="bi bi-lock-fill"></i> This quiz is currently locked.</h4>
                    <p>It has not been published by the instructor yet.</p>
                    <button className="btn btn-primary mt-3" onClick={goBack}>Back to Quizzes</button>
                </div>
            </div>
        );
    }

    const q = questions[i];
    return (
        <div className="container mt-4" style={{ maxWidth: "800px" }}>
            {/* Header with Timer */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h3 className="mb-0">{quiz?.title ?? "Quiz"}</h3>
                <div className="d-flex align-items-center gap-3">
                    {/* Timer - only show if time_limit is set */}
                    {quiz?.time_limit && quiz.time_limit > 0 && (
                        <QuizTimer timeLimit={quiz.time_limit} onTimeUp={handleTimeUp} />
                    )}
                    {questions.length > 0 && (
                        <div className="text-muted">
                            <strong>Question {i + 1}</strong> of {questions.length}
                        </div>
                    )}
                </div>
            </div>

            {!q ? (
                <div className="alert alert-info">No questions available.</div>
            ) : (
                <>
                    <div className="card shadow-sm border-secondary mb-4">
                        <div className="card-header bg-light border-bottom d-flex justify-content-between align-items-center">
                            <span className="fw-bold fs-5">{q.title}</span>
                            <span className="badge bg-secondary fs-6">{q.points} pts</span>
                        </div>
                        <div className="card-body p-4">
                            {/* 1. Show Description for ALL types (except fillblanks handled below to avoid dupes if you prefer, 
                                but usually safe to show here. For Fill Blanks we show it specifically inside the block below) */}
                            {q.type !== "fillblanks" && q.description && (
                                <div className="mb-3 p-3 bg-light rounded" dangerouslySetInnerHTML={{ __html: q.description }} />
                            )}

                            {q.type === "mcq" && (
                                <div className="list-group list-group-flush">
                                    {(q.options ?? []).map((o: string, idx: number) => (
                                        <label key={idx} className="list-group-item d-flex gap-3 align-items-center border-0 p-2" style={{ cursor: 'pointer' }}>
                                            <input type="radio" name={q.id} className="form-check-input"
                                                style={{ width: "20px", height: "20px" }}
                                                checked={answers[q.id] === o}
                                                onChange={() => setAnswers({ ...answers, [q.id]: o })} />
                                            <span className="fs-5">{o}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {q.type === "truefalse" && (
                                <div className="list-group list-group-flush">
                                    {["True", "False"].map((opt) => (
                                        <label key={opt} className="list-group-item d-flex gap-3 align-items-center border-0 p-2" style={{ cursor: 'pointer' }}>
                                            <input type="radio" name={q.id} className="form-check-input"
                                                style={{ width: "20px", height: "20px" }}
                                                checked={answers[q.id] === opt}
                                                onChange={() => setAnswers({ ...answers, [q.id]: opt })} />
                                            <span className="fs-5">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* FILL IN THE BLANKS (Updated Logic) */}
                            {q.type === "fillblanks" && (
                                <div>
                                    {/* A. The Text */}
                                    <div className="mb-3 p-3 bg-light rounded lh-lg" dangerouslySetInnerHTML={{ __html: q.description || "" }} />

                                    {/* B. The Inputs (Vertical List) */}
                                    <div className="d-flex flex-column gap-3">
                                        {(() => {
                                            // Calculate how many blanks to show
                                            const count = (q.blanks && q.blanks.length > 0)
                                                ? q.blanks.length
                                                : (q.description?.match(/_{3,}/g) || []).length || 1;

                                            return Array.from({ length: count }).map((_, index) => (
                                                <div key={index} className="row align-items-center">
                                                    <label className="col-auto col-form-label fw-bold text-end" style={{ width: "40px" }}>
                                                        {index + 1}.
                                                    </label>
                                                    <div className="col">
                                                        <input
                                                            className="form-control"
                                                            placeholder={`Answer for blank ${index + 1}`}
                                                            value={answers[q.id]?.[index] || ""}
                                                            onChange={(e) => {
                                                                const current = answers[q.id] || {};
                                                                setAnswers({ ...answers, [q.id]: { ...current, [index]: e.target.value } });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <button className="btn btn-light border" disabled={i === 0} onClick={() => setI(i - 1)}>
                            Previous
                        </button>
                        <button className="btn btn-light border" disabled={i >= questions.length - 1} onClick={() => setI(i + 1)}>
                            Next
                        </button>
                    </div>

                    {/* Question Navigator */}
                    <div className="d-flex flex-wrap gap-1 mb-4">
                        {questions.map((_: any, idx: number) => (
                            <button key={idx}
                                className={`btn btn-sm ${idx === i ? "btn-danger" : "btn-outline-danger"}`}
                                onClick={() => setI(idx)}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    {/* Always Visible Submit Quiz Button */}
                    <div className="d-grid mb-5">
                        <button
                            className="btn btn-success btn-lg py-3"
                            onClick={submitQuiz}
                            style={{
                                boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <i className="bi bi-check-circle me-2"></i>
                            Submit Quiz
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
