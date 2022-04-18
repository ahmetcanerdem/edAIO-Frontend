import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Form, Row, Col, Nav } from "react-bootstrap";
import "../styles/Buttons.css";
import axios from "axios";

const unselectedCourses = [];
var courses = [];
function CourseConfirmation() {
  const studentId = JSON.parse(localStorage.getItem("userData")).id;
  const location = useLocation();
  const [confirmed, setConfirmed] = useState(false);
  const selectedCourses = location.state;
  const server = "http://localhost:5000";

  if (unselectedCourses.length === 0) {
    for (let i = 0; i < selectedCourses.length; i++) {
      unselectedCourses.push(false);
    }
  }

  const handleConfirmation = (e) => {
    if (e.target.checked) {
      courses = [];
      setConfirmed(true);
      for (let i = 0; i < selectedCourses.length; i++) {
        if (unselectedCourses[i] === false && i % 2 === 0) {
          courses.push(selectedCourses[i]);
        }
      }
      console.log(courses);
      axios({
        method: "post",
        url: server + "/student/addCourse/sid=" + studentId,
        data: {
          course: courses,
        },
      });
    } else setConfirmed(false);
  };

  const handleDeletion = (e) => {
    if (e.target.checked) {
      unselectedCourses[e.target.id] = false;
      unselectedCourses[e.target.id - 1] = false;
    } else {
      unselectedCourses[e.target.id] = true;
      unselectedCourses[e.target.id - 1] = true;
    }
  };
  //list users for selection
  return (
    <div>
      <h1>Ders Onayı</h1>
      <Col>
        <Nav.Link className="button button-4" href="/courseSelection">
          <h3 style ={{
            padding: "10px"
          }}>{" "} Ders Ekleme Ekranına Geri Dön{" "}</h3>
        </Nav.Link>
      </Col>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Ogrenci Onayi"
          onChange={handleConfirmation}
        />
        <Form.Check
          disabled
          type="switch"
          id="custom-switch"
          label="Danisman Onayi"
        />
      </Form>
      <Row> </Row>
      {!confirmed && !!selectedCourses && (
        <>
          {selectedCourses.map((user, index) => {
            return (
              <>
                {index % 2 === 0 ? (
                  <></>
                ) : (
                  <>
                    <ul>
                      <li key={index}>
                        <input
                          type="checkbox"
                          id={index}
                          defaultChecked={!unselectedCourses[index]}
                          onChange={handleDeletion}
                        />
                        <label>{user}</label>
                      </li>
                    </ul>
                  </>
                )}
              </>
            );
          })}
        </>
      )}
      {confirmed && !!selectedCourses && (
        <>
          {selectedCourses.map((user, index) => {
            return (
              <>
                {index % 2 === 0 ? (
                  <></>
                ) : (
                  <>
                    <ul>
                      <li key={index}>
                        <input
                          disabled
                          type="checkbox"
                          id={index}
                          defaultChecked={!unselectedCourses[index]}
                          onChange={handleDeletion}
                        />
                        <label>{user}</label>
                      </li>
                    </ul>
                  </>
                )}
              </>
            );
          })}
        </>
      )}
      
    </div>
  );
}
export default CourseConfirmation;
