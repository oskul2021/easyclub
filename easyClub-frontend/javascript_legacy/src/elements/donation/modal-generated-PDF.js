import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import GeneratePDF from "./donation-receipt-generate";


export default function ModalGeneratedPDF(props) {

  return (
    <>
      <Modal size="lg" show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Spendenbescheinigung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GeneratePDF selectedUser={props.selectedUser} accountPostingsUser={props.accountPostingsUser} club={props.club}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
