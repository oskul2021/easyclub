import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import authService from '../../services/auth.service';
import NavHeadlines from './navHeadlines.element';
import SideNav from './sidenav.element';

export default function NavBar(props) {
  const [showLogin, setShowLogin] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showGroupsManager, setShowGroupsManager] = useState(false);
  const [showSidenav, setShowSidenav] = useState(false);
  const [showDonationReceipts, setShowDonationReceipts] = useState(false);
  const [showEvent, setShowEvent] = useState(false);

  const navigate = useNavigate();

  const logOut = (e) => {
    authService.logout();
    setShowLogin(true);
    setShowLogout(false);
    setShowProfile(false);
    setShowRegister(false);
    setShowAdmin(false);
    setShowGroups(false);
    setShowGroupsManager(false);
    setShowDonationReceipts(false);
    setShowEvent(false);
    navigate("/login");
    changeMessage("Successfully logged out", true);
  };

  useEffect(() => {
    if (props.user) {
      setShowLogin(false);
      setShowProfile(true);
      setShowLogout(true);
      setShowGroups(true);
      setShowEvent(true);
      const roles = props.user.roles;
      if (roles.includes("Admin")) {
        setShowRegister(true);
        setShowAdmin(true);
        setShowGroupsManager(true);
      }
      if (roles.includes("Executive")) {
        setShowDonationReceipts(true);
      }
    }
  }, [props.user]);

  const closeSidenav = () => {
    setShowSidenav(false);
    document.body.classList.remove("no-scroll");
  };

  const openSidenav = () => {
    setShowSidenav(true);
    document.body.classList.add("no-scroll");
  };

  const changeMessage = (message, accepted) => {
    if (accepted) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      {showSidenav && (
        <SideNav user={props.user} closeSidenav={closeSidenav}></SideNav>
      )}
      <Navbar bg="dark" variant="dark">
        <Container className="d-none d-sm-flex">
          <Navbar.Brand href="/home">EasyClub</Navbar.Brand>
          <Nav className="me-auto">
            {showProfile && <Nav.Link href="/profile">Profile</Nav.Link>}
            {showGroups && <Nav.Link href="/groups">Groups</Nav.Link>}
            {showEvent && <Nav.Link href="/events">Events</Nav.Link>}
            {showAdmin && (
              <NavDropdown title="Administration">
                <NavDropdown.Item href="/admin">Board</NavDropdown.Item>
                <NavDropdown.Item href="/register">
                  Register User
                </NavDropdown.Item>
                <NavDropdown.Item href="/manageGroups">
                  Manage Groups
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {showDonationReceipts && <Nav.Link href="/donationReceipts">Donation Receipts</Nav.Link>}
          </Nav>
          <Nav>
            {showLogout && (
              <Nav.Link href="#" onClick={logOut}>
                Logout
              </Nav.Link>
            )}
            {showLogin && <Nav.Link href="/login">Login</Nav.Link>}
          </Nav>
        </Container>
        {/* sidenav */}
        <Container className="d-flex d-sm-none">
          <BsList
            color="white"
            size={25}
            onClick={openSidenav}
          ></BsList>
          <Nav.Link href="/home" style={{ color: "rgba(255,255,255,.75)" }}>
            EasyClub
          </Nav.Link>
          {showLogout && (
            <Nav.Item>
              <Nav.Link
                href="#"
                onClick={logOut}
                style={{ color: "rgba(255,255,255,.75)" }}
              >
                Logout
              </Nav.Link>
            </Nav.Item>
          )}
          {showLogin && <Nav.Link href="/login">Login</Nav.Link>}
        </Container>
      </Navbar>
      <NavHeadlines></NavHeadlines>
      <ToastContainer />

    </>
  );
}
