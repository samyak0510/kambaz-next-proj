"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";

import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotePencilBold } from "react-icons/pi";
import { FaTrash, FaPencil} from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";

import AssignmentControls from "./AssignmentControls";
import LessonControlButtons from "../Modules/LessonControlButtons";

import {
  addAssignment,
  editAssignment,
  updateAssignment,
  deleteAssignment,
} from "./reducer";
import { FaCheckCircle } from "react-icons/fa";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: any) => state.assignmentReducer
  );
  const { currentUser } = useSelector(
    (state: any) => state.accountReducer
  );

  const canEdit =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [showDelete, setShowDelete] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );

  const handleAskDelete = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDelete(true);
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
    setAssignmentToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (assignmentToDelete?._id) {
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    setShowDelete(false);
    setAssignmentToDelete(null);
  };

  const handleEditAssignment = (assignmentId: string) => {
    router.push(`/Courses/${cid}/Assignments/${assignmentId}?edit=true`);
  };

  return (
    <div id="wd-assignments">
      <AssignmentControls />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown />
            <span className="ms-1">ASSIGNMENTS</span>
          </div>

          <ListGroup className="wd-assignment-list rounded-0">
            {courseAssignments.map((assignment: any) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-assignment-list-item p-3 ps-1 d-flex align-items-start"
              >
                <div className="d-flex align-items-start gap-2">
                  <BsGripVertical className="fs-3" />
                  <PiNotePencilBold color="green" className="fs-3" />
                  <div className="d-flex flex-column">
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-decoration-none"
                    >
                      {assignment.title}
                    </Link>
                    <small className="text-muted">
                      Assignment Weightage - 5%
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2 ms-auto">
                  <LessonControlButtons />
                  {canEdit && (
                    <>
                      <FaPencil
                        className="text-primary fs-5"
                        onClick={() => handleEditAssignment(assignment._id)}
                        role="button"
                      />
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => handleAskDelete(assignment)}
                        aria-label={`Delete ${assignment.title}`}
                      >
                        <FaTrash className="fs-5" />
                      </Button>
                    </>
                  )}
                  <FaCheckCircle className="text-success" />
                  <BsPlus className="fs-4" />
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={showDelete} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {assignmentToDelete ? (
            <>
              Are you sure you want to delete{" "}
              <strong>{assignmentToDelete.title}</strong>?
            </>
          ) : (
            "Are you sure you want to delete this assignment?"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
