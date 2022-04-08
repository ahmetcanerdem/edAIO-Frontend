import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/AddressPage.css";

import {
  NavDropdown, Nav, Row, Container, Col
} from 'react-bootstrap';


const AddressPage = () => {

  const [isAddrLoading, setAddrLoading] = useState(true);

  const [isInfoLoading, setInfoLoading] = useState(true);

  const [data, setData] = useState(true);


  const [info, setInfo] = useState(null);


  let studentNumber = 121101016;

  useEffect(() => {
    axios
      .get(
        "http://localhost:1337/addresses"
      )
      .then((response) => {
        setData(response.data)
        setAddrLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []
  );


  useEffect(() => {
    axios
      .get(
        "http://localhost:1337/profile"
      )
      .then((response) => {
        setInfo(response.data);
        setInfoLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []
  );


  if (isAddrLoading) {
    return <div>Loading...</div>;
  }
  else if (isInfoLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div className="role row">Role: {info.role}</div>
      <div className="row">
        <div className="row" ><label style={{ textAlign: 'right' }}>Bugun {new Date().getDate() + "/" + (new Date().getMonth() + 1)}</label></div>
        <div className='col-md-1' />
        <div className="col-md-3" style={{ padding: 10 }}>
          <div className='row'>
            <div className='col-md-4'>
              <img className="pic" src={JSON.parse(localStorage.getItem("loginData")).picture}></img>
            </div>
            <div className='col-md-8'>
              <div>{JSON.parse(localStorage.getItem("loginData")).name}</div>
              <div>{info.department}</div>
            </div>
          </div>
          <div>{info.id}</div>
          <div>{JSON.parse(localStorage.getItem("loginData")).email}</div>
          <div>{info.advisor}</div>
          <div>{info.advisorMail}</div>
          <Nav className="button-container" >
            <Row style={{ padding: 10 }}>
              <Row><Nav.Link className="button button-1">Bilgilerim</Nav.Link></Row>
              <Row><Nav.Link className="button button-1">Not Goruntuleme</Nav.Link></Row>
              <Row><Nav.Link className="button button-1">Ortak Egitim</Nav.Link></Row>
              <Row><Nav.Link className="button button-1">Ikinci Yabanci Dil</Nav.Link></Row>
              <Row><Nav.Link className="button button-1">Odeme Bilgilerim</Nav.Link></Row>
              <Row><Nav.Link className="button button-1">Adres/Iletisim Bilgilerim</Nav.Link></Row>
            </Row>
          </Nav>
        </div>
        <div className="col-md-8">
          <h4 className='res'>Adres Bilgilerim</h4>
          <Container style={{ paddingRight: 40, paddingTop: 30 }}>
            <Container style={{ backgroundColor: `#dcdcdc`, borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10 }} >
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
          <h4 className='res'>İletişim Bilgilerim</h4>
          <Container style={{ paddingRight: 40, paddingTop: 30, paddingBottom: 20 }}>
            <Container style={{ backgroundColor: `#dcdcdc`, borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10 }} >
              <Row style={{ textAlign: "left" }}>
                <Col>Iletisim Turu</Col>
                <Col>Iletisim Bilgisi</Col>
              </Row>
              {data.contacts.map((addr) => {
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
