export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <label htmlFor="wd-description">Description</label><br />
      <textarea
        id="wd-description"
        cols={60}
        rows={6}
        defaultValue={
          "The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, links to each of the lab assignments, link to the Kambaz application, links to all relevant source code repositories, and a link to navigate back to the landing page."
        }
      />
      <br /><br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="PROJECTS">PROJECTS</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
                <option value="PASS_FAIL">Complete/Incomplete</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="ON_PAPER">On Paper</option>
                <option value="NO_SUBMISSION">No Submission</option>
              </select>

              <div style={{ marginTop: 8 }}>
                <strong>Online Entry Options</strong><br />
                <input type="checkbox" id="wd-text-entry" />{" "}
                <label htmlFor="wd-text-entry">Text Entry</label><br />
                <input type="checkbox" id="wd-website-url" />{" "}
                <label htmlFor="wd-website-url">Website URL</label><br />
                <input type="checkbox" id="wd-media-recordings" />{" "}
                <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                <input type="checkbox" id="wd-student-annotation" />{" "}
                <label htmlFor="wd-student-annotation">Student Annotation</label><br />
                <input type="checkbox" id="wd-file-upload" />{" "}
                <label htmlFor="wd-file-upload">File Uploads</label>
              </div>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              {/* YYYY-MM-DD */}
              <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" defaultValue="2024-05-06" />{" "}
              <label htmlFor="wd-available-until" style={{ marginLeft: 12 }}>Until</label>{" "}
              <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
            </td>
          </tr>

          <tr>
            <td />
            <td>
              <button type="button">Cancel</button>{" "}
              <button type="submit">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}