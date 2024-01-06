import React, { useState } from 'react';
import { Modal, Form, Button, InputGroup, Row, FloatingLabel, Col } from 'react-bootstrap';
import { appendErrors, Controller, useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import eventService from '../../services/event.service';
export default function ModalEditEvent(props: any) {
	const [startDate, setStartDate] = useState(new Date());
	const [showEditModal, setShowEditModal] = useState(false);
	const { handleSubmit, control } = useForm();
	const handleClose = () => {
		setShowEditModal(false);
	};
	const handleShow = () => setShowEditModal(true);
	const handleChangeEvent = (data: any) => {
		const userEntered = new Date(data.startdate);
		const now = new Date();
		const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

		if (userEntered.getTime() < today.getTime()) {
			props.changeMessage('The start date must not be in the past', false);
		} else if (new Date(data.enddate) < new Date(data.startdate)) {
			props.changeMessage('The end date must be after the start date', false);
		} else if (data.allday === false && data.enddate === data.startdate && data.endtime < data.starttime) {
			props.changeMessage('The end time must be after the start time', false);
		} else {
			const allFieldsPresent =
				data.name.length > 0 &&
				data.description.length > 0 &&
				data.category.length > 0 &&
				data.startdate.length > 0 &&
				data.location.length > 0 &&
				data.enddate.length > 0;

			const timeFieldsPresent = data.allday || (data.starttime.length > 0 && data.endtime.length > 0);

			if (allFieldsPresent && timeFieldsPresent) {
				eventService
					.editEvent(data, props.event.id)
					.then((response) => {
						props.handleClose(response.data);
						props.changeMessage('Event Changed!', true);
					})
					.catch((response) => {
						props.changeMessage('Something went wrong', false);
						console.log(response);
					});
			} else {
				props.changeMessage('Please fill in all the required fields', false);
			}
		}
	};

	return (
		<div>
			<Modal show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Event</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(handleChangeEvent)}>
						<Form.Group className="mb-3" controlId="ceateForm.ControlInput1">
							<Form.Label>Name*</Form.Label>
							<Controller
								control={control}
								name="name"
								shouldUnregister
								defaultValue={props.event.name}
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<Form.Control type="text" onChange={onChange} value={value} autoFocus />
								)}
							/>
							<Form.Label>Category*</Form.Label>
							<Controller
								control={control}
								name="category"
								shouldUnregister
								defaultValue={props.event.category}
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<Form.Control type="text" onChange={onChange} value={value} autoFocus />
								)}
							/>
							<Form.Label>Location*</Form.Label>
							<Controller
								control={control}
								name="location"
								shouldUnregister
								defaultValue={props.event.location}
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<Form.Control type="text" onChange={onChange} value={value} autoFocus />
								)}
							/>
							<Form.Label>Select Time and Date*</Form.Label>
							{/*the check buton shows as checked if allday is true  */}

							<Col md>
								<Form.Text>All day event (no time is needed)</Form.Text>
								<Controller
									control={control}
									name="allday"
									defaultValue={false}
									shouldUnregister
									render={({ field: { onChange, onBlur, value, ref } }) => (
										<Form.Check
											aria-label="First name"
											type="switch"
											value={value}
											onChange={onChange}
										/>
									)}
								/>
							</Col>

							<Row>
								<Col xs={6} md={5}>
									<Form.Text>Start Date</Form.Text>
									<Controller
										shouldUnregister
										control={control}
										name="startdate"
										defaultValue={props.event.startdate}
										render={({ field: { onChange, onBlur, value, ref } }) => (
											<Form.Control type="date" onChange={onChange} value={value} autoFocus />
										)}
									/>
								</Col>
								<Col xs={1} md={5}>
									<Form.Text>End Date</Form.Text>
									<Controller
										shouldUnregister
										control={control}
										name="enddate"
										defaultValue={props.event.enddate}
										render={({ field: { onChange, onBlur, value, ref } }) => (
											<Form.Control type="date" onChange={onChange} value={value} autoFocus />
										)}
									/>
								</Col>
								<Col xs={1} md={5}>
									<Form.Text>Start Time</Form.Text>
									<Controller
										shouldUnregister
										control={control}
										name="starttime"
										defaultValue={props.event.starttime}
										render={({ field: { onChange, onBlur, value, ref } }) => (
											<Form.Control type="time" onChange={onChange} value={value} autoFocus />
										)}
									/>
								</Col>
								<Col xs={1} md={5}>
									<Form.Text>End Time</Form.Text>
									<Controller
										shouldUnregister
										control={control}
										name="endtime"
										defaultValue={props.event.endtime}
										render={({ field: { onChange, onBlur, value, ref } }) => (
											<Form.Control type="time" onChange={onChange} value={value} autoFocus />
										)}
									/>
								</Col>
							</Row>
							<Form.Label>Color</Form.Label>
							<Controller
								control={control}
								name="color"
								shouldUnregister
								defaultValue={props.event.color}
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<Form.Control type="color" onChange={onChange} value={value} autoFocus />
								)}
							/>
							<Form.Label className="mt-2">Description*</Form.Label>
							<Controller
								control={control}
								name="description"
								shouldUnregister
								defaultValue={props.event.description}
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<Form.Control as="textarea" rows={2} onChange={onChange} value={value} />
								)}
							/>
						</Form.Group>
						<Button variant="primary" size="sm" type="submit">
							Edit Event
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
}
