"use client";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function EnrollmentControls({
    courseId,
    showAllCourses,
    onEnroll,
    onUnenroll
}: {
    courseId: string;
    showAllCourses: boolean;
    onEnroll: (courseId: string) => void;
    onUnenroll: (courseId: string) => void;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.coursesReducer);

    if (!currentUser || currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
        return null;
    }

    const isEnrolled = enrollments.some(
        (e: any) => e.user === currentUser._id && e.course === courseId
    );

    const handleEnrollment = async (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (isEnrolled) {
            await onUnenroll(courseId);
        } else {
            await onEnroll(courseId);
        }
    };

    if (!showAllCourses && !isEnrolled) {
        return null;
    }

    return (
        <Button
            variant={isEnrolled ? "danger" : "success"}
            size="sm"
            className="mt-2"
            onClick={handleEnrollment}
        >
            {isEnrolled ? "Unenroll" : "Enroll"}
        </Button>
    );
}