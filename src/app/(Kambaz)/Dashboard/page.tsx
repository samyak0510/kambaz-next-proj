import Link from "next/link";
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
} from "react-bootstrap";
export default function Dashboard() {


  const courses = db.courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />


      <div
        id="wd-dashboard-courses"
        style={{ paddingLeft: 36, paddingRight: 36, margin: "36px 0" }}
      >

        <Row xs={1} md={5} className="g-4">

          {/* <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS1234 React JS
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/5678/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS5678 Node JS
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    Backend systems and APIs
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/9101/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/teslabot.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS9101 AI & Robotics
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    Artificial Intelligence concepts
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/1121/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS1121 Databases
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    SQL &amp; NoSQL fundamentals
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/3141/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/teslabot.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS3141 Machine Learning
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    Models and training pipelines
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/5161/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS5161 Cloud Computing
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    Scalable systems on the cloud
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/7181/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/teslabot.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS7181 Cybersecurity
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    Protecting modern applications
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col> */}


          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="/images/reactjs.png" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </CardText>
                    <Button variant="primary"> Go </Button>
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
