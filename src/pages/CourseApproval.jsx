import { React, useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import "../styles/Buttons.css";
import axios from "axios";

function CourseApproval() {
  const lecturerId = JSON.parse(localStorage.getItem("userData")).id;
  const [students, setStudents] = useState([]);
  const server = "http://localhost:5000";
  useEffect(() => {
    axios
      .get(server + "/lecturer/getStudents/id=" + lecturerId)
      .then((res) => {
				console.log(res.data);
        setStudents(res.data.students);
      });
  }, []);

	const handleApproval = (studentId) => {
		
			console.log("alo")
			axios({
				method: "post",
				url: server + "/lecturer/giveApprove/lid=" + lecturerId + "/sid=" + studentId,
			});
		
	};

  return (
    <>
      {!!students ? (
        <>
          <div>
            <label style={{ color: "red", textAlign: "center" }}>
              {students.map((student) => (
                <div>
									<br/>
                  <Form>
                    <Form.Check
                      disabled
                      type="switch"
                      id="custom-switch"
                      label="Ogrenci Onayi"
                      defaultChecked={true}
                    />
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Danisman Onayi"
                      onChange={() =>{handleApproval(student.id)}}
                    />
                  </Form>
                  <h2 style={{ color: "red", textAlign: "center" }}>
                    {student.name}
                  </h2>
                  <h3>Courses</h3>
                  <div>
                    {student.termCourses.map((course) => (
                      <div>
                        <div>{course.code}</div>
                        <div>{course.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </label>
            <div style={{ color: "darkblue" }}>{students.email}</div>
          </div>
          <div></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default CourseApproval;
