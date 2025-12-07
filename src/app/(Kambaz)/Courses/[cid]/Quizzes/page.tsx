"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux"; // Import Redux hook
import {
    createQuizForCourse, deleteQuiz, findQuizzesForCourse, setPublished
} from "../../client";

export default function Quizzes() {
    const { cid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        if (!cid) return;
        setLoading(true);
        try {
            const data = await findQuizzesForCourse(cid as string);
            if (Array.isArray(data)) {
                data.sort(
                    (a: any, b: any) =>
                        new Date(a.available_date || 0).getTime() -
                        new Date(b.available_date || 0).getTime()
                );
                setQuizzes(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, [cid]);

    const onAdd = async () => {
        const created = await createQuizForCourse(cid as string, {
            title: "New Quiz",
            type: "Graded Quiz",
            points: 0,
            available_date: new Date().toISOString(),
            published: false,
        });
        router.push(`/Courses/${cid}/Quizzes/${created.id}`);
    };

    const onTogglePublish = async (id: string, published: boolean) => {
        await setPublished(id, !published);
        load();
    };

    const onDelete = async (id: string) => {
        await deleteQuiz(id);
        load();
    };

    return (
        <div className="wd-quizzes">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Quizzes</h3>
                {/* Only FACULTY can add quizzes */}
                {currentUser?.role === "FACULTY" && (
                    <button className="btn btn-danger" onClick={onAdd}>+ Quiz</button>
                )}
            </div>

            {loading ? (
                <div>Loading…</div>
            ) : quizzes.length === 0 ? (
                <div className="alert alert-secondary">
                    Empty. {currentUser?.role === "FACULTY" && <span>Click <b>+ Quiz</b> to add one.</span>}
                </div>
            ) : (
                <ul className="list-group">
                    {quizzes.map((q) => (
                        <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                {/* UPDATED LINK LOGIC:
                    Faculty -> /Quizzes/123
                    Student -> /Quizzes/123/Preview 
                */}
                                <Link
                                    href={`/Courses/${cid}/Quizzes/${q.id}${currentUser?.role === "FACULTY" ? "" : "/Preview"}`}
                                    className="fw-semibold text-decoration-none"
                                >
                                    {q.title}
                                </Link>
                                {q.published && <span className="badge bg-success ms-2">✓</span>}
                                <div className="text-muted small">
                                    {(q.type ?? "Graded Quiz")} • {(q.points ?? 0)} pts • Available {q.available_date?.slice(0, 10) ?? "-"}
                                </div>
                            </div>

                            {/* Only FACULTY see admin controls */}
                            {currentUser?.role === "FACULTY" && (
                                <div className="btn-group">
                                    <Link
                                        href={`/Courses/${cid}/Quizzes/${q.id}`}
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/Courses/${cid}/Quizzes/${q.id}/Preview`}
                                        className="btn btn-sm btn-outline-info"
                                    >
                                        Preview
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => onTogglePublish(q.id, q.published)}
                                    >
                                        {q.published ? "Unpublish" : "Publish"}
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => onDelete(q.id)}
                                    >
                                        ⋯ Delete
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
