import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Nav , Row, Col} from "react-bootstrap";
import "../styles/Buttons.css";

const selectedCourses = [];

function CourseSelection() {
  const [courses, setCoursesData] = useState([]);

  const [courseSelected, setCourseSelected] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const server = "http://localhost:5000";
  const navigate = useNavigate();

  const handleUser = (id) => {
    axios
      .get(server + "/course/dept=" + id)
      .then((response) => {
        console.log(response.data.course);
        setCoursesData(response.data.course);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(server + "/student/getProfile/id=" + userInfo.id)
      .then((response) => {
        console.log(response.data);
        handleUser(response.data.departmentId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectCourses = () => {
    navigate("/courseConfirmation", { state: selectedCourses });
  };

  const handleCourses = (e) => {
    console.log(e.target.id);

    if (
      e.target.checked &&
      !selectedCourses.includes(courses[e.target.id]._id)
    ) {
      setCourseSelected(true);
      console.log("added");
      console.log(courses[e.target.id]._id);
      selectedCourses.push(courses[e.target.id]._id, courses[e.target.id].name);
      console.log(selectedCourses);
    }
  };

  return (
    <div>
      <h1>Ders Seçimi</h1>
      <Col>
        <Nav.Link className="button button-4" href="/semester/courses">
          <h3
            style={{
              padding: "10px",
            }}
          >
            {" "}
            Derslerim Ekranına Geri Dön{" "}
          </h3>
        </Nav.Link>
      </Col>
      <form>
        <div className="form-group">
          {!!courses && (
            <ul>
              {courses.map((user, index) => {
                return (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={index}
                      defaultChecked={selectedCourses.includes(user.code)}
                      onChange={handleCourses}
                    />
                    <label>
                      {user.code} {user.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </form>
      {courseSelected ? (
        <div>
          <button
            type="submit"
            className="button button-1"
            onClick={selectCourses}
          >
            Onay Sayfasi
          </button>
        </div>
      ) : (
        <div>
          <button type="submit" className="button">
            Onay Sayfasi
          </button>
        </div>
      )}
    </div>
  );
}
export default CourseSelection;
