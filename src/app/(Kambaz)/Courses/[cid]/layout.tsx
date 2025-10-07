import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";

export default async function CoursesLayout({ children, params }: LayoutProps<"/Courses/[cid]">) {
  const { cid } = await params;

  return (
    <div>
      <div id="wd-courses">

        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          Course {cid} </h2> <hr />
        <hr />
        <div className="d-flex">
          <div className="d-none d-md-block">
            <CourseNavigation />

          </div>
          <div className="flex-fill">
            {children}
          </div></div>

      </div>
    </div>
  );
}
