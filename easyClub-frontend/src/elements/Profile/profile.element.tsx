/* eslint-disable jsx-a11y/alt-text */
import React, { Component, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import authService from "../../services/auth.service";
import userService from "../../services/user.service";
import ModalChangePassword from "./modal-change-password.element";
import ModalChangeUser from "./modal-change-userdetails.element";
import "./profile.css";

export default function Profile(props: any) {
  const user = props.user;
  const { register, handleSubmit } = useForm();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [updatePicture, setUpdatePicture] = useState(
    user.picture !== null
      ? `data:image/jpeg;base64,${user.picture}`
      : "/defaultPB.jpeg"
  );

  const handleClosePasswordModal = () => setShowPasswordModal(false);
  const handleShowPasswordModal = () => setShowPasswordModal(true);

  const handleCloseUserModal = () => setShowUserModal(false);
  const handleShowUserModal = () => setShowUserModal(true);

  useEffect(() => {
    if (!user.passwordChanged)
      toast.warn("Please change your default password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
  }, []);

  const handleChangePassword = (data: any) => {
    authService.changePassword(
      props.user.id,
      data.oldPassword,
      data.newPassword,
      data.passwordRepeat
    );
  };

  const handleChangeUser = (data: any) => {
    userService.changeUser(props.user.id, data);
  };

  const handleUploadProfilePicture = (data: any) => {
    const u = localStorage.getItem("user");
    if (!u) return;
    let userBackup = JSON.parse(u);

    userService.uploadPicture(user.id, data.picture[0]).then((data) => {
      user.picture = data.data;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userBackup, picture: data.data })
      );
      setUpdatePicture(`data:image/jpeg;base64,${user.picture}`);
    });
  };

  const changeMessage = (message: any, accepted: any) => {
    if (accepted) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const changeMessageUser = (message: any, accepted: any) => {
    if (accepted) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <Container style={{ maxWidth: "80%" }}>
      {user ? (
        <>
          <Row>
            <Col xs={12} md={6} lg={4} className="d-flex flex-column">
              <img
                src={updatePicture}
                key={Date.now()}
                height="256px"
                className="mb-3 rounded-3"
                style={{ objectFit: "cover" }}
              />
              <Form onSubmit={handleSubmit(handleUploadProfilePicture)}>
                <label>Change Profile Picture</label>
                <input
                  className="form-control form-control-sm mb-3"
                  {...register("picture", {
                    onChange: handleSubmit(handleUploadProfilePicture),
                  })}
                  name="picture"
                  type="file"
                  accept="image/jpg"
                />
              </Form>
              <Button
                variant="primary"
                size="sm"
                className="mb-3"
                onClick={handleShowPasswordModal}
              >
                Change Password
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="mb-3"
                onClick={handleShowUserModal}
              >
                Change User Details
              </Button>
            </Col>
            <Col>
              <h2>
                <strong>
                  {user.firstname} {user.lastname}
                </strong>
              </h2>
              <Row className="credentials-row gx-0">
                <Col className="credentials-names">Username</Col>
                <Col className="credentials-values">{user.username}</Col>
              </Row>
              <Row className="credentials-row gx-0">
                <Col className="credentials-names">Email</Col>
                <Col className="credentials-values">{user.email}</Col>
              </Row>
              <Row className="credentials-row gx-0">
                <Col className="credentials-names">Street</Col>
                <Col className="credentials-values">
                  {user.street} {user.housenumber}
                </Col>
              </Row>
              <Row className="credentials-row gx-0">
                <Col className="credentials-names">City</Col>
                <Col className="credentials-values">
                  {user.city} {user.postcode}
                </Col>
              </Row>
              <Row className="credentials-row gx-0">
                <Col className="credentials-names">Mobile No.</Col>
                <Col className="credentials-values">{user.phonenumber}</Col>
              </Row>
              <Row className="credentials-row gx-0">
                <Col className="credentials-names">Phone No.</Col>
                <Col className="credentials-values">{user.housenumber}</Col>
              </Row>

              <strong>Privileges:</strong>
              <ul>
                {user.roles &&
                  user.roles.map((role: any, index: any) => <li key={index}>{role}</li>)}
              </ul>
            </Col>
          </Row>

          <Row>
            <Col>
              <p>
                <strong>Token:</strong> {user.token.substring(0, 20)} ...{" "}
                {user.token.substr(user.token.length - 20)}
              </p>
            </Col>
          </Row>
        </>
      ) : (
        <h1>No user logged in</h1>
      )}
      <ToastContainer autoClose={3000} />

      <ModalChangePassword
        user={user}
        show={showPasswordModal}
        handleClose={handleClosePasswordModal}
        handleChangePassword={handleChangePassword}
        changeMessage={changeMessage}
      />
      <ModalChangeUser
        user={user}
        show={showUserModal}
        handleClose={handleCloseUserModal}
        handleChangeUser={handleChangeUser}
        changeMessage={changeMessageUser}
      />
    </Container>
  );
}
