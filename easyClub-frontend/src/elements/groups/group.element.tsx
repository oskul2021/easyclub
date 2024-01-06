import React, { useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

import ModalWriteMessage from '../modal-write-message.element';

export default function Group(props: any) {
  const user = props.user;
  const group = props.group;
  const [to, setTo] = useState(user);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const handleCloseMessageModal = () => setShowMessageModal(false);

  const handleShowMessageModal = (e: any) => {
    setTo(e);
    setShowMessageModal(true);
  };

  const changeMessage = (message: any, accepted: any) => {
    if (accepted) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-sm-start align-items-center flex-column mb-3">
        <h1 className="display-5">{group.name}</h1>
        <div className="lead fs-3" style={{ color: "grey" }}>{group.description}</div>
      </div>
      <div className="text-center text-lg-start">
        <Button
          variant="primary"
          onClick={() => handleShowMessageModal(group)}
          className="mb-1"
        >
          <FiSend className="me-2"></FiSend>
          Send Group Message
        </Button>
      </div>
      <div className="mt-3 mb-4 d-flex flex-sm-row flex-column">
        {group.users.length > 0 && (
          <>
            {group.users.map((u: any) => (
              <div key={u.id} className="d-flex align-items-center flex-column">
                <Card key={u.id} style={{ width: '16rem' }} className="m-2">
                  <Card.Img
                    variant="top"
                    style={{
                      height: '16rem',
                      borderBottom: '1px solid black',
                      objectFit: 'cover',
                    }}
                    src={
                      u.profilePicture !== ''
                        ? `data:image/jpeg;base64,${u.profilePicture}`
                        : '/defaultPB.jpeg'
                    }
                    key={Date.now()}
                  ></Card.Img>
                  <Card.Body>
                    <Card.Title>{u.firstName + ' ' + u.lastName}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>{u.userName}</ListGroup.Item>
                    <ListGroup.Item>{u.email}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Button
                      className="mt-2"
                      variant="primary"
                      onClick={() => handleShowMessageModal(u)}
                    >
                      <FiSend className="me-2"></FiSend>
                      Send Message
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
      {group.users.length <= 0 && (
        <>
          <div className='text-center mt-5'>
            <h2 style={{ color: 'grey' }}> No other group members </h2>
          </div>
        </>
      )}
      {/* <Table
          striped
          bordered
          hover
          responsive
          variant="light"
          className="mt-3"
        >
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Username</th>
              <th>Email</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {group.users.map((_user) => (
              <tr key={_user.id}>
                <td>{_user.firstName}</td>
                <td>{_user.lastName}</td>
                <td>{_user.userName}</td>
                <td>{_user.email}</td>
                <td>
                  <Button onClick={() => handleShowMessageModal(_user)}>
                    <FiSend></FiSend>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table> */}

      <ModalWriteMessage
        to={to}
        user={user}
        show={showMessageModal}
        handleClose={handleCloseMessageModal}
        changeMessage={changeMessage}
      />
    </>
  );
}
