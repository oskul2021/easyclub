// @ts-nocheck
import './group-overview.css';

import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { BsChevronLeft, BsPlusLg } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';

import groupsService from '../../../services/groups.service';
import ManageGroup from './manage-group.element';
import ModalCreateGroup from './modal-create-group.element';

export default function ManageGroupsOverview(props) {
  const user = props.user;
  const [groups, setGroups] = useState([] as any);
  const [showDetail, setShowDetail] = useState({});
  const [content, setContent] = useState([] as any);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    groupsService.getAllGroups().then(
      (response) => {
        setGroups(response.data);
      },
      (error) => {
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        );
      }
    );
  }, []);

  const changeMessage = (message, accepted) => {
    if (accepted) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };
  const handleCloseCreateModal = (e) => {
    if (e) setGroups(e);
    setShowCreateModal(false);
  };

  const returnToOverview = (e) => {
    if (e) setGroups([...groups.filter((g) => g.id !== e)]);
    setShowDetail({});
  };

  return (
    <>
      <Container>
        {Object.keys(showDetail).length === 0 && (
          <>
            <Button className="mb-3" onClick={handleShowCreateModal}>
              <div className="d-flex align-items-center">
                <BsPlusLg className="me-2"></BsPlusLg>
                Create new Group
              </div>
            </Button>
            {groups.length > 0 && (
              <>
                <div className="d-flex justify-content-center justify-content-lg-start align-items-center flex-wrap">
                  {groups
                    .sort((a, b) => {
                      let nameG1 = a.name.toLowerCase();
                      let nameG2 = b.name.toLowerCase();
                      if (nameG1 < nameG2) {
                        return -1;
                      }
                      if (nameG1 > nameG2) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((group) => (
                      <Card
                        key={group.id}
                        className="text-center group-card"
                        onClick={() => setShowDetail(group)}
                      >
                        <Card.Body>
                          <Card.Title
                            className="text-nowrap overflow-hidden"
                            style={{ textOverflow: 'ellipsis' }}
                          >
                            {group.name}
                          </Card.Title>
                          <Card.Text>{group.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                </div>
              </>
            )}
            {groups.length === 0 && (
              <>
                <div className="text-center">
                  <h2
                    style={{
                      color: 'grey',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                    }}
                  >
                    Create a Group !
                  </h2>
                </div>
              </>
            )}
          </>
        )}
        {Object.keys(showDetail).length !== 0 && (
          <>
            <Button
              className="d-flex align-items-center"
              variant="outline-primary"
              onClick={() => setShowDetail({})}
            >
              <BsChevronLeft className="me-1"></BsChevronLeft>Go Back
            </Button>
            <ManageGroup
              user={user}
              group={showDetail}
              goBackFunc={returnToOverview}
            ></ManageGroup>
          </>
        )}
        <ToastContainer />
      </Container>

      <ToastContainer />

      <ModalCreateGroup
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        changeMessage={changeMessage}
      />
    </>
  );
}
