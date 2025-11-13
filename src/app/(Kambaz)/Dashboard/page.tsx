"use client";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import * as db from "../Database";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  updateCourse,
  deleteCourse,
} from "../Courses/[cid]/reducer";
export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = db;
  const { courses } = useSelector((state: any) => state.reducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          {" "}
          Add{" "}
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update{" "}
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {courses
            .filter((course: any) =>
              enrollments.some(
                (enrollment) =>
                  currentUser?._id && 
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
              )
            )
            .map(
              (course: any) => (
                <Col
                  key={course._id}
                  className="wd-dashboard-course"
                  style={{ width: "300px" }}
                >
                  <Card>
                    <Link
                      href={`/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <CardImg
                        src="/images/pink.jpg"
                        variant="top"
                        width="100%"
                        height={160}
                      />
                      <CardBody className="card-body">
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {course.name}{" "}
                        </CardTitle>
                        <CardText
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}
                        >
                          {course.description}{" "}
                        </CardText>
                        <Button variant="primary"> Go </Button>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            () => dispatch(deleteCourse(course));
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </CardBody>
                    </Link>
                  </Card>
                </Col>
              )
            )}
        </Row>
      </div>
    </div>
  );
}