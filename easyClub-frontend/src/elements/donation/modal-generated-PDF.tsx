import Modal from "react-bootstrap/Modal";
import GeneratePDF from "./donation-receipt-generate";
import { AppUser } from "../../types/app-user.type";
import { Club } from "../../types/club.type";
import { AccountPosting } from "../../types/account-posting.type";


export default function ModalGeneratedPDF({ show, close, clubs, accountPostings, selectedUser/* , accountPostingsYear */ }:
  { show: boolean, close: () => void; clubs: Club[]; accountPostings: AccountPosting[]; selectedUser: AppUser; /* accountPostingsYear?: AccountPosting[]; */ }) {

  return (
    <>
      <Modal size="lg" show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Spendenbescheinigung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GeneratePDF selectedUser={selectedUser} accountPostings={accountPostings} clubs={clubs} />
        </Modal.Body>
      </Modal>
    </>
  );
}
