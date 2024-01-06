import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { appendErrors, Controller, useForm } from 'react-hook-form';

import authService from '../../services/auth.service';
import userService from '../../services/user.service';

export default function ModalChangeUser(props: any) {

    const { register, handleSubmit, setValue, watch, control } = useForm();
    let currentUser = authService.getCurrentUser();
    const handleChangeUser = (data: any) => {
        userService.changeUser(props.user.id, data)
            .then((response) => {
                // props.changeMessage(response.data.message, true);
                // currentUser.passwordChanged = true;
                // console.log(currentUser)
                // localStorage.setItem('user', JSON.stringify(currentUser));
                // props.handleClose();
            })
            .catch((response) => {

                props.changeMessage(response.response.data, false);
            });
    };

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleChangeUser)}>
                    <Form.Group className="mb-3" controlId="userForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Controller control={control} name="email" defaultValue={props.user.email}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control type="text" onChange={onChange} value={value} ref={ref}
                                    // isInvalid={appendErrors.email}
                                    autoFocus />
                            )} />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="userForm.ControlInput2"
                        {...register("street")}
                    >
                        <Form.Label>Street</Form.Label>
                        <Controller control={control} name="street" defaultValue={props.user.street}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control type="text" onChange={onChange} value={value} ref={ref}
                                    // isInvalid={appendErrors.street}
                                    autoFocus />
                            )} />

                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="userForm.ControlInput3"
                        {...register("housenumber")}
                    >
                        <Form.Label>Housenumber</Form.Label>
                        <Controller control={control} name="housenumber" defaultValue={props.user.housenumber}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control type="text" onChange={onChange} value={value} ref={ref}
                                    // isInvalid={appendErrors.housenumber}
                                    autoFocus />
                            )} />

                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="userForm.ControlInput4"
                        {...register("postCode")}
                    >
                        <Form.Label>Postcode</Form.Label>
                        <Controller control={control} name="postCode" defaultValue={props.user.postCode}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control type="text" onChange={onChange} value={value} ref={ref}
                                    // isInvalid={appendErrors.postCode}
                                    autoFocus />
                            )} />

                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="userForm.ControlInput5"
                        {...register("city")}
                    >
                        <Form.Label>City</Form.Label>
                        <Controller control={control} name="city" defaultValue={props.user.city}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control type="text" onChange={onChange} value={value} ref={ref}
                                    // isInvalid={appendErrors.city}
                                    autoFocus />
                            )} />

                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="userForm.ControlInput6"
                        {...register("phonenumber")}
                    >
                        <Form.Label>Phonenumber</Form.Label>
                        <Controller control={control} name="phonenumber" defaultValue={props.user.phonenumber}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control type="number" onChange={onChange} value={value} ref={ref}
                                    // isInvalid={appendErrors.phonenumber}
                                    autoFocus />
                            )} />

                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="userForm.ControlInput7"
                        {...register("mobilenumber")}
                    >
                        <Form.Label>Mobilenumber</Form.Label>
                        <Controller control={control} name="mobilenumber" defaultValue={props.user.mobilenumber}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control type="number" onChange={onChange} value={value} ref={ref}
                                    // isInvalid={appendErrors.mobilenumber}
                                    autoFocus />
                            )} />

                    </Form.Group>
                    <Button variant="secondary" size="sm" type="submit">
                        Change User Details
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
