import React, { Component, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";
import GroupsService from "../services/groups.service";
import ModalCreateGroup from "./modal-create-group.element";
import ModalEditGroup from "./modal-edit-group.element";
import ModalAddUserToGroup from "./modal-add-user-to-group.element";

export default function ManageGroups(props) {
  const user = props.user;
  const [groups, setGroups] = useState([]);
  const [content, setContent] = useState([]);
  const [to, setTo] = useState(user);
  const [group, setGroup] = useState(user);
  const [users, setUsers] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddUserToGroupModal, setShowAddUserToGroupModal] = useState(false);
console.log(group)
  const handleCloseEditModal = (e) => {
    setShowEditModal(false);
    if (e) setGroups(e);
  };
  const handleShowEditModal = (e) => {
    setGroup(e);
    setShowEditModal(true);
  };

  const handleCloseCreateModal = (e) => {
    console.log(e)
    setShowCreateModal(false);
    if (e) setGroups(e);
  }
  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  }

  const handleCloseAddUserToGroupModal = (e) => {
    setShowAddUserToGroupModal(false);
    if (e) setGroups(e);
  }
  const handleShowAddUserToGroupModal = (e) => {
    setGroup(e);
    GroupsService.getRestUsersOfGroup(e.id).then(
      (response) => {
        setUsers(response.data);
        if (response.data.length == 0) {
          changeMessage("No User Available!", false);
        } else {
          setShowAddUserToGroupModal(true);
        }
      }, (error) => {

      }
    );

  }

  useEffect(() => {

    GroupsService.getAllGroups().then(
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
    }
    else {
      toast.error(message)
    }

  }

  const deleteGroup = (e) => {
    GroupsService.deleteGroup(e.id)
      .then((response) => {
        changeMessage('Successfully Delete Group!', true);
        setGroups(response.data);

      })
      .catch((response) => {
        changeMessage(response.response.data, false);
      });
  }

  const removeUser = (eUser, eGroup) => {
    GroupsService.removeUser(eUser.id, eGroup.id)
      .then((response) => {
        changeMessage('Successfully Remove User!', true);
        setGroups(response.data);

      })
      .catch((response) => {
        changeMessage(response.response.data, false);
      });
  }

  return (
    <Container>
      <Button className="btn-lg mt-2 mb-4 px-5" onClick={handleShowCreateModal}>Create Group</Button>
      {groups.map((group) => (
        <div key={group.id} className="border border-3 mb-3 ps-3 pt-2 rounded">
          <h1 className="mb-3 display-5">{group.name}</h1>
            <div className="ps-3 pe-4">
            <p className="mb-3 lead fs-3">{group.description}</p>
            <Button onClick={() => deleteGroup(group)} className="me-2">Delete Group</Button>
            <Button onClick={() => handleShowEditModal(group)} className="me-2">Edit Group</Button>
            <Button onClick={() => handleShowAddUserToGroupModal(group)} className="me-2">Add User</Button>
            {(group.users.length != 0) ?
              (<table className="table table-striped mt-3">
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
                      <td><Button onClick={() => removeUser(_user, group)}>Remove</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>)
              : ("")}
        </div>
        </div>
      ))}

      <ToastContainer />
      <ModalEditGroup group={group} show={showEditModal} handleClose={handleCloseEditModal} changeMessage={changeMessage} />
      <ModalCreateGroup show={showCreateModal} handleClose={handleCloseCreateModal} changeMessage={changeMessage} />
      <ModalAddUserToGroup group={group} users={users} show={showAddUserToGroupModal} handleClose={handleCloseAddUserToGroupModal} changeMessage={changeMessage} />

    </Container>

  );
}
