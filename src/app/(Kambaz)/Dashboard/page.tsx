"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { setCourses, addCourse, deleteCourse, updateCourse, enroll, unenroll } from "../Courses/reducer";
import { v4 as uuidv4 } from 'uuid';
import * as client from "../Courses/client";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  FormControl,
} from "react-bootstrap";

//test
export default function Dashboard() {
  const dispatch = useDispatch();

  const { courses, enrollments } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: uuidv4(),
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.png",
    description: "New Description",
  });

  useEffect(() => {
    const savedShowAll = sessionStorage.getItem('showAllCourses');
    if (savedShowAll !== null) {
      setShowAll(JSON.parse(savedShowAll));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('showAllCourses', JSON.stringify(showAll));
  }, [showAll]);

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await client.findMyCourses();
      dispatch(setCourses(fetchedCourses));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = async () => {
    try {
      const newCourse = {
        ...course,
        _id: uuidv4(),
        image: "/images/reactjs.jpg"
      };

      const newCourseData = await client.createCourse(newCourse);
      dispatch(addCourse(newCourseData));
      dispatch(enroll({ user: currentUser, course: newCourseData }));

      setCourse({
        _id: uuidv4(),
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/teslabot.jpg",
        description: "New Description",
      });

      await fetchCourses();
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error("Authentication error: Please sign in again");
        redirect("/Account/Signin");
      } else {
        console.error("Error creating course:", error);
        alert("Failed to create course. Please try again.");
      }
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(deleteCourse(courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      dispatch(updateCourse({ course }));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const isAdminOrFaculty = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  const filteredCourses = showAll
    ? courses
    : courses.filter((course: any) =>
      enrollments.some(
        (enrollment: any) =>
          enrollment.user === currentUser._id &&
          enrollment.course === course._id
      )
    );

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">
        Dashboard
        {!isAdminOrFaculty && (
          <Button
            className="float-end"
            onClick={toggleShowAll}
          >
            {showAll ? "Enrolled Courses" : "All Courses"}
          </Button>
        )}
      </h1>
      <hr />

      {isAdminOrFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update
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
            as="textarea"
            rows={1}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={course.image || "/images/reactjs.png"}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title card-title overflow-hidden text-nowrap">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 50 }}
                    >
                      {course.description}
                    </CardText>

                    <div className="d-flex justify-content-between align-items-center">
                      <button className="btn btn-primary wd-go-button">Go</button>

                      {isAdminOrFaculty && (
                        <>
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              handleDeleteCourse(course._id);
                            }}
                            className="btn btn-danger wd-card-delete-button float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </Button>
                          <Button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 wd-card-edit-button float-end"
                          >
                            Edit
                          </Button>
                        </>
                      )}

                      {!isAdminOrFaculty && (
                        enrollments.some((enrollment: any) =>
                          enrollment.user === currentUser._id && enrollment.course === course._id
                        ) ? (
                          <Button
                            className="btn btn-danger wd-card-delete-button"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(unenroll({ user: currentUser, course }));
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            className="btn btn-success wd-card-delete-button"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(enroll({ user: currentUser, course }));
                            }}
                          >
                            Enroll
                          </Button>
                        )
                      )}
                    </div>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
