import { useLocation } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { NavDropdown, Row, Col, Form } from "react-bootstrap";
import "../styles/Buttons.css";
import { Link, useNavigate } from "react-router-dom";

function AddPersonnel() {
  const location = useLocation();
  const studentId = location.state;
  console.log(studentId);
  const scholars = [100, 75, 50, 25, 0];
  const [depData, setDepData] = useState("");
  const [department, setDepartment] = useState("Bolum seciniz");
  const [depSelected, setDepSelected] = useState("");

  let user = {
    department: "",
    user: studentId,
  };
  
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/user/add/id=" + studentId,
      data: {isStudent:false,isLecturer:false,isPersonnel:true},
    });
  }, []);

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

    console.log(user);
    axios({
      method: "post",
      url: "http://localhost:5000/personnel/add",
      data: user,
    });
  };

  const handleDepartment = (e) => {
    setDepSelected(depData[e.target.attributes.value.value]._id);
    setDepartment(depData[e.target.attributes.value.value].name);
    console.log(user);
  };


  return (
    // make form
    <div>
      <h1>Add Personnel</h1>
      <form>
        <div className="form-group">
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
          
        </div>
      </form>
      {!!depSelected && (
        <button type="submit" className="button button-1" onClick={putStudent}>
          Submit
        </button>
      )}
    </div>
  );
}
export default AddPersonnel;
