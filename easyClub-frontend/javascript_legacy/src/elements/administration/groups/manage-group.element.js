import React, { Component, useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { BsFillTrashFill, BsPencilFill, BsPlus } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';

import GroupsService from '../../../services/groups.service';
import ModalAddUserToGroup from './modal-add-user-to-group.element';
import ModalEditGroup from './modal-edit-group.element';

export default function ManageGroup(props) {
  const user = props.user;
  const [content, setContent] = useState([]);
  const [group, setGroup] = useState(props.group);
  const [to, setTo] = useState(user);
  const [users, setUsers] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddUserToGroupModal, setShowAddUserToGroupModal] = useState(false);

  const handleCloseEditModal = (e) => {
    setShowEditModal(false);
    if (e) setGroup(e);
  };
  const handleShowEditModal = (e) => {
    setGroup(e);
    setShowEditModal(true);
  };

  const handleCloseAddUserToGroupModal = (e) => {
    setShowAddUserToGroupModal(false);
    //TODO change backend
    if (e) setGroup(e.filter((d) => d.id === group.id)[0]);
  };

  const handleShowAddUserToGroupModal = (e) => {
    setGroup(e);
    GroupsService.getRestUsersOfGroup(e.id).then(
      (response) => {
        setUsers(response.data);
        if (response.data.length === 0) {
          changeMessage('No User Available!', false);
        } else {
          setShowAddUserToGroupModal(true);
        }
      },
      (error) => {}
    );
  };

  const changeMessage = (message, accepted) => {
    if (accepted) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const deleteGroup = (e) => {
    GroupsService.deleteGroup(e.id)
      .then((response) => {
        changeMessage('Successfully Delete Group!', true);
        props.goBackFunc(e.id);
      })
      .catch((response) => {
        changeMessage(response.response.data, false);
      });
  };

  const removeUser = (eUser, eGroup) => {
    GroupsService.removeUser(eUser.id, eGroup.id)
      .then((response) => {
        changeMessage('Successfully Remove User!', true);
        setGroup(response.data.filter((d) => d.id === eGroup.id)[0]);
      })
      .catch((response) => {
        changeMessage(response.response.data, false);
      });
  };

  return (
    <>
      <div key={group.id} className="">
        <h1>{group.name}</h1>
        <p className="mb-3 lead fs-4">{group.description}</p>
        <div className="">
          <Button
            onClick={() => handleShowAddUserToGroupModal(group)}
            className="me-2"
          >
            <div className="d-flex align-items-center">
              <BsPlus className="me-2" size={16}></BsPlus>
              Add User
            </div>
          </Button>
          <Button onClick={() => handleShowEditModal(group)} className="me-2">
            <BsPencilFill></BsPencilFill>
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteGroup(group)}
            className="me-2"
          >
            <BsFillTrashFill></BsFillTrashFill>
          </Button>
          <Table
            striped
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
                  <td>{_user.username}</td>
                  <td>{_user.email}</td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => removeUser(_user, group)}
                    >
                      <BsFillTrashFill></BsFillTrashFill>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <ToastContainer />
      <ModalEditGroup
        group={group}
        show={showEditModal}
        handleClose={handleCloseEditModal}
        changeMessage={changeMessage}
      />

      <ModalAddUserToGroup
        group={group}
        users={users}
        show={showAddUserToGroupModal}
        handleClose={handleCloseAddUserToGroupModal}
        changeMessage={changeMessage}
      />
    </>
  );
}
