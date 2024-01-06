import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import accountPostingsService from "../../services/accountPostings.service";
import ClubsService from "../../services/clubs.service";
import UserService from "../../services/user.service";
import ModalChangeClubDetails from "./modal-change-club-details.element";
import ModalGeneratedPDF from "./modal-generated-PDF";

export default function DonationReceipts(props) {
  const user = props.user;

  const [userContent, setUserContent] = useState([]);
  const [users, setUsers] = useState([]);
  const [accountPostings, setAccountPostings] = useState([]);
  const [accountPostingsContent, setAccountPostingsContent] = useState([]);
  const [club, setClub] = useState([]);
  const [clubContent, setClubContent] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const years = [2020, 2021, 2022, 2023];
  const [showChangeClubDetailsModal, setShowChangeClubDetailsModal] =
    useState(false);
  const [showGeneratedPDFModal, setShowGeneratedPDFModal] = useState(false);

  const handleShowGeneratedPDFModal = () => setShowGeneratedPDFModal(true);
  const handleCloseGeneratedPDFModal = () => setShowGeneratedPDFModal(false);

  const handleShowChangeClubDetailsModal = () =>
    setShowChangeClubDetailsModal(true);
  const handleCloseChangeClubDetailsModal = () =>
    setShowChangeClubDetailsModal(false);

  const handleNoUserSelected = () => {
    toast.warn("Please select user!", {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const handleNoYearSelected = () => {
    toast.warn("Please select year!", {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleSelectYear = (selectedYearVar) => {
    // setSelectedYear(selectedYearVar);
    console.log(selectedYear);
  };

  const handleSelect = (e) => {
    // setSelected(e.target.value);
    console.log(e);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  function getSelectedUserPostings(accountPostings, selectedUser) {
    return accountPostings.filter(
      (posting) => posting.accountDonor === selectedUser.id
    );
  }

  function getSelectedPostingsByYear(accountPostings, selectedYear) {
    if (Array.isArray(accountPostings)) {
      return accountPostings.filter(
        (posting) =>
          moment(posting.bookingFinishedDate).format("YYYY") ===
          selectedYear.toString()
      );
    } else {
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, accountPostingsResponse, clubsResponse] =
          await Promise.all([
            UserService.getAllUsers(),
            accountPostingsService.getAllAccountPostings(),
            ClubsService.getAllClubs(),
          ]);

        setUsers(usersResponse.data);
        setAccountPostings(accountPostingsResponse.data);
        setClub(clubsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchUser = () => {
      const searched = [...users].filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setUserContent(searched);
    };

    searchUser();
  }, [searchValue]);

  return (
    <Container>
      {/* <div className="border border-3 mb-3 ps-3 pt-2 mt-3 rounded">
        <div className="ps-3 pe-4">
          <p className="mb-3 lead fs-3">{"Donations by year"}</p>
          <div className="d-flex justify-content-between">
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                select year
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {years.map((year) => (
                  <Dropdown.Item
                    key={year}
                    onClick={() => handleSelectYear(year)}
                  >
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {!selectedYear ? (
              <Button
                variant="secondary"
                onClick={handleNoYearSelected}
                className={"mb-3"}
              >
                generate receipt
              </Button>
            ) : (
              <>
                <Button onClick={handleShowGeneratedPDFModal} className="me-2">
                  generate receipt
                </Button>
                <ModalGeneratedPDF
                  show={showGeneratedPDFModal}
                  close={handleCloseGeneratedPDFModal}
                  club={club}
                  accountPostingsYear={getSelectedPostingsByYear(
                    accountPostings,
                    selectedYear
                  )}
                />
              </>
            )}
          </div>

          {selectedYear && (
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Usage</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {getSelectedPostingsByYear(accountPostings, selectedYear).map(
                  (accountPosting) => (
                    <tr key={accountPosting.id}>
                      <td>{accountPosting.accountDonor}</td>
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
        </div>
      </div> */}

      <div className="border border-3 mb-3 ps-3 pt-2 rounded">
        <div className="ps-3 pe-4">
          <p className="mb-3 lead fs-3">{"Donations by member"}</p>
          <input
            type="text"
            className="me-2"
            id="name"
            placeholder="select member"
            onChange={handleSearch}
          ></input>

          {selected.length == 1 ? (
            <>
              <Button onClick={handleShowGeneratedPDFModal} className="me-2">
                generate receipt
              </Button>
              <ModalGeneratedPDF
                show={showGeneratedPDFModal}
                close={handleCloseGeneratedPDFModal}
                selectedUser={users.at(selected - 1)}
                club={club}
                accountPostingsUser={getSelectedUserPostings(
                  accountPostings,
                  users.at(selected - 1)
                )}
              />
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={handleNoUserSelected}
              className="me-2"
            >
              generate receipt
            </Button>
          )}

          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Select</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
              </tr>
            </thead>

            {userContent.length > 0 ? (
              <tbody>
                {userContent.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          value={user.id}
                          name="selectedUserForReceipt"
                          onChange={handleSelect}
                        />
                      </div>
                    </td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          value={user.id}
                          name="selectedUserForReceipt"
                          onChange={handleSelect}
                        />
                      </div>
                    </td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <div>
        <Button onClick={handleShowChangeClubDetailsModal} className="me-2">
          Change Club Details
        </Button>
        {club.length > 0 && (
          <ModalChangeClubDetails
            show={showChangeClubDetailsModal}
            handleClose={handleCloseChangeClubDetailsModal}
            club={club}
          />
        )}
      </div>
      <ToastContainer />
    </Container>
  );
}
