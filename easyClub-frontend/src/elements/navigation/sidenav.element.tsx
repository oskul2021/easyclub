import './sidenav.css';

import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { BsChevronDown, BsChevronUp, BsX } from 'react-icons/bs';

export default function SideNav(props: any) {
  const [showLogin, setShowLogin] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showGroupsManager, setShowGroupsManager] = useState(false);
  const [showAdminPages, setShowAdminPages] = useState(false);

  useEffect(() => {
    if (props.user) {
      setShowLogin(false);
      setShowProfile(true);
      setShowLogout(true);
      setShowGroups(true);
      const roles = props.user.roles;
      if (roles.includes("Admin")) {
        setShowRegister(true);
        setShowAdmin(true);
        setShowGroupsManager(true);
      }
    }
  }, [props.user]);

  return (
    <>
      <Nav className="bg-dark sidebar d-flex flex-column justify-content-start align-items-start">
        <BsX
          color="white"
          size={32}
          onClick={props.closeSidenav}
          className="mb-5 ms-3"
        ></BsX>
        <div className='ms-3'>
          {showProfile && <Nav.Link href="/profile">Profile</Nav.Link>}
          {showGroups && <Nav.Link href="/groups">Groups</Nav.Link>}
          {showAdmin && (
            <Nav.Link onClick={() => setShowAdminPages(!showAdminPages)}>
              Administration {showAdminPages ? <BsChevronUp /> : <BsChevronDown />}
            </Nav.Link>
          )}
          {showAdminPages && (
            <>
              <div className="ms-3">
                <Nav.Link href="/admin">Board</Nav.Link>
                <Nav.Link href="/register">Register User</Nav.Link>
                <Nav.Link href="/manageGroups">Manage Groups</Nav.Link>
              </div>
            </>
          )}
        </div>
      </Nav>
      <div onClick={props.closeSidenav} style={{ position: "absolute", top: "0", left: "0", width: "100vw", height: "100vh", zIndex: "99" }}></div>
    </>
  );
}
