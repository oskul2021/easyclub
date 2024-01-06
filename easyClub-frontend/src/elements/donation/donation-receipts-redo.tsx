import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from "react-toastify";
import AccountPostingsService from "../../services/accountPostings.service";
import ClubsService from "../../services/clubs.service";
import UserService from "../../services/user.service";
import { AccountPosting } from "../../types/account-posting.type";
import { AppUser } from "../../types/app-user.type";
import { AuthUser } from "../../types/auth-user.type";
import { Club } from "../../types/club.type";
import donationReceiptGenerateBinary from "./donation-receipt-generate-binary";
import ModalGeneratedPDF from "./modal-generated-PDF";
import zipper from "./donation-receipt-generate-archive-pdf";
import Modal from "react-bootstrap/Modal";
import DonationReceiptGenerateCollection from "./donation-receipt-generate-collection";
import ModalChangeClubDetails from "./modal-change-club-details.element";

export default function DonationReceipts({ user }: { user: AuthUser; }) {
  const [users, setUsers] = useState([] as AppUser[]);
  const [filteredUsers, setFilteredUsers] = useState([] as AppUser[]);
  const [accountPostings, setAccountPostings] = useState([] as AccountPosting[]);
  const [accountPostingsContent, setAccountPostingsContent] = useState([] as any);
  const [clubs, setClubs] = useState([] as Club[]);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState(undefined as number | undefined);
  const [selectedYear, setSelectedYear] = useState(undefined as number | undefined);
  const [years, setYears] = useState([] as number[]);
  const [showChangeClubDetailsModal, setShowChangeClubDetailsModal] = useState(false);
  const [showGeneratedPDFModal, setShowGeneratedPDFModal] = useState(false);
  const [showPDFCollectionModal, setShowPDFCollectionModal] = useState(false);

  const handleShowGeneratedPDFModal = () => setShowGeneratedPDFModal(true);
  const handleCloseGeneratedPDFModal = () => setShowGeneratedPDFModal(false);
  const handleShowChangeClubDetailsModal = () => setShowChangeClubDetailsModal(true);
  const handleCloseChangeClubDetailsModal = () => setShowChangeClubDetailsModal(false);
  const handleShowPDFCollectionModal = (isShown: boolean = true) => setShowPDFCollectionModal(isShown);

  const handleNoUserSelected = () => {
    toast.warn("Please select user!", {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const handleNoYearAndUserSelected = () => {
    toast.warn("Please select year!", {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleSelectYear = (selectedYearVar: number) => {
    setSelectedYear(selectedYearVar);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    const selectedUserIndex = e?.target.value;
    setSelected(parseInt(`${selectedUserIndex}`));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  function getSelectedUserPostings(accountPostings: AccountPosting[], selectedUser: AppUser) {
    return accountPostings.filter((posting) => posting.accountDonor.id === selectedUser.id);
  }

  function getSelectedPostingsByYear() {
    return /* Array.isArray(accountPostings) ?  */accountPostings.filter(posting => moment(posting.bookingFinishedDate).format("YYYY") === `${selectedYear}`) /* : [] */;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, accountPostingsResponse, clubsResponse, accountPostingYearsResponse] =
          await Promise.all([
            UserService.getAllUsers(),
            AccountPostingsService.getAllAccountPostings(),
            ClubsService.getAllClubs(),
            AccountPostingsService.getAccountPostingsYears()
          ]);
        setUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data);
        setAccountPostings(accountPostingsResponse.data);
        setClubs(clubsResponse.data);
        setYears(accountPostingYearsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const searchUser = () => {
      const searched = [...users].filter(user =>
        Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      if (searched.length < filteredUsers.length && searched.length > 0)
        setSelected(0);
      setFilteredUsers(searched);
    };
    searchUser();
  }, [searchValue]);

  return (
    <Container>
      {donationsPerYearView()}
      {donationsByMemberView()}
      <div>
        <Button onClick={handleShowChangeClubDetailsModal} className="me-2">
          Change Club Details
        </Button>
        {clubs.length > 0 && (
          <ModalChangeClubDetails
            show={showChangeClubDetailsModal}
            handleClose={handleCloseChangeClubDetailsModal}
            club={clubs[0]}
          />
        )}
      </div>
      <ToastContainer />
    </Container >
  );

  function donationsByMemberView() {
    return <>
      <div className="border border-3 mb-3 ps-3 pt-2 rounded">
        <div className="ps-3 pe-4">
          <p className="mb-3 lead fs-3">{"Donations by member"}</p>
          {donationsByMemberInputFields(handleSearch, selected, handleShowGeneratedPDFModal, handleNoUserSelected, showGeneratedPDFModal, handleCloseGeneratedPDFModal, filteredUsers, clubs, getSelectedUserPostings, accountPostings)}
          {donationByMemberTableView(filteredUsers, handleSelect)}
        </div>
      </div>
    </>;
  }

  function donationByMemberTableView(filteredUsers: AppUser[], handleSelect: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void) {
    return <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th>Select</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Username</th>
        </tr>
      </thead>

      <tbody>
        {filteredUsers.map((user, index) => (
          <tr key={index}>
            <td>
              <div>
                <input
                  type="radio"
                  value={index}
                  name="selectedUserForReceipt"
                  onChange={handleSelect} />
              </div>
            </td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.username}</td>
          </tr>
        ))}
      </tbody>
    </table>;
  }

  function donationsByMemberInputFields(handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void, selected: number | undefined, handleShowGeneratedPDFModal: () => void, handleNoUserSelected: () => void, showGeneratedPDFModal: boolean, handleCloseGeneratedPDFModal: () => void, filteredUsers: AppUser[], clubs: Club[], getSelectedUserPostings: (accountPostings: AccountPosting[], selectedUser: AppUser) => AccountPosting[], accountPostings: AccountPosting[]) {
    return <>
      <input
        type="text"
        className="me-2"
        id="name"
        placeholder="select member"
        onChange={handleSearch}
      ></input>
      <Button
        variant={(selected !== undefined ? "primary" : "secondary")}
        onClick={(selected !== undefined ? handleShowGeneratedPDFModal : handleNoUserSelected)}
        className="me-2">
        generate receipt
      </Button>
      {selected !== undefined ?
        <ModalGeneratedPDF
          show={showGeneratedPDFModal}
          close={handleCloseGeneratedPDFModal}
          selectedUser={filteredUsers[selected!]}
          clubs={clubs}
          accountPostings={getSelectedUserPostings(accountPostings, filteredUsers[selected!])} /> : null}
    </>;
  }

  function donationsPerYearView() {
    return <div className="border border-3 mb-3 ps-3 pt-2 mt-3 rounded">
      <div className="ps-3 pe-4">
        <p className="mb-3 lead fs-3">{"Donations by year"}</p>
        <div className="d-flex justify-content-between">
          {donationsPerYearButtons()}
        </div>
        {donationsPerYearMemberView()}
      </div>
    </div>;
  }

  function donationsPerYearMemberView() {
    return <>
      {selectedYear && (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            {getSelectedPostingsByYear().map(
              (accountPosting) => (
                <tr key={accountPosting.id}>
                  <td>{`${accountPosting.accountDonor.firstName} ${accountPosting.accountDonor.lastName}`}</td>
                  <td>{accountPosting.amount}</td>
                  <td>
                    {moment(accountPosting.bookingFinishedDate).format(
                      "DD.MM.YYYY"
                    )}
                  </td>
                  <td>{accountPosting.bookingText}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </>;
  }

  function donationsPerYearButtons() {
    return <>
      {yearSelectDropdown()}
      {generateYearReceiptButton()}
    </>;
  }

  async function zipPDF(selectedYear: number | undefined, accountPostings: AccountPosting[], getSelectedPostingsByYear: (accountPostings: AccountPosting[], selectedYear: number) => AccountPosting[]) {
    const { pdfDataArray, userNames } = await generatePDFDataArray(selectedYear, accountPostings, getSelectedPostingsByYear);
    if (pdfDataArray === undefined || selectedYear === undefined || userNames === undefined) return;
    zipper(pdfDataArray, selectedYear, userNames);
  }

  function generateYearReceiptButton() {
    return <>
      <Button
        variant={selectedYear !== undefined ? "primary" : "secondary"}
        onClick={selectedYear !== undefined ? async () => await zipPDF(selectedYear, accountPostings, getSelectedPostingsByYear) : handleNoYearAndUserSelected}
        className="mb-3">
        {selectedYear !== undefined ? `Generate ZIP-File for ${selectedYear}` : "Select year"}
      </Button>
      <Button
        variant={selectedYear !== undefined ? "primary" : "secondary"}
        onClick={selectedYear !== undefined ? () => handleShowPDFCollectionModal(true) : handleNoYearAndUserSelected}
        className="mb-3">
        {selectedYear !== undefined ? `Generate PDF Collection for ${selectedYear}` : "Select year"}
      </Button>
      <Modal size="lg" show={showPDFCollectionModal} onHide={() => handleShowPDFCollectionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Spendenbescheinigungen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DonationReceiptGenerateCollection
            selectedYear={selectedYear}
            accountPostings={accountPostings}
            getSelectedPostingsByYear={getSelectedPostingsByYear}
          />
        </Modal.Body>
      </Modal>
    </>;
  }

  function yearSelectDropdown() {
    return <>
      <Dropdown /* className="mb-3" */>
        <Dropdown.Toggle id="dropdown-basic" bsPrefix='dropdown-toggle'>
          select year
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {years.map(year =>
            <Dropdown.Item
              key={year}
              onClick={() => handleSelectYear(year)}>
              {year}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>;
  }

};

export async function generatePDFDataArray(selectedYear: number | undefined, accountPostings: AccountPosting[], getSelectedPostingsByYear: (accountPostings: AccountPosting[], selectedYear: number) => AccountPosting[]) {
  if (selectedYear === undefined) return {};
  const accountPostingsByYear = getSelectedPostingsByYear(accountPostings, selectedYear);
  const userNames: string[] = accountPostingsByYear.map((accountPosting) => `${accountPosting.accountDonor.firstName}_${accountPosting.accountDonor.lastName}`);
  const pdfDataArray: Uint8Array[] = [];
  for (const accountPosting of accountPostingsByYear) {
    const pdfData = await donationReceiptGenerateBinary(accountPosting);
    pdfDataArray.push(pdfData);
  }
  return { pdfDataArray, userNames };
}