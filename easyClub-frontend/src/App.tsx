// @ts-nocheck
import './App.css';
import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageGroupsOverview from './elements/administration/groups/manage-group-overview.element';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardAdmin from './elements/administration/board/board-admin.element';
import Register from './elements/administration/register/register.element';
import ForgotPassword from './elements/auth/forgot-password';
import Login from './elements/auth/login.element';
import Logout from './elements/auth/logout.element';
import RequestForgotPassword from './elements/auth/request-forgot-password';
import BoardModerator from './elements/board/board-moderator.element';
import BoardUser from './elements/board/board-user.element';
import GroupOverview from './elements/groups/group-overview.element';
// import DonationReceipts from "./elements/donation/donation-receipts";
import DonationReceipts from "./elements/donation/donation-receipts-redo";
import Home from './elements/home.element';
import NavBar from './elements/navigation/navbar.element';
import Profile from './elements/Profile/profile.element';
import authService from './services/auth.service';
import EventPage from "./elements/eventManagement/eventPage.element";
import DonationImport from './elements/donation/donation-import';

function App() {
  const user = authService.getCurrentUser();

  return (
    <div>
      <NavBar user={user} />
      <div className="container mt-3 d-flex justify-content-center">
        <Routes>
          <Route index path="/home" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/groups" element={<GroupOverview user={user} />} />
          <Route path="/manageGroups" element={<ManageGroupsOverview user={user} />} />
          <Route path="/donationReceipts" element={<DonationReceipts user={user} />} />
          <Route path="/donationImport" element={<DonationImport/>} />
          <Route path="/user" element={<BoardUser user={user} />} />
          <Route path="/mod" element={<BoardModerator user={user} />} />
          {user && <Route path="/admin" element={<BoardAdmin user={user} />} />}
          <Route path="/logout" element={<Logout user={user} />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword user={user} />}
          />
          <Route
            path="/request-forgot-password"
            element={<RequestForgotPassword />}
          />
          <Route path={"/events"} element={<EventPage user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
