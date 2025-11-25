"use client";
import * as client from "../client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
       const [credentials, setCredentials] = useState<any>({});
       const dispatch = useDispatch();
       const router = useRouter();

       const signin = async (e: React.FormEvent) => {
              e.preventDefault();
              const user = await client.signin(credentials);

              if (!user) {
                     alert("Invalid credentials");
                     return;
              }

              dispatch(setCurrentUser(user));
              router.push("/Dashboard");
       };

       return (
              <div id="wd-signin-screen">
                     <h1>Sign in</h1>
                     <form onSubmit={signin}>
                            <FormControl
                                   value={credentials.username || ""}
                                   onChange={(e) =>
                                          setCredentials({ ...credentials, username: e.target.value })
                                   }
                                   id="wd-username"
                                   placeholder="username"
                                   className="mb-2"
                            />
                            <FormControl
                                   value={credentials.password || ""}
                                   onChange={(e) =>
                                          setCredentials({ ...credentials, password: e.target.value })
                                   }
                                   id="wd-password"
                                   placeholder="password"
                                   type="password"
                                   className="mb-2"
                            />
                            <Button id="wd-signin-btn" type="submit" className="w-100">
                                   Sign in
                            </Button>
                     </form>
                     <Link id="wd-signup-link" href="/Account/Signup">
                            Sign up
                     </Link>
              </div>
       );
}
