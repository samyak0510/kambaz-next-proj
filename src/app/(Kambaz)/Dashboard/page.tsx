import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.png" alt="IDK" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
  <Link href="/Courses/1234" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.png" alt="React course cover" width={200} height={150} />
    <div>
      <h5>CS1234 React JS</h5>
      <p className="wd-dashboard-course-title">Full Stack software developer</p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/5678" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.png" alt="Node course cover" width={200} height={150} />
    <div>
      <h5>CS5678 Node JS</h5>
      <p className="wd-dashboard-course-title">Backend systems and APIs</p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/9101" className="wd-dashboard-course-link">
    <Image src="/images/teslabot.jpg" alt="AI course cover" width={200} height={150} />
    <div>
      <h5>CS9101 AI & Robotics</h5>
      <p className="wd-dashboard-course-title">Artificial Intelligence concepts</p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/1121" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.png" alt="Database course cover" width={200} height={150} />
    <div>
      <h5>CS1121 Databases</h5>
      <p className="wd-dashboard-course-title">SQL & NoSQL fundamentals</p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/3141" className="wd-dashboard-course-link">
    <Image src="/images/teslabot.jpg" alt="ML course cover" width={200} height={150} />
    <div>
      <h5>CS3141 Machine Learning</h5>
      <p className="wd-dashboard-course-title">Models and training pipelines</p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/5161" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.png" alt="Cloud course cover" width={200} height={150} />
    <div>
      <h5>CS5161 Cloud Computing</h5>
      <p className="wd-dashboard-course-title">Scalable systems on the cloud</p>
      <button>Go</button>
    </div>
  </Link>
</div>

<div className="wd-dashboard-course">
  <Link href="/Courses/7181" className="wd-dashboard-course-link">
    <Image src="/images/teslabot.jpg" alt="Cybersecurity course cover" width={200} height={150} />
    <div>
      <h5>CS7181 Cybersecurity</h5>
      <p className="wd-dashboard-course-title">Protecting modern applications</p>
      <button>Go</button>
    </div>
  </Link>
</div>

      </div>
    </div>
);}
