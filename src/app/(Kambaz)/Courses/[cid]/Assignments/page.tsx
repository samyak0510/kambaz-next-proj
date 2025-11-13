"use client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import * as db from "../../../Database";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { BsGripVertical, BsTrash } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiNotePencilBold } from "react-icons/pi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentControls";
import { useState } from "react";
import {
  addAssignment,
  editAssignment,
  updateAssignment,
  deleteAssignment,
} from "./reducer";
import { FaTrash } from "react-icons/fa6";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>("");
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  console.log(typeof (assignments));
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
          <ListGroup id="wd-assignment-list" className="rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-assignment-list-item p-3 ps-1 d-flex align-items-start"
                >
                  <div className="d-flex align-items-start gap-2">
                    <BsGripVertical className="fs-3" />
                    <PiNotePencilBold color="green" className="fs-3" />
                    <div>
                      <Link
                        href={`/Courses/${cid}/Assignments/${assignment._id}`}
                        className="wd-assignment-link text-decoration-none"
                      >
                        {assignment.title}
                      </Link>
                      <div>
                        <small className="text-muted">
                          Example details | 100 pts
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 ms-auto">
                    <LessonControlButtons />
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => handleAskDelete(assignment)}
                      aria-label={`Delete ${assignment.title}`}
                    >
                      <FaTrash className="fs-5" />
                    </Button>
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