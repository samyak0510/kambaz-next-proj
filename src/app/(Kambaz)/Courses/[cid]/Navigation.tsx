"use client"

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname();

  const links = [
    { label: "Home", path: `/Courses/${cid}/Home` },
    { label: "Modules", path: `/Courses/${cid}/Modules` },
    { label: "Piazza", path: `/Courses/${cid}/Piazza` },
    { label: "Zoom", path: `/Courses/${cid}/Zoom` },
    { label: "Assignments", path: `/Courses/${cid}/Assignments` },
    { label: "Quizzes", path: `/Courses/${cid}/Quizzes` },
    { label: "Grades", path: `/Courses/${cid}/Grades` },
    { label: "People", path: `/Courses/${cid}/People/Table` },
  ];

  return (
    // <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">

    //   <Link href="/Courses/1234/Home" id="wd-course-home-link"
    //     className="list-group-item active border-0"> Home </Link>
    //   <Link href="/Courses/1234/Modules" id="wd-course-modules-link"
    //     className="list-group-item text-danger border-0"> Modules </Link>
    //   <Link href="/Courses/1234/Piazza" id="wd-course-piazza-link"
    //     className="list-group-item text-danger border-0"> Piazza </Link>
    //   <Link href="/Courses/1234/Zoom" id="wd-course-zoom-link"
    //     className="list-group-item text-danger border-0"> Zoom </Link>
    //   <Link href="/Courses/1234/Assignments" id="wd-course-assignments-link"
    //     className="list-group-item text-danger border-0"> Assignments </Link>
    //   <Link href="/Courses/1234/Quizzes" id="wd-course-quizzes-link"
    //     className="list-group-item text-danger border-0"> Quizzes </Link>
    //   <Link href="/Courses/1234/People/Table" id="wd-course-people-link"
    //     className="list-group-item text-danger border-0" > People </Link>

    // </div>

    <ListGroup
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      {links.map((link) => (
        <ListGroupItem
          key={link.path}
          as={Link}
          href={link.path}
          id={`wd-course-${link.label.toLowerCase()}-link`}
          className={`${pathname.includes(link.label)
            ? "active border-0"
            : "text-danger"
            }`}
          style={{
            backgroundColor: "transparent", // removes the gray bg
            border: "none",                 // removes the box border
          }}
        >
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>

  );
}
