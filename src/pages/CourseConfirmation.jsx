import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import "../styles/Buttons.css";
import axios from "axios";

const unselectedCourses = [];
var courses = [];
function CourseConfirmation() {
	// const studentId = JSON.parse(localStorage.getItem("loginData"))._id;
  const location = useLocation();
	const [id, setId] = useState(null);
	const [confirmed, setConfirmed] = useState(false);
  const selectedCourses = location.state;
  const server = "http://192.168.0.11:5000";

  if (unselectedCourses.length === 0) {
    for (let i = 0; i < selectedCourses.length; i++) {
      unselectedCourses.push(false);
    }
  }
	
	useEffect(() => {
    axios
      .get(server + "/student")
      .then((response) => {
      	setId(response.data.student[1]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleConfirmation = (e) => {
		if(e.target.checked){
			courses = [];
    	setConfirmed(true);
			for(let i = 0; i < selectedCourses.length; i++){
				if(unselectedCourses[i] === false && i % 2 === 0){
					courses.push(selectedCourses[i]);
				}
			}
			axios({
				method: "post",
				url: server + "/student/addBulkCourse/studentId=" + id,
				data: {
					courses: courses
				},
			});
		}
		else
			setConfirmed(false);
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
