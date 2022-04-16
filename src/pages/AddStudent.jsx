import { useLocation } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { NavDropdown, Row, Col, Form } from "react-bootstrap";
import "../styles/Buttons.css";
import { Link, useNavigate } from "react-router-dom";

function AddStudent() {
  const location = useLocation();
  const studentId = location.state;

  const [courses, setCoursesData] = useState([]);
  const scholars = [100, 75, 50, 25, 0];
  const [depData, setDepData] = useState("");
  const [department, setDepartment] = useState("Bolum seciniz");
  const [depSelected, setDepSelected] = useState("");
  const [lecturers, setLecturersData] = useState(null);
  const [lecSelected, setLecSelected] = useState("");
  const [scholarShip, setScholarShip] = useState(scholars[0]);
  const [schlrs, setSchlrs] = useState(null);
  const [id, setId] = useState(null);
  const [mail, setMail] = useState(null);
  const server = "http://192.168.0.11:5000";
  let user = {
    id: 0,
    scholarship: 0,
    department: "",
    courses: [],
    email: "",
    user: studentId,
    status: "aktif",
    grade: 1,
    gpa: 0,
    secondForeignLanguage: "",
    credit: 0,
    advisor: "",
  };

  useEffect(() => {
    axios
      .get("http://192.168.0.11:5000/department")
      .then((response) => {
        console.log(response.data);
        setDepData(response.data.department);
        setDepartment(response.data.department[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const putStudent = () => {
		
    user.department = depSelected;
    user.scholarship = schlrs;
    user.id = id;
    user.email = mail;
    user.advisor = lecSelected;

    console.log(user);
    axios({
      method: "post",
      url: server + "/student/add",
      data: user,
    });
  };

  const handleScholar = (e) => {
    setScholarShip(scholars[e.target.attributes.value.value]);
    setSchlrs(scholars[e.target.attributes.value.value]);
  };

  const handleAdvisor = (e) => {};

  const handleDepartment = (e) => {
    setDepSelected(depData[e.target.attributes.value.value]._id);
    setDepartment(depData[e.target.attributes.value.value].name);
    console.log(user);
    axios
      .get(
        server + "/course/dept=" +
          depData[e.target.attributes.value.value]._id
      )
      .then((response) => {
        console.log(response.data);
        setCoursesData(response.data.course);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        server + "/lecturer/dept=" +
          depData[e.target.attributes.value.value]._id
      )
      .then((response) => {
        setLecturersData(response.data.lecturer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStudentID = (event) => {
    //
    setId(event.target.value);
  };
  const handleEmail = (event) => {
    setMail(event.target.value);
  };

  const handleLecturer = (e) => {
    setLecSelected(lecturers[e.target.id]._id);
  };

  const handleCourses = (e) => {
    user.courses.push(courses[e.target.id]._id);
  };

  return (
    // make form
    <div>
      <h1>Add Student</h1>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Ogrenci No</label>
          <input
            className="form-control"
            placeholder="ogrenci no"
            onChange={handleStudentID}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Ogrenci Maili</label>
          <input
            className="form-control"
            placeholder="ogrenci no"
            onChange={handleEmail}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Burs</label>
          <Col xs={4}>
            <NavDropdown className="button button-1" title={scholarShip}>
              <NavDropdown.Item
                className="button button-1"
                onClick={handleScholar}
                key={0}
                value={0}
              >
                100
              </NavDropdown.Item>
              <NavDropdown.Item
                className="button button-1"
                onClick={handleScholar}
                key={1}
                value={1}
              >
                75
              </NavDropdown.Item>
              <NavDropdown.Item
                className="button button-1"
                onClick={handleScholar}
                key={2}
                value={2}
              >
                50
              </NavDropdown.Item>
              <NavDropdown.Item
                className="button button-1"
                onClick={handleScholar}
                key={3}
                value={3}
              >
                25
              </NavDropdown.Item>
              <NavDropdown.Item
                className="button button-1"
                onClick={handleScholar}
                key={4}
                value={4}
              >
                0
              </NavDropdown.Item>
            </NavDropdown>
          </Col>
          <Col xs={4}>
            <label htmlFor="exampleInputEmail1">Bolum</label>
            <NavDropdown className="button button-1" title={department}>
              {!!depData &&
                depData.map((dep, index) => (
                  <div>
                    <NavDropdown.Item
                      className="button button-1"
                      onClick={handleDepartment}
                      key={index}
                      value={index}
                    >
                      {dep.name}
                    </NavDropdown.Item>
                  </div>
                ))}
            </NavDropdown>
          </Col>
          {!!courses && (
            //list users for selection
            <ul>
              {courses.map((user, index) => {
                return (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={index}
                      onChange={handleCourses}
                    />
                    <label htmlFor={user.id}>
                      {user.code} {user.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
          {!!lecturers && (
            <Col xs={4}>
              <label htmlFor="exampleInputEmail1">Danisman</label>
              <NavDropdown className="button button-1" title={lecSelected}>
                {lecturers.map((dep, index) => (
                  <div>
                    <NavDropdown.Item
                      className="button button-1"
                      onClick={handleLecturer}
                      key={index}
                      value={index}
                    >
                      {dep.name}
                    </NavDropdown.Item>
                  </div>
                ))}
              </NavDropdown>
            </Col>
          )}
        </div>
      </form>
      {!!lecSelected && (
        <button type="submit" className="button button-1" onClick={putStudent}>
          Submit
        </button>
      )}
    </div>
  );
}
export default AddStudent;
