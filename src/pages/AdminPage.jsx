import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Buttons.css";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown, Nav, Row, Container, Col, Button } from "react-bootstrap";

function AdminPage(props) {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const navigate = useNavigate();

  const handleStudent=()=>{
    navigate('/editStudent',{state:user});
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
                <h4>Kullanıcıyı Güncelle</h4>
              </div>
              <div className="card-body">
                <Row>
                  <Col>
                    <form>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">İsim Soyisim</label>
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
                    <Col>
                      <Nav.Link
                        className="button button-2"
                        onClick={handleStudent}
                        href="/editStudent"
                      >
                        {" "}
                        Kullanıcıyı güncelle{" "}
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
}

export default AdminPage;
