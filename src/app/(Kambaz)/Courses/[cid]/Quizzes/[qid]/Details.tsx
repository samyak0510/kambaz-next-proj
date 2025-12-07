"use client";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux"; // Import Redux hook

type Props = {
    quiz: any;
    onChange: (q: any) => void;
    onSave: () => void;
    onSavePublish: () => void;
    onCancel: () => void;
};

export default function Details({ quiz, onChange, onSave, onSavePublish, onCancel }: Props) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const router = useRouter();
    const { cid, qid } = useParams();

    // Check if user is faculty
    const isFaculty = currentUser?.role === "FACULTY";

    const bind = (k: string) => ({
        value: quiz?.[k] ?? "",
        onChange: (e: any) =>
            onChange({ ...quiz, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }),
        disabled: !isFaculty // Disable all inputs for students
    });

    return (
        <div className="d-grid gap-3">
            <label>Title <input className="form-control" {...bind("title")} /></label>
            <label>Description <textarea className="form-control" {...bind("description")} /></label>
            <label>Points <input type="number" className="form-control" {...bind("points")} /></label>

            <label className="form-check">
                <input className="form-check-input" type="checkbox"
                    checked={!!quiz.shuffle_answers}
                    onChange={e => onChange({ ...quiz, shuffle_answers: e.target.checked })}
                    disabled={!isFaculty} />
                <span className="form-check-label">Shuffle answers</span>
            </label>

            <div className="row g-2">
                <div className="col-auto form-check">
                    <input id="timelimit" className="form-check-input" type="checkbox"
                        checked={!!quiz.time_limit}
                        onChange={() => onChange({ ...quiz, time_limit: quiz.time_limit ? 0 : 30 })}
                        disabled={!isFaculty} />
                    <label htmlFor="timelimit" className="form-check-label">Time limit</label>
                </div>
                {quiz.time_limit ? (
                    <div className="col-3">
                        <input type="number" className="form-control" {...bind("time_limit")} placeholder="minutes" />
                    </div>
                ) : null}
            </div>

            <div className="row g-2">
                <div className="col">
                    <label>Due <input type="date" className="form-control" {...bind("due_date")} /></label>
                </div>
                <div className="col">
                    <label>Available <input type="date" className="form-control" {...bind("available_date")} /></label>
                </div>
                <div className="col">
                    <label>Until <input type="date" className="form-control" {...bind("until_date")} /></label>
                </div>
            </div>

            <div className="d-flex gap-2">
                {/* Cancel is available to everyone (to go back) */}
                <button className="btn btn-outline-dark" onClick={onCancel}>Cancel</button>

                {/* SAVE, SAVE & PUBLISH, and PREVIEW are ONLY for FACULTY */}
                {isFaculty && (
                    <>
                        <button className="btn btn-secondary" onClick={onSave}>Save</button>
                        <button className="btn btn-danger" onClick={onSavePublish}>Save & Publish</button>
                        <button className="btn btn-outline-primary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}>Preview</button>
                    </>
                )}
            </div>
        </div>
    );
}
