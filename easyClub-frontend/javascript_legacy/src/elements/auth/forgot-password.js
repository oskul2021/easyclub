import React from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, Controller, appendErrors } from "react-hook-form";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import authService from "../../services/auth.service";

export default function ForgotPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, setValue, watch, control } = useForm();

  const handleChangePassword = (data) => {
    data.token = searchParams.get("token");
    console.log(data);
    authService.forgotPassword(data);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(handleChangePassword)}>
            <Form.Group
              className="mb-3"
              controllId="passwordForgottenForm.ControlInput1"
              {...register("newPassword")}
            >
              <Form.Label>New Password</Form.Label>
              <Controller
                control={control}
                name="newPassword"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    type="password"
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={appendErrors.newPassword}
                    autoFocus
                  />
                )}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controllId="passwordForgottenForm.ControlInput2"
              {...register("passwordRepeat")}
            >
              <Form.Label>Repeat Password</Form.Label>
              <Controller
                control={control}
                name="passwordRepeat"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    type="password"
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={appendErrors.passwordRepeat}
                    autoFocus
                  />
                )}
              />
            </Form.Group>
            <Button variant="secondary" size="sm" type="submit">
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
