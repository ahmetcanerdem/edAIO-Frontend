import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/AddressPage.css";

import { getCurrentDate } from "../helpers/functions";

import { NavDropdown, Nav, Row, Container, Col } from "react-bootstrap";

const AddressPage = () => {
  const [isAddrLoading, setAddrLoading] = useState(true);

  const [isInfoLoading, setInfoLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/student")
      .then((response) => {
        handleAddresses(response.data.student[0]._id);
        handleUser(response.data.student[0]._id);
        handleContacts(response.data.student[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleContacts = (id) => {
    axios
      .get("http://localhost:5000/student/getContact/id=" + id)
      .then((response) => {
        console.log(response.data);
        setContacts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUser = (id) => {
    axios
      .get("http://localhost:5000/student/getProfile/id=" + id)
      .then((response) => {
        console.log(response.data);
        setInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddresses = (id) => {
    axios
      .get("http://localhost:5000/student/getAddress/id=" + id)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isAddrLoading) {
    return <div>Loading...</div>;
  } else if (isInfoLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <Row>
          <Col xs={8}></Col>
          <Col>
            Rol:{" "}
            {JSON.parse(localStorage.getItem("loginData")).user.isAdmin ? (
              <>Admin</>
            ) : (
              <>Ogrenci</>
            )}
          </Col>
          <Col>
            Merhaba {JSON.parse(localStorage.getItem("loginData")).user.name}
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Col xs={10}>
            <h2>Adreslerim</h2>
          </Col>
          <Col>Bugun: {getCurrentDate("/")}</Col>
        </Row>
        <div className="col-md-1" />
        <div className="col-md-3" style={{ padding: 10 }}>
          <div className="row">
            <div className="col-md-4">
              <img
                className="pic"
                src={JSON.parse(localStorage.getItem("loginData")).picture}
              ></img>
            </div>
            <div className="col-md-8">
              <div>{JSON.parse(localStorage.getItem("loginData")).name}</div>
              <div>{info.department}</div>
            </div>
          </div>
          <div>{info.id}</div>
          <div>{JSON.parse(localStorage.getItem("loginData")).email}</div>
          <div>{info.advisor}</div>
          <div>{info.advisorMail}</div>
          <Nav className="button-container">
            <Row style={{ padding: 10 }}>
              <Row>
                <Nav.Link className="button button-1">Bilgilerim</Nav.Link>
              </Row>
              <Row>
                <Nav.Link className="button button-1">Not Goruntuleme</Nav.Link>
              </Row>
              <Row>
                <Nav.Link className="button button-1">Ortak Egitim</Nav.Link>
              </Row>
              <Row>
                <Nav.Link className="button button-1">
                  Ikinci Yabanci Dil
                </Nav.Link>
              </Row>
              <Row>
                <Nav.Link className="button button-1">
                  Odeme Bilgilerim
                </Nav.Link>
              </Row>
              <Row>
                <Nav.Link className="button button-1">
                  Adres/Iletisim Bilgilerim
                </Nav.Link>
              </Row>
            </Row>
          </Nav>
        </div>
        <div className="col-md-8">
          <h4 className="res">Adres Bilgilerim</h4>
          <Container style={{ paddingRight: 40, paddingTop: 30 }}>
            <Container
              style={{
                backgroundColor: `#dcdcdc`,
                borderRadius: 10,
                border: "2px solid gray",
                paddingRight: 10,
                paddingTop: 10,
              }}
            >
              <Row style={{ textAlign: "left" }}>
                <Col>Adres Turu</Col>
                <Col>Adres</Col>
                <Col>Sehir</Col>
                <Col>Ilce</Col>
                <Col>Posta Kodu</Col>
              </Row>
              {data.addresses.map((addr) => {
                const row = [];
                row.push(
                  <Row key={addr} style={{ padding: 10 }}>
                    <Row style={{ textAlign: "left" }}>
                      <Col>{addr.type}</Col>
                      <Col>{addr.address}</Col>
                      <Col>{addr.city}</Col>
                      <Col>{addr.district}</Col>
                      <Col>{addr.postalCode}</Col>
                    </Row>
                    <hr />
                  </Row>
                );
                return row;
              })}
            </Container>
          </Container>
          <br />
          <h4 className="res">İletişim Bilgilerim</h4>
          <Container
            style={{ paddingRight: 40, paddingTop: 30, paddingBottom: 20 }}
          >
            <Container
              style={{
                backgroundColor: `#dcdcdc`,
                borderRadius: 10,
                border: "2px solid gray",
                paddingRight: 10,
                paddingTop: 10,
              }}
            >
              <Row style={{ textAlign: "left" }}>
                <Col>Iletisim Turu</Col>
                <Col>Iletisim Bilgisi</Col>
              </Row>
              {contacts.contacts.map((addr) => {
                const row = [];
                row.push(
                  <Row key={addr} style={{ padding: 10 }}>
                    <Row style={{ textAlign: "left" }}>
                      <Col>{addr.type}</Col>
                      <Col>{addr.value}</Col>
                    </Row>
                    <hr />
                  </Row>
                );
                return row;
              })}
            </Container>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
