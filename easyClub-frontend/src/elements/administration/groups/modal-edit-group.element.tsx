import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

import groupsService from '../../../services/groups.service';

export default function ModalEditGroup(props: any) {
  const { register, handleSubmit, setValue, watch, control } = useForm();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  const handleEditGroup = (data: any) => {
    if (data.name.length == 0 || data.description.length == 0) return;

    groupsService
      .editGroup(data, props.group.id)
      .then((response) => {
        props.changeMessage('Successfully Edited Group!', true);
        props.handleClose(response.data);
      })
      .catch((response) => {
        props.changeMessage(response.response.data, false);
      });
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleEditGroup)}>
            <Form.Group className="mb-3" controlId="editForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Controller
                control={control}
                name="name"
                defaultValue={props.group.name}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    autoFocus
                  />
                )}
              />
              <Form.Label className="mt-2">Description</Form.Label>
              <Controller
                control={control}
                name="description"
                defaultValue={props.group.description}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    as="textarea"
                    rows={2}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Form.Group>
            <Button variant="primary" size="sm" type="submit">
              Edit Group
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
