/* eslint-disable */
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
    findQuizById,
    updateQuiz,
    setPublished,
    findQuestionsForQuiz
} from "../../../client";
import Details from "./Details";
import QuestionsTab from "./Questions";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    // Editor State (Faculty)
    const [tab, setTab] = useState<"Details" | "Questions">("Details");
    const [quiz, setQuiz] = useState<any>(null);

    // Student/Preview State
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<any>({});

    const load = async () => {
        if (qid) {
            try {
                const data = await findQuizById(qid as string);
                setQuiz(data);

                if (currentUser?.role === "STUDENT") {
                    const qData = await findQuestionsForQuiz(qid as string);
                    setQuestions(qData.filter((q: any) => q.title !== "__METADATA__"));
                }
            } catch (error: any) {
                if (error.response && error.response.status === 403) {
                    setQuiz({ locked: true });
                } else {
                    console.error(error);
                }
            }
        }
    };

    useEffect(() => { load(); }, [qid, currentUser]);

    // Faculty Actions
    const save = async (publish = false) => {
        await updateQuiz(quiz);
        if (publish) await setPublished(qid as string, true);
        router.push(`/Courses/${cid}/Quizzes`);
    };
    const cancel = () => router.push(`/Courses/${cid}/Quizzes`);

    if (!quiz) return <div>Loading…</div>;
    if (quiz.locked) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning text-center">
                    <h4><i className="bi bi-lock-fill"></i> This quiz is currently locked.</h4>
                    <p>It has not been published by the instructor yet.</p>
                    <button className="btn btn-primary mt-3" onClick={cancel}>Back to Quizzes</button>
                </div>
            </div>
        );
    }

    // =========================================================
    // VIEW 1: STUDENT VIEW (With Friend's Look & Feel)
    // =========================================================
    if (currentUser?.role === "STUDENT") {
        const q = questions[currentQuestion];

        const handleAnswer = (questionId: string, answer: any) => {
            setAnswers({ ...answers, [questionId]: answer });
        };

        const submitQuiz = () => {
            alert("Quiz Submitted!");
            router.push(`/Courses/${cid}/Quizzes`);
        };

        return (
            <div className="container mt-4" style={{ maxWidth: "800px" }}>
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                    <h3>{quiz.title}</h3>
                    <div className="text-muted">
                        <strong>Question {currentQuestion + 1}</strong> of {questions.length}
                    </div>
                </div>

                {!q ? (
                    <div className="alert alert-info">No questions available.</div>
                ) : (
                    <div className="card shadow-sm border-secondary mb-4">
                        <div className="card-header bg-light border-bottom d-flex justify-content-between align-items-center">
                            <span className="fw-bold fs-5">{q.title}</span>
                            <span className="badge bg-secondary fs-6">{q.points} pts</span>
                        </div>
                        <div className="card-body p-4">

                            {/* 1. DESCRIPTION TEXT */}
                            {q.description && (
                                <div className="mb-4 lh-lg" dangerouslySetInnerHTML={{ __html: q.description }} />
                            )}

                            <hr />

                            {/* 2. MULTIPLE CHOICE */}
                            {q.type === "mcq" && (
                                <div className="list-group list-group-flush">
                                    {(q.options ?? []).map((o: string, idx: number) => (
                                        <label key={idx} className="list-group-item d-flex gap-3 align-items-center border-0 p-2" style={{ cursor: 'pointer' }}>
                                            <input type="radio" name={q.id} className="form-check-input"
                                                style={{ width: "20px", height: "20px" }}
                                                checked={answers[q.id] === o}
                                                onChange={() => handleAnswer(q.id, o)} />
                                            <span className="fs-5">{o}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* 3. TRUE / FALSE */}
                            {q.type === "truefalse" && (
                                <div className="list-group list-group-flush">
                                    {["True", "False"].map((opt) => (
                                        <label key={opt} className="list-group-item d-flex gap-3 align-items-center border-0 p-2" style={{ cursor: 'pointer' }}>
                                            <input type="radio" name={q.id} className="form-check-input"
                                                style={{ width: "20px", height: "20px" }}
                                                checked={answers[q.id] === opt}
                                                onChange={() => handleAnswer(q.id, opt)} />
                                            <span className="fs-5">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* 4. FILL IN THE BLANKS (Applied Friend's Look & Feel) */}
                            {q.type === "fillblanks" && (
                                <div className="ms-3 mb-3 me-3"> {/* Container spacing from code */}
                                    {(() => {
                                        // Safety check for blanks count
                                        const count = (q.blanks && q.blanks.length > 0)
                                            ? q.blanks.length
                                            : (q.description?.match(/_{3,}/g) || []).length || 1;

                                        return Array.from({ length: count }).map((_, index) => (
                                            <div key={index} className="row">
                                                <div className="col form-blank mb-1">
                                                    {/* Label */}
                                                    <label htmlFor={`blank-${index}`} className="fw-bold">
                                                        {index + 1}.
                                                    </label>

                                                    {/* Input with specific friend's styling classes */}
                                                    <input
                                                        type="text"
                                                        id={`blank-${index}`}
                                                        className="form-control mb-3 ms-3 p-2"
                                                        placeholder="Enter your answer..."
                                                        value={answers[q.id]?.[index] || ""}
                                                        onChange={(e) => {
                                                            const current = answers[q.id] || {};
                                                            handleAnswer(q.id, { ...current, [index]: e.target.value });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ));
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <button className="btn btn-light border" disabled={currentQuestion === 0}
                        onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                        Previous
                    </button>

                    {currentQuestion < questions.length - 1 ? (
                        <button className="btn btn-light border" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                            Next
                        </button>
                    ) : (
                        <button className="btn btn-success px-4" onClick={submitQuiz}>
                            Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // =========================================================
    // VIEW 2: FACULTY VIEW (The Editor)
    // =========================================================
    return (
        <div>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                    <button className={`btn btn-sm me-2 ${tab === "Details" ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => setTab("Details")}>Details</button>
                    <button className={`btn btn-sm ${tab === "Questions" ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => setTab("Questions")}>Questions</button>
                </div>
                <button className="btn btn-sm btn-outline-secondary" onClick={cancel}>Close</button>
            </div>

            {tab === "Details" && (
                <Details
                    quiz={quiz}
                    onChange={setQuiz}
                    onSave={() => save(false)}
                    onSavePublish={() => save(true)}
                    onCancel={cancel}
                />
            )}

            {tab === "Questions" && (
                <QuestionsTab quizId={qid as string} />
            )}
        </div>
    );
}
