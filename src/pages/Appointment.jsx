import axios from "axios";
import React, { useEffect, useState } from "react";

const Appointment = () => {

	const [data, setData] = useState(null);
	useEffect(() => {
		axios
			.get(
				"http://localhost:1337/appointments"
			)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []
	);



	return (
		<>
			<div>
				<h1>Randevuler</h1>
				{!!data && data.lectureAppointments.map((lecture) => {
					const row = [];
					<h2>Lecture Appointments: </h2>
					row.push(<li key={lecture}>
						<ul>
							<li>Id: {lecture.code}</li>
							<li>Teacher Name: {lecture.teacherName}</li>
							<li>Appointments: {lecture.appointments.map((appointment) => {
								const row2 = [];
								row2.push(<li key={appointment}>
									<ul>
										<li>Date: {appointment.date}</li>
										<li>Hours: {appointment.hours}</li>
									</ul>
								</li>);
								return row2;
							})}
							</li>
						</ul>
					</li>);
					return row;
				})}
				{!!data && data.studentAffairsAppointments.map((studentAffairs) => {
					const row = [];

					row.push(<li key={studentAffairs}>
						<ul>
							<li>Personnel Name: {studentAffairs.personnelName}</li>
							<li>Appointments: {studentAffairs.appointments.map((appointment) => {
								const row2 = [];
								row2.push(<li key={appointment}>
									<ul>
										<li>Date: {appointment.date}</li>
										<li>Hours: {appointment.hours}</li>
									</ul>
								</li>);
								return row2;
							})}
							</li>
						</ul>
					</li>);
					return row;
				})}
				{!!data &&
					<div>
						<li>Advisor Name: {data.advisorAppointments.teacherName}</li>
						<li>Appointments: {data.advisorAppointments.appointments.map((appointment) => {
							const row2 = [];
							row2.push(<li key={appointment}>
								<ul>
									<li>Date: {appointment.date}</li>
									<li>Hours: {appointment.hours}</li>
								</ul>
							</li>);
							return row2;
						})}
						</li>
					</div>}
				{!!data &&
					<div>
						{data.ITAppointments.map((it) => {
							<h1>IT Appointments: </h1>
							const row = [];
							row.push(<li key={it}>
								<ul>
									<li>Date: {it.date}</li>
									<li>Hours: {it.hours}</li>
								</ul>
							</li>);
							return row;
						})}
					</div>}
			</div>
		</>
	);
};

export default Appointment;
