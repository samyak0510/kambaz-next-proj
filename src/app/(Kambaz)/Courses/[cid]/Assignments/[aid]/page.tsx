"use client";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  CardBody,
  FormGroup,
} from "react-bootstrap";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setAssignments } from "../reducer";
import * as client from "../../../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const assignments = useSelector((state: any) => state.assignmentReducer.assignments);

  const isNew = aid === "new";
  const editParam = searchParams.get("edit");
  const [isEditMode, setIsEditMode] = useState(isNew || editParam === "true");

  const existingAssignment = assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

  const [assignment, setAssignment] = useState({
    _id: isNew ? "" : existingAssignment?._id || "",
    title: existingAssignment?.title || "New Assignment",
    course: cid as string,
    description: existingAssignment?.description || "The assignment is available online. Submit a link to the landing page of your web application.",
    points: existingAssignment?.points ?? 100,
    group: existingAssignment?.group || "ASSIGNMENTS",
    displayGradeAs: existingAssignment?.displayGradeAs || "Percentage",
    submissionType: existingAssignment?.submissionType || "Online",
    assignTo: existingAssignment?.assignTo || "Everyone",
    dueDate: existingAssignment?.dueDate || "2024-05-13",
    availableFrom: existingAssignment?.availableFrom || "2024-05-06",
    availableUntil: existingAssignment?.availableUntil || "2024-05-20",
    editorDueDate: existingAssignment?.editorDueDate || "",
    editorAvailableFrom: existingAssignment?.editorAvailableFrom || "",
    editorAvailableUntil: existingAssignment?.editorAvailableUntil || "",
  });

  const fetchAssignments = async () => {
    try {
      const fetchedAssignments = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(fetchedAssignments));

      if (!isNew) {
        const fetchedAssignment = fetchedAssignments.find((a: any) => a._id === aid);
        if (fetchedAssignment) {
          setAssignment({
            ...fetchedAssignment,
            editorDueDate: fetchedAssignment.editorDueDate || "",
            editorAvailableFrom: fetchedAssignment.editorAvailableFrom || "",
            editorAvailableUntil: fetchedAssignment.editorAvailableUntil || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleSave = async () => {
    try {
      const assignmentData = {
        ...assignment,
        title: assignment.title,
        dueDate: assignment.editorDueDate ? `${assignment.editorDueDate} at 11:59pm` : assignment.dueDate,
        availableFrom: assignment.editorAvailableFrom ? `${assignment.editorAvailableFrom} at 12:00am` : assignment.availableFrom,
        availableUntil: assignment.editorAvailableUntil ? `${assignment.editorAvailableUntil} at 11:59pm` : assignment.availableUntil,
      };

      if (isNew) {
        const newAssignment = await client.createAssignmentForCourse(cid as string, assignmentData);
        dispatch(setAssignments([...assignments, newAssignment]));
      } else {
        const updatedAssignment = await client.updateAssignment(assignmentData);
        dispatch(setAssignments(assignments.map((a: any) =>
          a._id === updatedAssignment._id ? updatedAssignment : a
        )));
      }

      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  if (!isNew && !existingAssignment) {
    return <div className="p-4 text-danger">Assignment not found.</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container-fluid">
      <Card className="border-0">
        <CardBody className="p-4">
          <Form className="mb-3" id="wd-name">
            <FormLabel>Assignment Name</FormLabel>
            <FormControl
              type="text"
              value={assignment.title}
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
              disabled={!isEditMode}
            />
          </Form>

          <Form className="mb-4" id="wd-description">
            <FormControl
              as="textarea"
              rows={15}
              value={assignment.description}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  description: e.target.value,
                })
              }
              disabled={!isEditMode}
            />
          </Form>

          <Row className="g-3 align-items-start mb-3">
            <Col sm={3} className="text-sm-end">
              <FormLabel className="mt-1" htmlFor="wd-points">
                Points
              </FormLabel>
            </Col>
            <Col sm={9}>
              <FormControl
                id="wd-points"
                type="number"
                value={assignment.points}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    points: Number(e.target.value) || 0,
                  })
                }
                disabled={!isEditMode}
              />
            </Col>
          </Row>

          <Row className="g-3 align-items-start mb-3">
            <Col sm={3} className="text-sm-end">
              <FormLabel htmlFor="wd-group" className="mt-1">
                Assignment Group
              </FormLabel>
            </Col>
            <Col sm={9}>
              <FormSelect
                id="wd-group"
                value={assignment.group}
                onChange={(e) =>
                  setAssignment({ ...assignment, group: e.target.value })
                }
                disabled={!isEditMode}
              >
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </FormSelect>
            </Col>
          </Row>

          <Row className="g-3 align-items-start mb-3">
            <Col sm={3} className="text-sm-end">
              <FormLabel htmlFor="wd-display-grade-as" className="mt-1">
                Display Grade as
              </FormLabel>
            </Col>
            <Col sm={9}>
              <FormSelect
                id="wd-display-grade-as"
                value={assignment.displayGradeAs}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    displayGradeAs: e.target.value,
                  })
                }
                disabled={!isEditMode}
              >
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
              </FormSelect>
            </Col>
          </Row>

          <Row className="g-3 align-items-start mb-4">
            <Col sm={3} className="text-sm-end">
              <FormLabel htmlFor="wd-submission-types" className="mt-1">
                Submission Type
              </FormLabel>
            </Col>
            <Col sm={9}>
              <FormSelect
                id="wd-submission-types"
                className="mb-3"
                value={assignment.submissionType}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    submissionType: e.target.value,
                  })
                }
                disabled={!isEditMode}
              >
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="External Tool">External Tool</option>
              </FormSelect>

              <Card className="border rounded">
                <CardBody className="p-3">
                  <div className="fw-semibold mb-2">Online Entry Options</div>
                  <FormCheck
                    id="wd-text-entry"
                    type="checkbox"
                    label="Text Entry"
                    disabled={!isEditMode}
                  />
                  <FormCheck
                    id="wd-website-url"
                    type="checkbox"
                    label="Website URL"
                    disabled={!isEditMode}
                    defaultChecked
                  />
                  <FormCheck
                    id="wd-media-recordings"
                    type="checkbox"
                    label="Media Recordings"
                    disabled={!isEditMode}
                  />
                  <FormCheck
                    id="wd-student-annotation"
                    type="checkbox"
                    label="Student Annotation"
                    disabled={!isEditMode}
                  />
                  <FormCheck
                    id="wd-file-upload"
                    type="checkbox"
                    label="File Uploads"
                    disabled={!isEditMode}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="g-3 align-items-start mb-3">
            <Col sm={3} className="text-sm-end">
              <FormLabel className="mt-1">Assign</FormLabel>
            </Col>
            <Col sm={9}>
              <Form className="mb-3" id="wd-assign-to">
                <FormLabel>Assign to</FormLabel>
                <FormControl
                  type="text"
                  value={assignment.assignTo}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      assignTo: e.target.value,
                    })
                  }
                  disabled={!isEditMode}
                />
              </Form>

              <Form className="mb-3" id="wd-due-date">
                <FormLabel>Due</FormLabel>
                <FormControl
                  type="date"
                  value={assignment.editorDueDate || assignment.dueDate}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      editorDueDate: e.target.value,
                    })
                  }
                  disabled={!isEditMode}
                />
              </Form>

              <Row className="g-3">
                <Col md={6}>
                  <Form id="wd-available-from">
                    <FormLabel>Available from</FormLabel>
                    <FormControl
                      type="date"
                      value={assignment.editorAvailableFrom || assignment.availableFrom}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          editorAvailableFrom: e.target.value,
                        })
                      }
                      disabled={!isEditMode}
                    />
                  </Form>
                </Col>
                <Col md={6}>
                  <Form id="wd-available-until">
                    <FormLabel>Until</FormLabel>
                    <FormControl
                      type="date"
                      value={assignment.editorAvailableUntil || assignment.availableUntil}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          editorAvailableUntil: e.target.value,
                        })
                      }
                      disabled={!isEditMode}
                    />
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            {isEditMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="btn btn-danger"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-light"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditMode(true)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-secondary"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
