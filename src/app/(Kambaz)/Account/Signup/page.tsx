"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Signup() {
  const router = useRouter();

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/Account/Profile");
  };

  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h3 className="mb-3">Sign up</h3>

      <form onSubmit={handleSignup}>
        <input
          id="wd-username"
          placeholder="username"
          className="form-control mb-2"
          defaultValue="john"
        />
        <input
          id="wd-password"
          placeholder="password"
          type="password"
          className="form-control mb-2"
          defaultValue="password"
        />
        <input
          id="wd-verify-password"
          placeholder="verify password"
          type="password"
          className="form-control mb-3"
        />
        <button
          id="wd-signup-btn"
          type="submit"
          className="btn btn-primary w-100 mb-2"
        >
          Signup
        </button>
      </form>

      <Link id="wd-signin-link" href="/Account/Signin">
        Signin
      </Link>
    </div>
  );
}
