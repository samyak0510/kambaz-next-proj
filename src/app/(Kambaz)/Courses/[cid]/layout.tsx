"use client";

import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./BreadCrumb";
import { useSelector } from "react-redux";
import { useParams, redirect } from "next/navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();

  const { courses } = useSelector((state: any) => state.reducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector(
    (state: any) => state.enrollmentsReducer
  );

  const course = courses.find((course: any) => course._id === cid);
  const [showNav, setShowNav] = useState(false);

  if (!currentUser) {
    redirect("/Account/Signin");
  }

  if (currentUser.role === "STUDENT") {
    const isEnrolled = enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === cid
    );
    if (!isEnrolled) {
      redirect("/Dashboard");
    }
  }

  return (
    <div>
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify
            className="me-4 fs-4 mb-1"
            onClick={() => setShowNav(!showNav)}
          />
          <Breadcrumb course={course} />
          {course?.name}
        </h2>
        <hr />
        <hr />
        <div className="d-flex">
          <div
            className={
              showNav ? "d-block d-md-block" : "d-none d-md-block"
            }
          >
            <CourseNavigation />
          </div>
          <div className="flex-fill">{children}</div>
        </div>
      </div>
    </div>
  );
}
