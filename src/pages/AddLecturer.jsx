import { useLocation } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { NavDropdown, Row, Col, Form } from "react-bootstrap";
import "../styles/Buttons.css";

function AddLecturer() {
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

  let user = {
    department: "",
    schoolMail: "",
    user: studentId,
    status: "aktif",
    title: "",
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/department")
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
    user.schoolMail = mail;
    user.title = id;

    console.log(user);
    axios({
      method: "post",
      url: "http://localhost:5000/lecturer/add",
      data: user,
    });
  };

  const handleDepartment = (e) => {
    setDepSelected(depData[e.target.attributes.value.value]._id);
    setDepartment(depData[e.target.attributes.value.value].name);
  };

  const handleTitle = (event) => {
    //
    setId(event.target.value);
  };

  const handleMail = (event) => {
    //
    setMail(event.target.value);
  };


  return (
    // make form
    <div>
      <h1>Add Lecturer</h1>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Ogrenci No</label>
          <input
            className="form-control"
            placeholder="Unvan"
            onChange={handleTitle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            className="form-control"
            placeholder="Unvan"
            onChange={handleMail}
          />
        </div>
        <div className="form-group">

          <Col xs={4}>
            <label>Bolum</label>
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
        </div>
      </form>
      {!!department && (
        <button type="submit" className="button button-1" onClick={putStudent}>
          Submit
        </button>
      )}
    </div>
  );
}
export default AddLecturer;
