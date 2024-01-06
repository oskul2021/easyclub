import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Button } from 'react-bootstrap';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import EventService from '../../services/event.service';
import Dropdown from './dropdown';
import ModalCreateEvent from './modal-create-event.element';
import ModalEditEvent from './modal-edit-event.element';

import './events.css';

export default function EventPage() {
	const cols = [] as any;
	const firstDay = 1;
	const [showCalendar, setShowCalendar] = useState(false);
	const [listEvents, setListEvents] = useState(undefined as any);
	//event that needs to be changed, used in order to display the data of the card  when the edit event button is pressed
	const [changedEvent, setChangedEvent] = useState({});
	//date that is selected when you press the calendar to create a event
	const [selectedDate, setSelectedDate] = useState({});
	const [categoryFilter, setCategoryFilter] = useState(
		{ value: 'All Categories', label: 'All Categories' },
		// { value: 'Past Events', label: 'Past Events' },
		// { value: 'Future Events', label: 'Future Events' },
		// { value: 'Events Today', label: 'Events Today' }
	);
	let options = [
		{ value: 'All Categories', label: 'All Categories' },
		{ value: 'Past Events', label: 'Past Events' },
		{ value: 'Future Events', label: 'Future Events' },
		{ value: 'Events Today', label: 'Events Today' }
	];
	let calendarEvents = [] as any;
	let uniqeDateList = [] as any;
	const u = localStorage.getItem('user');
	const role = JSON.parse(`${u}`).roles;
	//takes care of when to show the modal element
	const [showEditModal, setShowEditModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	var now = new Date();
	var today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

	const handleCloseEditModal = (e: any) => {
		setShowEditModal(false);
		setChangedEvent({});

		if (e) {
			e.sort(function (a: any, b: any) {
				return (new Date(a.startdate) as any) - (new Date(b.startdate) as any);
			});
			setListEvents(JSON.parse(JSON.stringify(e)));
		}
	};
	const handleShowEditModal = (e: any) => {
		setShowEditModal(true);
	};
	//when the create new event page is closed new cards are sorted and rendered
	const handleCloseCreateModal = (e: any) => {
		//sort all the events in order to group them by date
		setShowCreateModal(false);

		if (e) {
			e.sort(function (a: any, b: any) {
				return (new Date(a.startdate) as any) - (new Date(b.startdate) as any);
			});
			setListEvents(JSON.parse(JSON.stringify(e)));
		}
	};
	const handleShowCreateModal = () => {
		setShowCreateModal(true);
	};
	//get the data from the backend
	useEffect(() => {
		EventService.getAllEvents().then(
			(response) => {
				//sort all the events in order to group them by date

				response.data.sort(function (a: any, b: any) {
					return (new Date(a.startdate) as any) - (new Date(b.startdate) as any);
				});
				setListEvents(response.data);
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);

	const changeMessage = (message: any, accepted: any) => {
		if (accepted) {
			toast.success(message);
		} else {
			toast.error(message);
		}
	};

	function deleteEvent(id: any) {
		EventService.deleteEvents(id)
			.then((response) => {
				changeMessage('Successfully Deleted Event!', true);
				response.data.sort(function (a: any, b: any) {
					return (new Date(a.startdate) as any) - (new Date(b.startdate) as any);
				});
				setListEvents(response.data);
			})
			.catch((error) => {
				changeMessage('Something went wrong !', false);
			});
	}
	//display date label and group the cards by date
	function eventsDatesList(date: any, id: any) {
		//only display dates that do not repeat
		if (uniqeDateList.filter((e: any) => e.date === date).length > 0) {
			return <h2> { }</h2>;
		} else {
			uniqeDateList.push({ date: date, id: id });

			return <h2 style={{ marginLeft: '3.5em' }}> {date}</h2>;
		}
	}
	//checks if the user has the role Admin, only display buttons if user is admin
	function adminButtons(event: any) {
		if (!role.includes('Admin')) {
			return null;
		}
		return (
			<div>
				<Button
					onClick={() => {
						if (window.confirm(`Are you sure you want to delete the event '${event.name}'?`)) {
							deleteEvent(event.id);
						}
					}}
					className="me-2"
				>
					Delete
				</Button>
				<Button
					onClick={() => {
						setChangedEvent(event);
						handleShowEditModal(event);
					}}
					className="me-2"
				>
					Edit Event
				</Button>
			</div>
		);
	}

	//checks if the user has the role Admin, only display buttons if user is admin
	function createEventButton() {
		for (const element of role) {
			if (element === 'Admin') {
				return (
					<div>
						<Button
							className="btn-lg mt-2 mb-4 px-5"
							onClick={handleShowCreateModal}
							style={{ marginRight: '35em' }}
						>
							Create Event
						</Button>
					</div>
				);
			}
		}
	}

	function renderCards(event: any) {
		let isAllDay = '';
		let isInPast = '';
		//if the event is in the past this is labeld as expired
		if (new Date(event.enddate) < new Date()) {
			isInPast = 'expired';
		}
		if (event.allday) {
			isAllDay = 'all day event';
		}
		cols.push(
			<Container className="container" style={{ marginTop: '5em', marginLeft: '30%' }}>
				{eventsDatesList(event.startdate, event.id)}
				<div>
					<div className="card " style={{ margin: '2em', width: '20em' }}>
						<div key={event.id} className="card-body ">
							<p className="card-text">
								<strong style={{ color: 'grey' }}>{isInPast}</strong>
							</p>
							<p className="card-text">
								<strong style={{ color: 'grey' }}>{isAllDay}</strong>
							</p>
							<p className="card-text">
								<strong>Name:</strong> {event.name}
							</p>
							<p className="card-text">
								<strong>Category:</strong> {event.category}
							</p>
							<p className="card-text">
								<strong>Location:</strong> {event.location}
							</p>
							<p className="card-text">
								<strong>Start:</strong> {event.startdate} {event.allday ? '' : `: ${event.starttime}`}
							</p>
							<p className="card-text">
								<strong>End:</strong> {event.enddate} {event.allday ? '' : `: ${event.endtime}`}
							</p>
							<p className="card-text">
								<strong>Description:</strong> {event.description}
							</p>
						</div>
						{adminButtons(event)}
					</div>
				</div>
			</Container>
		);
	}
	function generateCalendarEvents(event: any) {
		let eventData = {
			title: event.name,
			id: event.id,
			start: event.startdate,
			end: event.enddate,
			backgroundColor: event.color,
			textColor: 'black',
			allDay: event.allday
		};
		if (event.starttime)
			if (event.starttime.length > 0) {
				eventData.start += `T${event.starttime}:00`;
				eventData.end += `T${event.endtime}:00`;
			}

		calendarEvents.push(eventData);
	}

	// iterate cards, insert the events in to the calendar and render depending on the category
	function generateCardsBasedOnCategory() {
		listEvents.forEach((event: any) => {
			let showEvent = false;
			switch (categoryFilter.value) {
				case 'Events Today':
					showEvent =
						(new Date(event.startdate).getTime() <= now.getTime() &&
							new Date(event.enddate).getTime() >= today.getTime()) ||
						new Date(event.startdate).getTime() === today.getTime();
					break;
				case 'Past Events':
					showEvent = new Date(event.enddate).getTime() < today.getTime();
					break;
				case 'Future Events':
					showEvent = new Date(event.startdate).getTime() > new Date().getTime();
					break;
				case event.category:
					showEvent = true;
					break;
				case 'All Categories':
					showEvent = new Date(event.enddate).getTime() >= today.getTime();
					break;
			}

			if (showEvent) {
				generateCalendarEvents(event);
				renderCards(event);
			}
		});
	}

	if (listEvents) {
		//generate a array of unique categories for the choose category button
		const unique = [...new Set(listEvents.map((item: any) => item.category))];
		for (const element of unique) {
			options.push({ value: element as any, label: element as any });
		}
		generateCardsBasedOnCategory();
	}
	//when clicking a event this is deleted if user is admin
	const handleEventClick = (clickInfo: any) => {
		if (role.includes('Admin')) {
			const confirmation = window.confirm(
				`Are you sure you want to delete the event '${clickInfo.event.title}'?`
			);
			if (confirmation) {
				deleteEvent(clickInfo.event.id);
			}
		}
	};

	const handleDateClick = (selectInfo: any) => {
		if (role.includes('Admin')) {
			if (new Date(selectInfo.start).getTime() < now.getTime()) {
				changeMessage('Please choose a date and time in the future!', false);
			} else {
				handleShowCreateModal();
				setSelectedDate({
					allday: selectInfo.allDay,
					startdate: selectInfo.startStr.substr(0, 10),
					enddate: selectInfo.endStr.substr(0, 10),
					endtime: selectInfo.endStr.substr(11, 5),
					starttime: selectInfo.startStr.substr(11, 5)
				});
			}
		}
	};

	return (
		<div style={{ width: '100%' }}>
			<div className="input-group ">
				{createEventButton()}
				<div className="buttonBar">
					<button className="calendarButton" style={{ height: '2.5em' }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="26"
							height="26"
							fill="currentColor"
							className="bi bi-calendar"
							viewBox="0 0 16 16"
							onClick={() => setShowCalendar(!showCalendar)}
						>
							<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
						</svg>
					</button>
					<div className="dropdown" style={{ width: '10em', marginLeft: '8em' }}>
						<Dropdown
							isSearchable
							placeHolder="All Categories"
							options={options}
							onChange={(value: any) => {
								setCategoryFilter(value);
							}}
						/>
					</div>
				</div>
			</div>

			<div style={{ marginTop: '4em' }}>
				{showCalendar && (
					<FullCalendar
						initialView="dayGridMonth"
						firstDay={firstDay}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						eventClick={handleEventClick}
						select={handleDateClick}
						headerToolbar={{
							left: 'prev,next',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay'
						}}
						themeSystem="Simplex"
						plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
						events={calendarEvents}
					/>
				)}
			</div>
			{cols}
			<ToastContainer />
			<ModalCreateEvent
				selected={selectedDate}
				show={showCreateModal}
				handleClose={handleCloseCreateModal}
				changeMessage={changeMessage}
			/>
			<ModalEditEvent
				event={changedEvent}
				show={showEditModal}
				handleClose={handleCloseEditModal}
				changeMessage={changeMessage}
			/>
		</div>
	);
}
