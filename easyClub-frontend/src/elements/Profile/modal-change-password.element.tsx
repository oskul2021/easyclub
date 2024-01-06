import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { appendErrors, Controller, useForm } from 'react-hook-form';

import authService from '../../services/auth.service';

export default function ModalChangePassword(props: any) {

    const { register, handleSubmit, setValue, watch, control } = useForm();
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleClose = () => setShowPasswordModal(false);
    const handleShow = () => setShowPasswordModal(true);

    let currentUser = authService.getCurrentUser();


    const handleChangePassword = (data: any) => {
        authService.changePassword(props.user.id, data.oldPassword, data.newPassword, data.passwordRepeat)
            .then((response) => {
                props.changeMessage(response.data.message, true);
                if (!currentUser) return;
                currentUser.passwordChanged = true;
                localStorage.setItem('user', JSON.stringify(currentUser));
                props.handleClose();
            })
            .catch((response) => {

                props.changeMessage(response.response.data, false);
            });
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleChangePassword)}>
                        <Form.Group className="mb-3" controlId="passwordForm.ControlInput1">
                            <Form.Label>Old Password</Form.Label>
                            <Controller control={control} name="oldPassword" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control type="password" onChange={onChange} value={value} ref={ref}
                                        // isInvalid={appendErrors.oldPassword}
                                        autoFocus />
                                )} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="passwordForm.ControlInput2"
                            {...register("newPassword")}
                        >
                            <Form.Label>New Password</Form.Label>
                            <Controller control={control} name="newPassword" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control type="password" onChange={onChange} value={value} ref={ref}
                                        // isInvalid={appendErrors.newPassword}
                                        autoFocus />
                                )} />

                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="passwordForm.ControlInput2"
                            {...register("passwordRepeat")}
                        >
                            <Form.Label>Repeat Password</Form.Label>
                            <Controller control={control} name="passwordRepeat" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control type="password" onChange={onChange} value={value} ref={ref}
                                        // isInvalid={appendErrors.passwordRepeat}
                                        autoFocus />
                                )} />
                        </Form.Group>
                        <Button variant="secondary" size="sm" type="submit">
                            Change Password
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}
