"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) {
      redirect("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            placeholder="username"
            value={profile.username || ""}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            placeholder="password"
            type="password"
            value={profile.password || ""}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            placeholder="First Name"
            value={profile.firstName || ""}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            placeholder="Last Name"
            value={profile.lastName || ""}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            value={profile.dob || ""}
            onChange={(e) =>
              setProfile({ ...profile, dob: e.target.value })
            }
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            type="email"
            placeholder="Email"
            value={profile.email || ""}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />
          <FormSelect
            className="mb-2"
            id="wd-role"
            value={profile.role || "USER"}
            onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormSelect>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
