import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmationModal({ title, text, confirmFun, cancelFun, show }: any) {
	return (
		<>
			<Modal
				show={show}
				onHide={cancelFun}
				dialogClassName="modal-size"
				centered
			>
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{text}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={confirmFun}>Confirm</Button>
					<Button variant="secondary" onClick={cancelFun}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}