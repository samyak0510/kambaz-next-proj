"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    router.push("/Account/Profile");
  };

  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h3 className="mb-3">Sign up</h3>
      <form onSubmit={handleSignup}>
        <FormControl
          id="wd-username"
          placeholder="username"
          className="mb-2"
          value={user.username || ""}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
          value={user.password || ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <FormControl
          id="wd-verify-password"
          placeholder="verify password"
          type="password"
          className="mb-3"
        />
        <Form.Select
          id="wd-role"
          className="mb-2"
          value={user.role || "STUDENT"}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
        </Form.Select>
        <Button
          id="wd-signup-btn"
          type="submit"
          variant="primary"
          className="w-100 mb-2"
        >
          Signup
        </Button>
      </form>
      <Link id="wd-signin-link" href="/Account/Signin">
        Signin
      </Link>
    </div>
  );
}
