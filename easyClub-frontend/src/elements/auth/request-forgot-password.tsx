import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm, Controller, appendErrors } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import authService from "../../services/auth.service";

export default function RequestForgotPassword() {
  const { register, handleSubmit, setValue, watch, control } = useForm();

  const handleRequest = (data: any) => {
    authService
      .requestPasswordChange(data)
      .then(() => {
        toast.success("Password Reset Link Send Out!");
      })
      .catch(() => {
        toast.error("Something went wront!");
      });
  };
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(handleRequest)}>
            <Form.Group
              className="mb-3"
              controlId="passwordForgottenrequest.ControlInput1"
              {...register("newPassword")}
            >
              <Form.Label>Email</Form.Label>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    type="email"
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    // isInvalid={appendErrors.email}
                    autoFocus
                  />
                )}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="passwordForgottenRequest.ControlInput2"
              {...register("passwordRepeat")}
            >
              <Form.Label>Username</Form.Label>
              <Controller
                control={control}
                name="username"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    // isInvalid={appendErrors.username}
                    autoFocus
                  />
                )}
              />
            </Form.Group>
            <Button variant="secondary" size="sm" type="submit">
              Send me a reset Link!
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
