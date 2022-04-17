import DatePicker from "react-datepicker";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavDropdown, Col } from "react-bootstrap";
import convertToShortDate from "../helpers/functions";
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-datepicker/dist/react-datepicker.css";

const hours = [
  { id: "zero", value: "07:30-08:20"},
  { id: "first", value: "08:30-09:20"},
  { id: "second", value: "09:30-10:20" },
  { id: "third", value: "10:30-11:20" },
  { id: "fourth", value: "11:30-12:20" },
  { id: "fifth", value: "12:30-13:20" },
  { id: "sixth", value: "13:30-14:20" },
  { id: "seventh", value: "14:30-15:20" },
  { id: "eighth", value: "15:30-16:20" },
  { id: "ninth", value: "16:30-17:20" },
  { id: "tenth", value: "17:30-18:20" },
];

const AddAppointment = (props) => {
  const [hoursSelected, setHoursSelected] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [dateShown, setDateShown] = useState(new Date());
  const [appointmentHeader, setAppointmentHeader] = useState();

  const [header, setHeader] = useState();
  const [formLabel, setFormLabel] = useState();
  const [textForm, setTextForm] = useState();

  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const studentId = userInfo.studentID;
  const userId = userInfo._id;

  const [courses, setCourses] = React.useState();
  const [personnel, setPersonnel] = React.useState();
  const [buttons, setButtons] = React.useState();
  const [selectedInfo, setSelectedInfo] = React.useState();

  const [reload, setReload] = React.useState(1);
  const [lecturerAppointment, setLecturerAppointment] = React.useState(false);
  const [studentAffairsAppointment, setStudentAffairsAppointment] = React.useState(false);
  const [advisorAppointment, setAdvisorAppointment] = React.useState(false);
  const [itAppointment, setITAppointment] = React.useState(false);

  const [yesShown, setYesNoShown] = React.useState(false);

  let appointment = {
    date: null,
    hours: "",
  };

  let optionList =
    hours.length > 0 &&
    hours.map((item, i) => {
      return (
        <option
          style={{
            height: "50px",
          }}
          key={i}
          value={item.value}
        >
          {item.value}
        </option>
      );
    });

  useEffect(() => {
    const shownButtons = [];
    courses?.courses?.forEach((course) => {
      shownButtons.push(
        <NavDropdown.Item
          className="button button-1"
          onClick={() => {
            handleSelectCourse(course.courseInfo.course);
          }}
        >
          {course.code}
        </NavDropdown.Item>
      );
    });
    setButtons(shownButtons);
    setYesNoShown(true);
    setReload((prevState) => prevState + 1);
  }, [courses]);

  useEffect(() => {
    const shownButtons = [];
    personnel?.forEach((person) => {
      shownButtons.push(
        <NavDropdown.Item
          className="button button-1"
          onClick={() => {
            setSelectedInfo({
              appointmentWho: userId,
              appointmentWith: person._id,
            });
          }}
        >
          {person.name}
        </NavDropdown.Item>
      );
    });
    setButtons(shownButtons);
    setReload((prevState) => prevState + 1);
  }, [personnel]);

  const handleSelectCourse = async (id) => {
    let getCourseInfo = await axios.get(
      "http://localhost:5000/course/id=" + id
    );
    if (!!getCourseInfo.data)
      //console.log(getCourseInfo.data.course);
      setSelectedInfo({
        appointmentWith: getCourseInfo.data.course._id,
        course: id,
        courseName: getCourseInfo.data.course.name,
        appointmentWho: userId,
      });
    else console.log(getCourseInfo.error);
  };

  useEffect(() => {
    setHeader(headerSet().header);
    setFormLabel(headerSet().formLabel);
    setTextForm(headerSet().textForm);
  }, [appointmentHeader]);

  const headerSet = () => {
    let header = "Yeni Bir ";
    let formLabel = "Randevu Almak İstediğiniz ";
    let textForm = "";
    {
      switch (appointmentHeader) {
        case "lecturer":
          header = header + "Öğretim Görevlisi";
          formLabel = formLabel + "Dersi";
          textForm = "Ders Seçiniz";
          break;
        case "studentAffairs":
          header = header + "Öğrenci İşleri";
          formLabel = formLabel + "Öğrenci İşleri Personelini";
          textForm = "Personel Seçiniz";
          break;
        case "advisor":
          header = header + "Danışman Öğretmen";
          formLabel = formLabel + "Danışman Öğretmeninizi";
          textForm = "Personel Seçiniz";
          break;
        case "IT":
          header = header + "Bilişim Teknolojileri";
          formLabel = formLabel + "Bilişim Teknolojileri Görevlisini";
          textForm = "Personel Seçiniz";
          break;
      }
    }
    header = header + " Randevusu Ekle";
    formLabel = formLabel + " Seçiniz.";
    return { header: header, formLabel: formLabel, textForm: textForm };
  };

  const handleDateSetting = (date) => {
    let stringDate = convertToShortDate(date);
    setDateSelected(stringDate);
    setDateShown(date);
  };

  const handleSubmit = () => {
    if (lecturerAppointment) {
      postAppointmentToLecturer();
    } else if (studentAffairsAppointment) {
      postAppointmentToStudentAffair();
    } else if (advisorAppointment) {
      postAppointmentToAdvisor();
    } else if (itAppointment) {
      postAppointmentToIT();
    }
  };

  useEffect(()=>{
    console.log(hoursSelected);
  },[hoursSelected])

  const FormShow = () => {
    return (
      <div>
        <h1>{header}</h1>
        {yesShown && (
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">{formLabel}</label>
              <Col xs={4}>
                <NavDropdown className="button button-1" title={textForm}>
                  {buttons}
                </NavDropdown>
              </Col>
            </div>
            {!!selectedInfo && (
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Randevu Almak İstediğiniz Tarihi Giriniz:
                </label>
                <Col xs={4}>
                  <DatePicker
                    selected={dateShown}
                    onChange={(date) => {
                      handleDateSetting(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                  ></DatePicker>
                </Col>
              </div>
            )}
            {!!dateSelected && !!selectedInfo && (
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Randevu Almak İstediğiniz Saati Giriniz:
                </label>
                <Col xs={4}>
                  <select
                    style={{
                      height: "50px",
                    }}
                    onChange={(e) => setHoursSelected(e.target.value)}
                    selected={hoursSelected}
                  >
                    {optionList}
                  </select>
                </Col>
              </div>
            )}
          </form>
        )}
        {!!dateSelected && !!selectedInfo && (
          <button
            type="submit"
            className="button button-1"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    );
  };

  const postAppointmentToLecturer = () => {
    appointment.hours = hoursSelected;
    appointment.date = dateSelected;
    //console.log(appointment);
    axios({
      method: "post",
      url:
        "http://localhost:5000/appointment/lecturer/id=" +
        selectedInfo.appointmentWho +
        "/cid=" +
        selectedInfo.appointmentWith,
      data: appointment,
    }).then(e=>{
      if(e.status==200)
        console.log("success-save");
    }).catch(()=>{
        console.log("Error!");
    });
  };

  const postAppointmentToAdvisor = () => {
    appointment.hours = hoursSelected;
    appointment.date = dateSelected;
    axios({
      method: "post",
      url: "http://localhost:5000/appointment/advisor/id=" + userId,
      data: appointment,
    }).then(e=>{
      if(e.status==200)
        console.log("success-save");
    }).catch(()=>{
        console.log("Error!");
    });
  };

  const postAppointmentToIT = () => {
    appointment.hours = hoursSelected;
    appointment.date = dateSelected;
    axios({
      method: "post",
      url:
        "http://localhost:5000/appointment/it/id=" +
        selectedInfo.appointmentWho +
        "/wid=" +
        selectedInfo.appointmentWith,
      data: appointment,
    }).then(e=>{
      if(e.status==200)
        console.log("success-save");
    }).catch(()=>{
        console.log("Error!");
    });
  };

  useEffect(async () => {
    if (lecturerAppointment) {
      let getTermCourses = await axios.get(
        "http://localhost:5000/student/getTermCourses/id=" + studentId
      );
      if (!!getTermCourses.data) {
        setCourses(getTermCourses.data);
        setReload((prevState) => prevState + 1);
      } else {
        console.log(getTermCourses.error);
      }
    }
  }, [lecturerAppointment]);

  useEffect(async () => {
    if (studentAffairsAppointment) {
      let getStudentAffairs = await axios.get(
        "http://localhost:5000/appointment/studentAffairs"
      );
      if (!!getStudentAffairs.data) {
        setPersonnel(getStudentAffairs.data.users);
        setReload((prevState) => prevState + 1);
      } else {
        console.log(getStudentAffairs.error);
      }
    }
  }, [studentAffairsAppointment]);

  //users_name ve _id
  useEffect(async () => {
    if (itAppointment) {
      let getStudentAffairs = await axios.get(
        "http://localhost:5000/appointment/it"
      );
      if (!!getStudentAffairs.data) {
        setPersonnel(getStudentAffairs.data.users);
        setReload((prevState) => prevState + 1);
      } else {
        console.log(getStudentAffairs.error);
      }
    }
  }, [itAppointment]);

  const postAppointmentToStudentAffair = () => {
    appointment.hours = hoursSelected;
    appointment.date = dateSelected;
    console.log(appointment);
    axios({
      method: "post",
      url:
        "http://localhost:5000/appointment/studentAffairs/id=" +
        selectedInfo.appointmentWho +
        "/wid=" +
        selectedInfo.appointmentWith,
      data: appointment,
    }).then(e=>{
      if(e.status==200)
        console.log("success-save");
    }).catch(()=>{
        console.log("Error!");
    });
  };

  return (
    reload && (
      <AccordionItem>
        <AccordionItemHeading
          onClick={() => {
            props.setExpanded(!props.isExpanded);
          }}
        >
          <AccordionItemButton>
            <h4 className="accordion-item-button-header appointment">
              Randevu Al
            </h4>
            <div className="button-appointment-div">
              <button
                className="button-appointment"
                onClick={() => {
                  setLecturerAppointment(true);
                  setStudentAffairsAppointment(false);
                  setAdvisorAppointment(false);
                  setITAppointment(false);
                  setAppointmentHeader("lecturer");
                  setYesNoShown(false);
                }}
              >
                Öğretim Görevlisinden Randevu Al
              </button>
            </div>
            <div className="button-appointment-div">
              <button
                className="button-appointment"
                onClick={() => {
                  setStudentAffairsAppointment(true);
                  setLecturerAppointment(false);
                  setAdvisorAppointment(false);
                  setITAppointment(false);
                  setAppointmentHeader("studentAffairs");
                  setYesNoShown(true);
                }}
              >
                Öğrenci İşlerinden Randevu Al
              </button>
            </div>
            <div className="button-appointment-div">
              <button
                className="button-appointment"
                onClick={() => {
                  setAdvisorAppointment(true);
                  setLecturerAppointment(false);
                  setStudentAffairsAppointment(false);
                  setITAppointment(false);
                  setAppointmentHeader("advisor");
                  setYesNoShown(true);
                }}
              >
                Danışman Öğretmenden Randevu Al
              </button>
            </div>
            <div className="button-appointment-div">
              <button
                className="button-appointment"
                onClick={() => {
                  setITAppointment(true);
                  setLecturerAppointment(false);
                  setStudentAffairsAppointment(false);
                  setAdvisorAppointment(false);
                  setAppointmentHeader("IT");
                  setYesNoShown(true);
                }}
              >
                IT'den Randevu Al
              </button>
            </div>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>{!!buttons && <FormShow />}</AccordionItemPanel>
      </AccordionItem>
    )
  );
};

export default AddAppointment;
