"use client";

import Link from "next/link";
import { Button, InputGroup, FormControl, ListGroup, ListGroupItem, Badge } from "react-bootstrap";
import { IoSearchOutline, IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import AssignmentControls from "./AssignmentControls";
import { BsGripVertical } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiNotePencilBold } from "react-icons/pi";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {

  const { cid } = useParams();
  const assignments = db.assignment;
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === cid
  );

  return (

    <div id="wd-assignments">
      <AssignmentControls />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown />
            ASSIGNMENTS
          </div>
          <ListGroup className="wd-assignment-list rounded-0">
            {courseAssignments.map((assignment) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-assignment-list-item p-3 ps-1"
              >
                <BsGripVertical className="me-2 fs-3" />
                <PiNotePencilBold color="green" className="me-2 fs-3" />
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link text-decoration-none"
                >
                  {assignment.title}
                </Link>
                <LessonControlButtons />
                <div className="d-flex flex-column">
                  <small className="text-muted">
                    Assignment Weightage - 5%
                  </small>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}


// <div id="wd-assignments" className="p-3">
//   <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
//     <div style={{ maxWidth: 480 }} className="flex-grow-1">
//       <InputGroup>
//         <InputGroup.Text>
//           <IoSearchOutline />
//         </InputGroup.Text>
//         <FormControl id="wd-search-assignment" placeholder="Search for Assignment" />
//       </InputGroup>
//     </div>

//     <div className="ms-auto d-flex align-items-center gap-2">
//       <Button id="wd-add-assignment-group" variant="secondary">
//         <FaPlus className="me-2" />
//         Group
//       </Button>
//       <Button id="wd-add-assignment" variant="danger">
//         <FaPlus className="me-2" />
//         Assignment
//       </Button>
//     </div>
//   </div>

//   <ListGroup className="rounded-0">
//     <ListGroupItem className="p-0 mb-4 fs-5 border-gray">
//       <div className="p-3 ps-2 bg-secondary d-flex align-items-center">
//         <BsGripVertical className="me-2 fs-3" />
//         <span className="text-uppercase fw-semibold">Assignments</span>
//         <div className="ms-auto d-flex align-items-center gap-2">
//           <Badge bg="light" text="dark" className="px-3 py-2 fw-normal">40% of Total</Badge>
//           <Button variant="light" size="sm" className="border"><FaPlus /></Button>
//           <Button variant="light" size="sm" className="border"><IoEllipsisVertical /></Button>
//         </div>
//       </div>

//       <ListGroup className="rounded-0">
//         <ListGroupItem className="p-3 ps-2 border-0 border-start border-4 border-success">
//           <div className="d-flex align-items-start gap-2">
//             <BsGripVertical className="fs-4 mt-1" />
//             <HiOutlineDocumentText className="text-success fs-4 mt-1" />
//             <div className="flex-fill">
//               <Link href="/Courses/1234/Assignments/123" className="text-decoration-none text-dark">
//                 A1 - ENV + HTML
//               </Link>
//               <div className="text-muted">
//                 <span>Multiple Modules</span>
//                 <span className="mx-2">|</span>
//                 <span><span className="fw-semibold">Not available until</span> May 6 at 12:00am</span>
//               </div>
//               <div className="text-muted">
//                 <span><span className="fw-semibold">Due</span> May 13 at 11:59pm</span>
//                 <span className="mx-2">|</span>
//                 <span>100 pts</span>
//               </div>
//             </div>
//             <div className="text-muted">
//               <FaCheckCircle className="text-success me-2" />
//               <IoEllipsisVertical className="fs-5" />
//             </div>
//           </div>
//         </ListGroupItem>

//         <ListGroupItem className="p-3 ps-2 border-0 border-start border-4 border-success">
//           <div className="d-flex align-items-start gap-2">
//             <BsGripVertical className="fs-4 mt-1" />
//             <HiOutlineDocumentText className="text-success fs-4 mt-1" />
//             <div className="flex-fill">
//               <Link href="/Courses/1234/Assignments/234" className="text-decoration-none text-dark">
//                 A2 - CSS + BOOTSTRAP
//               </Link>
//               <div className="text-muted">
//                 <span>Multiple Modules</span>
//                 <span className="mx-2">|</span>
//                 <span><span className="fw-semibold">Not available until</span> May 13 at 12:00am</span>
//               </div>
//               <div className="text-muted">
//                 <span><span className="fw-semibold">Due</span> May 20 at 11:59pm</span>
//                 <span className="mx-2">|</span>
//                 <span>100 pts</span>
//               </div>
//             </div>
//             <div className="text-muted">
//               <FaCheckCircle className="text-success me-2" />
//               <IoEllipsisVertical className="fs-5" />
//             </div>
//           </div>
//         </ListGroupItem>

//         <ListGroupItem className="p-3 ps-2 border-0 border-start border-4 border-success">
//           <div className="d-flex align-items-start gap-2">
//             <BsGripVertical className="fs-4 mt-1" />
//             <HiOutlineDocumentText className="text-success fs-4 mt-1" />
//             <div className="flex-fill">
//               <Link href="/Courses/1234/Assignments/345" className="text-decoration-none text-dark">
//                 A3 - JAVASCRIPT + REACT
//               </Link>
//               <div className="text-muted">
//                 <span>Multiple Modules</span>
//                 <span className="mx-2">|</span>
//                 <span><span className="fw-semibold">Not available until</span> May 20 at 12:00am</span>
//               </div>
//               <div className="text-muted">
//                 <span><span className="fw-semibold">Due</span> May 27 at 11:59pm</span>
//                 <span className="mx-2">|</span>
//                 <span>100 pts</span>
//               </div>
//             </div>
//             <div className="text-muted">
//               <FaCheckCircle className="text-success me-2" />
//               <IoEllipsisVertical className="fs-5" />
//             </div>
//           </div>
//         </ListGroupItem>
//       </ListGroup>
//     </ListGroupItem>
//   </ListGroup>
// </div>
