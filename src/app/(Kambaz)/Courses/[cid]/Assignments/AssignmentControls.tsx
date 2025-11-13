"use client";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AssignmentControls() {
  const { cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const canEdit =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

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
          id="wd-search-assignment"
        />
      </Form>
      <div className="d-flex">
        <Button
          variant="secondary"
          size="lg"
          className="me-2 px-4"
          id="wd-add-assignment-group"
        >
          <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
          Group
        </Button>
        {canEdit && (
          <Button
            variant="danger"
            size="lg"
            className="px-4"
            id="wd-add-assignment"
            onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
          >
            <FaPlus
              className="me-2 position-relative"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
        )}
      </div>
    </div>
  );
}
