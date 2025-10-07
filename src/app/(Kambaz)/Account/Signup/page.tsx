import Link from "next/link";
export default function Signup() {
  return (
<div id="wd-signup-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h3 className="mb-3">Sign up</h3>

      <input placeholder="username" className="form-control mb-2" />
      <input placeholder="password" type="password" className="form-control mb-2" />
      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-3"
      />

      <Link href="Profile" className="btn btn-primary w-100 mb-2">
        Signup
      </Link>
      <Link href="Signin">Signin</Link>
    </div>
);}
