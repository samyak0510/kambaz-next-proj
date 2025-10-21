import { Button, Form, FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

export default function AssignmentControls() {
  return (
    <div
      id="wd-modules-controls"
      className="d-flex justify-content-between align-items-center mb-4 p-2"
    >
      <Form className="d-flex align-items-center me-3">
        <CiSearch size={28} className="me-2 text-muted" />
        <FormControl
          type="search"
          placeholder="Search..."
          className="p-2"
          style={{ maxWidth: "300px" }}
        />
      </Form>
      <div className="d-flex">
        <Button
          variant="secondary"
          size="lg"
          className="me-2 px-4"
          id="wd-add-module-btn"
        >
          <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
          Group
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="px-4"
          id="wd-add-assignment-btn"
        >
          <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
          Assignment
        </Button>
      </div>
    </div>
  );
}