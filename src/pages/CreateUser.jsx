// create axios request with user Name
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Nav, Row, Col, Form } from "react-bootstrap";
import "../styles/Buttons.css";
import {Link, useNavigate} from 'react-router-dom';


const CreateUser = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const navigate = useNavigate();

  const handleStudent=()=>{
    navigate('/addStudent',{state:user});
  }
  
  const handleLecturer=()=>{
    navigate('/addLecturer',{state:user});
  }

  const handlePersonnel=()=>{
    navigate('/addPersonel',{state:user});
  }

  const requestUser = () => {
    axios

      .get("http://localhost:5000/user?name=" + userName)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUser = (e) => {
    if (e.target.checked) setUser(e.target.id);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Create User</h4>
              </div>
              <div className="card-body">
                <Row>
                  <Col>
                    <form>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Isim Soyisim</label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="isim soyisim"
                          onChange={handleUserName}
                        />
                      </div>
                    </form>
                  </Col>
                  <Row></Row>
                  <Row>
                    <Col xs={2}>
                      <Nav.Link
                        className="button button-3"
                        onClick={requestUser}
                      >
                        {" "}
                        Istek At{" "}
                      </Nav.Link>
                    </Col>
                  </Row>
                </Row>

                {!!users.length && (
                  //list users for selection
                  <ul>
                    {users.map((user, index) => {
                      return (
                        <li key={index}>
                          <input
                            type="checkbox"
                            id={user._id}
                            onChange={handleUser}
                          />
                          <label htmlFor={user.id}> {user.name}</label>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {!!user && (
                  <>
                    <Col xs={3}>
                      {/* <Link
                        to={{
                          pathname: "/addStudent",
                          state: user,
                        }}
                      ></Link> */}
                      <Nav.Link
                        className="button button-2"
                        onClick={handleStudent}
                        href="/addStudent"
                      >
                        {" "}
                        Ogrenci Olarak Ekle{" "}
                      </Nav.Link>
                      <Nav.Link className="button button-2" onClick={handleLecturer}
                        href="/addLecturer">
                        {" "}
                        Ogretmen Olarak Ekle{" "}
                      </Nav.Link>
                      <Nav.Link className="button button-2"onClick={handlePersonnel}
                        href="/addPersonnel">
                        {" "}
                        Personel Olarak Ekle{" "}
                      </Nav.Link>
                    </Col>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateUser;
