"use client";

import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./BreadCrumb";
import { useSelector } from "react-redux";
import { useParams, redirect } from "next/navigation";
import { Collapse } from "react-bootstrap";


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
        <h2 className="text-danger d-flex align-items-center">
          <button
            type="button"
            className="btn btn-link text-danger p-0 me-3 d-md-none"
            aria-label="Toggle course navigation"
            aria-expanded={showNav}
            onClick={() => setShowNav((prev) => !prev)}
          >
            <FaAlignJustify className="fs-4" />
          </button>
          <span className="d-none d-md-inline me-3">
            <FaAlignJustify
              className="fs-4"
              role="button"
              aria-hidden="true"
            />
          </span>
          <Breadcrumb course={course} />
          {course?.name}
        </h2>
        <hr />
        <hr />
        <div className="d-flex flex-column flex-md-row">
          <div className="d-md-none w-100 mb-3">
            <Collapse in={showNav}>
              <div>
                <CourseNavigation onNavigate={() => setShowNav(false)} />
              </div>
            </Collapse>
          </div>
          <div className="d-none d-md-block me-md-4" style={{ minWidth: 220 }}>
            <CourseNavigation />
          </div>
          <div className="flex-fill">{children}</div>
        </div>
      </div>
    </div>
  );
}
