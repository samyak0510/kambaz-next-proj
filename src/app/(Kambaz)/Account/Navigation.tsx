import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="p-3" style={{ maxWidth: 200 }}>
      <ListGroup className="rounded-0 list-group-flush">
        <ListGroupItem className="border-0 rounded-0 border-start border-3 border-dark">
          <Link href="Signin" className="text-decoration-none text-danger">Signin</Link>
        </ListGroupItem>
        <ListGroupItem className="border-0 rounded-0">
          <Link href="Signup" className="text-decoration-none text-danger">Signup</Link>
        </ListGroupItem>
        <ListGroupItem className="border-0 rounded-0">
          <Link href="Profile" className="text-decoration-none text-danger">Profile</Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
