import React, { Component, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Dropdown,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import userService from "../services/user.service";
import UserService from "../services/user.service";
export default function BoardAdmin(props: any) {

  type sortedTypesD = "id" | "firstName" | "lastName" | "username";
  const [content, setContent] = useState([] as any);
  const [users, setUsers] = useState([] as any);
  const [selected, setSelected] = useState([] as any);
  const [sortType, setSortType] = useState("firstName");
  const [searchValue, setSearchValue] = useState("");

  const handleSelect = (e: any) => {
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
    console.log(selected);
    userService
      .deleteUsers(selected)
      .then((response) => setContent(response.data));
  };

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const sortUsers = (type: sortedTypesD) => {
      const types = {
        id: "id",
        firstName: "firstName",
        lastName: "lastName",
        username: "username",
      };
      const sortProperty = types[type];

      const sorted = [...users].sort((a, b) =>
        a[sortProperty].localeCompare(b[sortProperty])
      );

      setContent(sorted);
      console.log(sorted);
    };

    sortUsers(sortType as sortedTypesD);
  }, [sortType]);

  useEffect(() => {
    UserService.getAllUsers().then(
      (response) => {
        setUsers(response.data);
        setSortType("username");
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
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setContent(searched);
    };

    searchUser();
  }, [searchValue]);

  return (
    <Container>
      {" "}
      <Row className="mb-2">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Action
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortType("firstName")}>
                Firstname
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setSortType("lastName")}
                href="#/action-2"
              >
                Lastname
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setSortType("username")}
                href="#/action-3"
              >
                Username
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <span>Current Sort-Property: {sortType}</span>
        </Col>
        <Col>
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
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Select</th>
                <th>#</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
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
                      <div key={"default-checkbox"}>
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
                    {new Date(user.birthDate).toLocaleDateString("en-US")}
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
  );
}
