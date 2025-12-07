"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { findQuizById, findQuestionsForQuiz } from "../../../../client";

export default function Preview() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [i, setI] = useState(0);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        if (!qid) return;

        const load = async () => {
            try {
                const quizData = await findQuizById(qid as string);
                setQuiz(quizData);

                const allQuestions = await findQuestionsForQuiz(qid as string);
                // Filter out metadata questions from quiz preview
                const quizQuestions = allQuestions.filter((q: any) =>
                    q.title !== "__METADATA__" && q.type !== "metadata"
                );
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
        <div>
            <h3 className="mb-3">{quiz?.title ?? "Quiz"}</h3>
            {!q ? (
                <div>No questions.</div>
            ) : (
                <>
                    <div className="mb-2 text-muted">Question {i + 1} / {questions.length}</div>
                    <div className="mb-3">
                        <div className="fw-semibold mb-2">{q.title}</div>

                        {/* 1. Show Description for ALL types (except fillblanks handled below to avoid dupes if you prefer, 
                            but usually safe to show here. For Fill Blanks we show it specifically inside the block below) */}
                        {q.type !== "fillblanks" && q.description && (
                            <div className="mb-3 p-3 bg-light rounded" dangerouslySetInnerHTML={{ __html: q.description }} />
                        )}

                        {q.type === "mcq" && (
                            <ul className="list-unstyled">
                                {(q.options ?? []).map((o: string, idx: number) => (
                                    <li key={idx} className="mb-2">
                                        <label className="d-flex align-items-center" style={{ cursor: "pointer" }}>
                                            <input type="checkbox" className="form-check-input me-2" />
                                            {o}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {q.type === "truefalse" && (
                            <div className="d-flex gap-3">
                                <label className="btn btn-outline-secondary">
                                    <input type="radio" name="tf" className="me-2" /> True
                                </label>
                                <label className="btn btn-outline-secondary">
                                    <input type="radio" name="tf" className="me-2" /> False
                                </label>
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
                                                    />
                                                </div>
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="d-flex gap-2 mb-2">
                        <button className="btn btn-outline-dark" disabled={i === 0} onClick={() => setI(i - 1)}>Prev</button>
                        <button className="btn btn-outline-dark" disabled={i === questions.length - 1} onClick={() => setI(i + 1)}>Next</button>
                    </div>

                    <div className="d-flex flex-wrap gap-1">
                        {questions.map((_: any, idx: number) => (
                            <button key={idx}
                                className={`btn btn-sm ${idx === i ? "btn-danger" : "btn-outline-danger"}`}
                                onClick={() => setI(idx)}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
