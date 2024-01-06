import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { appendErrors, Controller, useForm } from 'react-hook-form';
import groupsService from '../services/groups.service';

export default function ModalWriteMessage(props) {

    const { register, handleSubmit, setValue, watch, control } = useForm();
    const [showMessageModal, setShowMessageModal] = useState(false);

    const handleClose = () => setShowMessageModal(false);
    const handleShow = () => setShowMessageModal(true);

    const handleWriteMessage = (data) => {
        if (data.subject.length == 0 || data.message.length == 0)
            return;
        if (props.to.userName) {
            groupsService.sendUserMessage(props.to.id, props.user.id, data)
                .then((response) => {
                    props.changeMessage('Successfully Send Message!', true);
                    props.handleClose();
                })
                .catch((response) => {
                    props.changeMessage(response.response.data, false);
                });
        }
        else {
            groupsService.sendGroupMessage(props.to.id, props.user.id, data)
                .then((response) => {
                    props.changeMessage('Successfully Send Message!', true);
                    props.handleClose();
                })
                .catch((response) => {
                    props.changeMessage(response.response.data, false);
                });
        }
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Message to {(props.to.userName) ? props.to.firstName + " " + props.to.lastName : props.to.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleWriteMessage)}>
                        <Form.Group className="mb-3" controllid="messageForm.ControlInput1">
                            <Form.Label>Subject</Form.Label>
                            <Controller control={control} name="subject" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control type="text" rows={5} onChange={onChange} value={value} autoFocus />
                                )} />
                            <Form.Label className="mt-2">Message</Form.Label>
                            <Controller control={control} name="message" defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control as="textarea" rows={5} onChange={onChange} value={value} />
                                )} />
                        </Form.Group>
                        <Button size="sm" type="submit">
                            Send Message
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}
