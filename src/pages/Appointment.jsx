import axios from "axios";
import React, { useEffect, useState } from "react";



const Appointment = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/termInfo/appointment"
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
        <div>Appointments</div>
        {!!data && data.appointment.map((appointment) => { 
            const row = [];
    
        row.push(<li key={appointment}>
            <ul>
                <li>Lesson Appointments: {appointment.lessonAppointment.map((lessonAppointment)=>  {
                    const row2 = [];
                    row2.push(<li key={lessonAppointment}>
                        <ul>
                            <li>Lesson Id : {lessonAppointment.lessonId}</li>
                            <li>Teacher Name: {lessonAppointment.teacherName}</li>
                            <li>Appointments: {lessonAppointment.appointments.map((appointment)=> {
                                const row3 = [];
                                row3.push(<li key= {appointment}>
                                    <ul>
                                        <li>Date: {appointment.date}</li>
                                        <li>hours: {appointment.hours}</li>
                                    </ul>
                                </li>);
                            return row3;
                            })}</li>
                        </ul>
                    </li>);
                    return row2;
                    })}
                    </li>
                <li>Student Affairs Appointment: {appointment.studentAffairsAppointment.map((appointment)=> {
                    const row4 = [];
                    row4.push(<li key={appointment}>
                        <ul>
                            <li>Personel Name: {appointment.personelName}</li>
                            <li>Appointments: {appointment.appointments.map((appointment)=> {
                                const row5 = [];
                                row5.push(<li key= {appointment}>
                                    <ul>
                                        <li>Date: {appointment.date}</li>
                                        <li>hours: {appointment.hours}</li>
                                    </ul>
                                </li>);
                            return row5;
                            })}</li>
                        </ul>
                    </li>);
                    return row4;
                })}
                </li>

                <li>Advisor Appointment: {appointment.advisorAppointment.map((advisorAppointment)=> {
                    const row6 = [];
                    row6.push(<li key={advisorAppointment}>
                        <ul>
                            <li>Teacher Name: {advisorAppointment.teacherName}</li>
                            <li>Appointments: {advisorAppointment.appointments.map((appointment)=> {
                                const row7 = [];
                                row7.push(<li key= {appointment}>
                                    <ul>
                                        <li>Date: {appointment.date}</li>
                                        <li>hours: {appointment.hours}</li>
                                    </ul>
                                </li>);
                            return row7;
                            })}</li>
                        </ul>
                    </li>);
                    return row6;
                })}
                </li>
                <li>IT Appointment: {appointment.ITAppointment.map((ITAppointment)=> {
                    const row8 = [];
                    row8.push(<li key={ITAppointment}>
                        <ul>
                            <li>Appointments: {ITAppointment.appointments.map((appointment)=> {
                                const row9 = [];
                                row9.push(<li key= {appointment}>
                                    <ul>
                                        <li>Date: {appointment.date}</li>
                                        <li>hours: {appointment.hours}</li>
                                    </ul>
                                </li>);
                            return row9;
                            })}</li>
                        </ul>
                    </li>);
                    return row8;
                })}
                </li>

            </ul>
        </li>);
      return row;
    }
      )}
    </div>
    </>
  );
};

export default Appointment;
