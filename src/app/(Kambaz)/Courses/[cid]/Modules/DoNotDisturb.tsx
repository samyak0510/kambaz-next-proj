import { BsSlashCircle } from "react-icons/bs"; // outline circle with a slash

export default function DoNotDisturb() {
  return (
    <span className="me-1 position-relative d-inline-flex align-items-center">
      <BsSlashCircle className="text-secondary fs-5" style={{ top: "2px", position: "relative" }} />
    </span>
  );
}
