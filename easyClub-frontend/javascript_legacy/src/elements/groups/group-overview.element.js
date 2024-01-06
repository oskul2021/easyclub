import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import './group-overview.css';

import groupsService from '../../services/groups.service';
import Group from './group.element';
import { BsChevronLeft } from 'react-icons/bs';

export default function GroupOverview(props) {
  const user = props.user;
  const [groups, setGroups] = useState([]);
  const [showDetail, setShowDetail] = useState({});
  const [content, setContent] = useState([]);

  useEffect(() => {
    groupsService.getGroupsOfUser(user.id).then(
      (response) => {
        setGroups(response.data);
        console.log(response.data);
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

  return (
    <>
      <Container>
        {Object.keys(showDetail).length === 0 && groups.length > 0 && (
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
                  You are not assigned to a Group yet.
              </h2>
            </div>
          </>
        )}
        {Object.keys(showDetail).length !== 0 && (
          <>
            {/* <BsChevronDoubleLeft size={16} onClick={() => setShowDetail({})}></BsChevronDoubleLeft> */}
            <Button
              className="d-flex align-items-center mb-3"
              variant="outline-primary"
              onClick={() => setShowDetail({})}
            >
              <BsChevronLeft className="me-1"></BsChevronLeft>Go Back
            </Button>

            <Group user={user} group={showDetail}></Group>
          </>
        )}
        <ToastContainer />
      </Container>
    </>
  );
}
