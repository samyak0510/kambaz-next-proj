"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function KambazNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard, requireAuth: true },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid, requireAuth: true },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline, requireAuth: true },
    { label: "Inbox", path: "/Inbox", icon: FaInbox, requireAuth: true },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid, requireAuth: false },
  ];

  const handleProtectedNavigation = (
    e: React.MouseEvent,
    link: { requireAuth?: boolean }
  ) => {
    if (link.requireAuth && !currentUser) {
      e.preventDefault();
      router.push("/Account");
    }
  };

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 105 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Account"
        className={`text-center border-0 bg-black
            ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}
      >
        <FaRegCircleUser
          className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`}
        />
        <br />
        Account
      </ListGroupItem>

      {links.map((link) => (
        <ListGroupItem
          key={`${link.label}-${link.path}`}
          as={Link}
          href={link.path}
          onClick={(e: React.MouseEvent) => handleProtectedNavigation(e, link)}
          className={`bg-black text-center border-0
              ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
