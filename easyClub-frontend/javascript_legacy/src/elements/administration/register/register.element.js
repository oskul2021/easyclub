import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import AuthService from "../../../services/auth.service";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    setMessage("");
    setSuccessful(false);

    AuthService.register(
      data.firstname,
      data.lastname,
      data.birthdate,
      data.street,
      data.number,
      data.city,
      data.email,
      data.phonenumber,
      data.mobilenumber
    ).then(
      (response) => {
        setSuccessful(true);
        setMessage(response.data.message);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(handleRegister)}>
      <Row xs={1} md={2}>
        <Col>
          <Form.Group>
            <Form.Label htmlFor="fistname">Firstname*</Form.Label>
            <Form.Control
              type="text"
              id="fistname"
              placeholder="Firstname"
              {...register("firstname", {
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label for="lastname">Lastname*</Form.Label>
            <Form.Control
              type="text"
              id="lastname"
              placeholder="Lastname"
              {...register("lastname", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label for="date">Birthdate*</Form.Label>
            <Form.Control
              type="date"
              id="date"
              {...register("birthdate", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label for="street">Street*</Form.Label>
            <Form.Control
              type="text"
              id="street"
              placeholder="Street"
              {...register("street", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label for="number">Housenumber*</Form.Label>
            <Form.Control
              type="number"
              id="number"
              placeholder="Number"
              {...register("number", { required: true })}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label for="postCode">Post Code</Form.Label>
            <Form.Control
              type="text"
              id="postCode"
              placeholder="Postcode"
              {...register("postCode", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label for="city">City*</Form.Label>
            <Form.Control
              type="text"
              id="city"
              placeholder="City"
              {...register("city", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label for="email">Email Address*</Form.Label>
            <Form.Control
              type="email"
              id="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label for="phonenumber">Phone</Form.Label>
            <Form.Control
              type="text"
              id="phonenumber"
              placeholder="Homedigits"
              {...register("phonenumber", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label for="mobilenumber">Mobile</Form.Label>
            <Form.Control
              type="text"
              id="mobilenumber"
              placeholder="Mobiledigits"
              {...register("mobilenumber", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="text-end">
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form.Group>
      {message && <p>{message}</p>}
    </Form>
  );
}
