import ConfirmationModal from "../../shared/confirmationModal.element";
import React, { Component, createElement, useEffect, useState } from 'react';
import {
  Col,
  Container,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { BsArrowDown, BsSearch } from 'react-icons/bs';

import userService from '../../../services/user.service';

export default function BoardAdmin(props: any) {
  const sortTypes = {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
  };

  type sortTypeDefined = 'id' | 'firstName' | 'lastName' | 'username';

  const [content, setContent] = useState([] as any);
  const [users, setUsers] = useState([] as any);
  const [selected, setSelected] = useState([] as any);
  const [sortType, setSortType] = useState(sortTypes.firstName as sortTypeDefined);
  const [searchValue, setSearchValue] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSelect = (e: any) => {
    console.log(e.target.value);
    console.log(selected);
    if (!selected.includes(e.target.value))
      setSelected((selected: any) => [...selected, e.target.value]);
    else {
      let index = selected.indexOf(e.target.value);
      setSelected([
        ...selected.slice(0, index),
        ...selected.slice(index + 1, selected.length),
      ]);
    }
  };

  const handleDelete = () => {
    const u = localStorage.getItem('user');
    if (!u) return;
    const userId = JSON.parse(u)['id'];
    userService
      .deleteUsers(selected.filter((s: any) => s !== userId.toString()))
      .then((response) => {
        console.log(response.data);
        setShowConfirmModal(false);
        console.log(JSON.parse(u).id);
        setSelected([
          ...selected.filter(
            (s: any) => s === JSON.parse(u).id.toString()
          ),
        ]);
        console.log(selected);
        return setContent(response.data);
      });
  };

  let handleSort = (e: any, type: any) => {
    if (type !== sortType) {
      setSortType(type);
    } else {
      //TODO hier kann aufsteigende sortierung eingefügt werden
    }
  };

  const handleShowConfirmModal = () => {
    setShowConfirmModal(true);
  };
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const sortUsers = (type: sortTypeDefined) => {
      const sortProperty = sortTypes[type];

      const sorted = [...users].sort((a, b) =>
        a[sortProperty].localeCompare(b[sortProperty])
      );

      setContent(sorted);
    };

    sortUsers(sortType);
  }, [sortType]);

  useEffect(() => {
    userService.getAllUsers().then(
      (response) => {
        setUsers(response.data);
        setSortType(sortTypes.username as sortTypeDefined);
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

  useEffect(() => {
    const searchUser = () => {
      const searched = [...users].filter((user) => {
        return Object.values(user)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setContent(searched);
    };

    searchUser();
  }, [searchValue]);

  return (
    <>
      <Container>
        <Row className="mb-2">
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Action
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShowConfirmModal}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={12} lg={4} className="mt-2 mt-lg-0">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <BsSearch />
              </InputGroup.Text>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                defaultValue={searchValue}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              striped
              bordered
              hover
              responsive
              variant="light"
              style={{ width: 'max-content' }}
            >
              <thead>
                <tr>
                  <th>Select</th>
                  <th>#</th>
                  <th onClick={(e) => handleSort(e, sortTypes.username)}>
                    Username
                    {sortType === sortTypes.username && (
                      <BsArrowDown className="ms-2"></BsArrowDown>
                    )}
                  </th>
                  <th onClick={(e) => handleSort(e, sortTypes.firstName)}>
                    First Name
                    {sortType === sortTypes.firstName && (
                      <BsArrowDown className="ms-2"></BsArrowDown>
                    )}
                  </th>
                  <th onClick={(e) => handleSort(e, sortTypes.lastName)}>
                    Last Name
                    {sortType === sortTypes.lastName && (
                      <BsArrowDown className="ms-2"></BsArrowDown>
                    )}
                  </th>
                  <th>Birthdate</th>
                  <th>Street</th>
                  <th>Postcode</th>
                  <th>City</th>
                  <th>Phone Number</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {content.map((user: any) => (
                  <tr key={user.id}>
                    <td>
                      <Form>
                        <div key={'default-checkbox'}>
                          <Form.Check
                            type="checkbox"
                            id={user.id}
                            value={user.id}
                            onChange={handleSelect}
                          ></Form.Check>
                        </div>
                      </Form>
                    </td>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>
                      {new Date(user.birthDate).toLocaleDateString('en-US')}
                    </td>
                    <td>
                      {user.street} {user.housenumber}
                    </td>
                    <td>{user.postCode}</td>
                    <td>{user.city}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <ConfirmationModal
        show={showConfirmModal}
        title={'Delete Users'}
        text={`Do you really want to delete ${users
          .filter((u: any) => selected.includes(u.id.toString()))
          .map((u: any) => u.username)
          .toString()}`}
        confirmFun={handleDelete}
        cancelFun={handleCloseConfirmModal}
      ></ConfirmationModal>
    </>
  );
}
