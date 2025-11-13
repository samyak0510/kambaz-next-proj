"use client"
import Link from "next/link";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
 return (
   <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
    <Link href="/Account/Signin" className="list-group-item active border-0"> Signin </Link> <br />
    <Link href="/Account/Signup" className="list-group-item text-danger border-0"> Signup </Link> <br />
    <Link href="/Account/Profile" className="list-group-item text-danger border-0"> Profile </Link> <br />
   </div>
);}