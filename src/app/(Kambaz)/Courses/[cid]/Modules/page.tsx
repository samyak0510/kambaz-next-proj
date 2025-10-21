"use client"


import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsChevronDown } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import * as db from "../../../Database";

import { useParams } from "next/navigation";
export default function Modules() {

  const { cid } = useParams();
  const modules = db.modules;

  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module) => module.course === cid)
          .map((module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {module.name} <ModuleControlButtons />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name} <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}




// <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
//   <div className="wd-title p-3 ps-2 bg-secondary">
//     <BsGripVertical className="fs-3" /> Week 1, Lecture 1 – Course Introduction, Syllabus, Agenda <ModuleControlButtons />
//   </div>
//   <ListGroup className="wd-lessons rounded-0">
//     <ListGroupItem className="wd-lesson p-2 ps-0">
//       <BsGripVertical className="fs-3" />LEARNING OBJECTIVES <LessonControlButtons />
//       <ListGroup className="wd-content list-group-flush rounded-0 mt-2 ms-3">
//         <ListGroupItem className="wd-content-item">Introduction to the course</ListGroupItem>
//         <ListGroupItem className="wd-content-item">Learn what is Web Development</ListGroupItem>
//       </ListGroup>
//     </ListGroupItem>
//     <ListGroupItem className="wd-lesson p-2 ps-0">
//       <BsGripVertical className="fs-3" />READING <LessonControlButtons />
//       <ListGroup className="wd-content list-group-flush rounded-0 mt-2 ms-3">
//         <ListGroupItem className="wd-content-item">Full Stack Developer – Chapter 1 – Introduction</ListGroupItem>
//         <ListGroupItem className="wd-content-item">Full Stack Developer – Chapter 2 – Creating Us</ListGroupItem>
//       </ListGroup>
//     </ListGroupItem>
//     <ListGroupItem className="wd-lesson p-2 ps-0">
//       <BsGripVertical className="fs-3" />SLIDES <LessonControlButtons />
//       <ListGroup className="wd-content list-group-flush rounded-0 mt-2 ms-3">
//         <ListGroupItem className="wd-content-item">Introduction to Web Development</ListGroupItem>
//         <ListGroupItem className="wd-content-item">Creating an HTTP server with Node.js</ListGroupItem>
//         <ListGroupItem className="wd-content-item">Creating a React Application</ListGroupItem>
//       </ListGroup>
//     </ListGroupItem>
//   </ListGroup>
// </ListGroupItem>

// <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
//   <div className="wd-title p-3 ps-2 bg-secondary">
//     <BsGripVertical className="fs-3" /> Week 1, Lecture 2 – Formatting User Interfaces with HTML <ModuleControlButtons />
//   </div>
//   <ListGroup className="wd-lessons rounded-0">
//     <ListGroupItem className="wd-lesson p-2 ps-0">
//       <BsGripVertical className="fs-3" />LEARNING OBJECTIVES <LessonControlButtons />
//       <ListGroup className="wd-content list-group-flush rounded-0 mt-2 ms-3">
//         <ListGroupItem className="wd-content-item">Learn how to create user interfaces with HTML</ListGroupItem>
//         <ListGroupItem className="wd-content-item">Deploy the assignment to Netlify</ListGroupItem>
//       </ListGroup>
//     </ListGroupItem>
//     <ListGroupItem className="wd-lesson p-2 ps-0">
//       <BsGripVertical className="fs-3" />SLIDES <LessonControlButtons />
//       <ListGroup className="wd-content list-group-flush rounded-0 mt-2 ms-3">
//         <ListGroupItem className="wd-content-item">Introduction to HTML and the DOM</ListGroupItem>
//         <ListGroupItem className="wd-content-item">Formatting Web content with Headings</ListGroupItem>
//         <ListGroupItem className="wd-content-item">Formatting content with Lists and Tables</ListGroupItem>
//       </ListGroup>
//     </ListGroupItem>
//   </ListGroup>
// </ListGroupItem>