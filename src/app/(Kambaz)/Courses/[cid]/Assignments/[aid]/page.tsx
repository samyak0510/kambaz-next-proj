"use client";

import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";
import FormCheck from "react-bootstrap/FormCheck";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import Link from "next/link";


type Assignment = {
  _id: string;
  title: string;
};



export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignment = (db as any).assignment.find((a: Assignment) => a._id === aid);

  if (!assignment) {
    return <div className="p-4 text-danger">Assignment not found.</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <div className="mb-3">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl id="wd-name" defaultValue={assignment.title} />
        </div>

        <div className="mb-4">
          <FormLabel htmlFor="wd-description">Description</FormLabel>
          <FormControl
            as="textarea"
            id="wd-description"
            rows={6}
            defaultValue={
              "The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, links to each of the lab assignments, link to the Kambaz application, links to all relevant source code repositories, and a link to navigate back to the landing page."
            }
          />
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
          <FormControl id="wd-points" type="number" defaultValue={100} />
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
          <FormSelect id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="PROJECTS">PROJECTS</option>
          </FormSelect>
        </div>

        <div className="mb-4">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
          <FormSelect id="wd-display-grade-as" defaultValue="PERCENTAGE">
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
            <option value="PASS_FAIL">Complete/Incomplete</option>
          </FormSelect>
        </div>

        <div className="mb-4">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
          <FormSelect id="wd-submission-type" defaultValue="ONLINE" className="mb-2">
            <option value="ONLINE">Online</option>
            <option value="ON_PAPER">On Paper</option>
            <option value="NO_SUBMISSION">No Submission</option>
          </FormSelect>

          <div className="small text-muted mb-1">Online Entry Options</div>
          <div className="d-grid gap-2">
            <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" />
            <FormCheck type="checkbox" id="wd-website-url" label="Website URL" />
            <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" />
            <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" />
            <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" />
          </div>
        </div>

        <div className="mb-4">
          <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
          <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" />

          <FormLabel htmlFor="wd-due-date">Due</FormLabel>
          <FormControl id="wd-due-date" type="date" defaultValue="2024-05-13" className="mb-3" />

          <div className="d-flex gap-3 flex-column flex-sm-row">
            <div className="flex-fill">
              <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
              <FormControl id="wd-available-from" type="date" defaultValue="2024-05-06" />
            </div>
            <div className="flex-fill">
              <FormLabel htmlFor="wd-available-until">Until</FormLabel>
              <FormControl id="wd-available-until" type="date" defaultValue="2024-05-20" />
            </div>
          </div>
        </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Link href={`/Courses/${cid}/Assignments`} className="btn btn-light">
              Cancel
            </Link>
            <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
              Save
            </Link>
          </div>
      </Form>
    </div>
  );
}
