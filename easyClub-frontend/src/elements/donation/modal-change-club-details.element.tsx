import React from "react";
import { Form, Modal, Button, FormLabel } from "react-bootstrap";
import { useForm, useController, Controller, SubmitHandler, FieldValues } from "react-hook-form";
import clubsService from "../../services/clubs.service";
import { Club } from "../../types/club.type";

export default function ModalChangeClubDetails({ show, handleClose, club }: { show: boolean, handleClose: () => void, club: Club; }) {
  // console.log(props);
  // const club = props.club[0] as any;

  const { register, handleSubmit, setValue } = useForm();

  const handleChangeClub = async (data: any) => {
    try {
      await clubsService.changeClub(club.id, data);
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Club Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleChangeClub)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              defaultValue={club.name}
            /* type="text"
            name="name"
            ref={register}
            onChange={(e) => setValue("name", e.target.value)} */
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Street</Form.Label>
            <Form.Control
              defaultValue={club.street}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Housenumber</FormLabel>
            <Form.Control defaultValue={club.houseNumber}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Postcode</FormLabel>
            <Form.Control defaultValue={club.postCode}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>City</FormLabel>
            <Form.Control defaultValue={club.city}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Tax Office</FormLabel>
            <Form.Control defaultValue={club.taxOffice}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Tax Number</FormLabel>
            <Form.Control defaultValue={club.taxNumber}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Purpose</FormLabel>
            <Form.Control defaultValue={club.purposeOfAssociation}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Change Club Details
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
