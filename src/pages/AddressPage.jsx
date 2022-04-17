import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/AddressPage.css";

import { getCurrentDate } from "../helpers/functions";

import { Nav, Row, Container, Col } from "react-bootstrap";

const AddressPage = () => {
  const [isAddrLoading, setAddrLoading] = useState(false);
  const [isContactLoading, setContactLoading] = useState(false);
  const [isInfoLoading, setInfoLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const studentId = userInfo.studentID;
  const [info, setInfo] = useState(null);
  const [addr, setAddr] = useState(null);
  const [data, setData] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [reload, setReload] = useState(1);

  useEffect(async () => {
    if(!!studentId){
      const getContacts = await axios.get("http://localhost:5000/student/getContact/id=" + studentId);
      if (!!getContacts.data) {
        setContacts(getContacts.data.contacts);
        setContactLoading(false);
      } else
        console.log(getContacts.error);

      const getProfile = await axios.get("http://localhost:5000/student/getProfile/id=" + studentId);
      if (!!getProfile.data) {
        setInfo(getProfile.data);
        setInfoLoading(false);
      }else
        console.log(getProfile.error);

      const getAddress = await axios.get("http://localhost:5000/student/getAddress/id=" + studentId);
      if (!!getAddress.data) {
        setAddr(getAddress.data.address);
        setAddrLoading(false);
      } else
        console.log(getAddress.error);

      setReload(prevState => prevState + 1);  
    }
  }, []);

  return (

    !(isAddrLoading && isInfoLoading && isContactLoading) && reload && 
    
    <>
      <div>
        <Row>
          <Col xs={8}></Col>
          <Col>
            Rol:{" "}
            {dataUser.isStudent ? (
              <>Ogrenci</>
            ) : (
              <>Ogretmen</>
            )}
          </Col>
          <Col>
            Merhaba {userInfo.name}
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
    
            <div className="col-md-8">
              <div>{userInfo.name}</div>
              <div>{info?.department}</div>
            </div>
          </div>
          <div>{info?.id}</div>
          <div>{userInfo.email}</div>
          <div>{info?.advisor}</div>
          <div>{info?.advisorMail}</div>
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
          <h4 className="res" style={{marginTop: 140}}>Adres Bilgilerim</h4>
          <Container style={{ paddingRight: 40, paddingTop: 30 }}>
            <Container
              style={{
                backgroundColor: `#dcdcdc`,
                borderRadius: 10,
                border: "2px solid gray",
                paddingRight: 10,
              }}
            >
              <Row style={{ textAlign: "left" }}>
                <Col>Adres Turu</Col>
                <Col>Adres</Col>
                <Col>Sehir</Col>
                <Col>Ilce</Col>
                <Col>Posta Kodu</Col>
              </Row>
              {addr?.map((address) => {
                const row = [];
                row.push(
                  <Row key={address} style={{ padding: 10 }}>
                    <Row style={{ textAlign: "left" }}>
                      <Col>{address?.addrType}</Col>
                      <Col>{address?.country}</Col>
                      <Col>{address?.city}</Col>
                      <Col>{address?.state}</Col>
                      <Col>{address?.postalCode}</Col>
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
              {contacts?.map((contact) => {
                const row = [];
                row.push(
                  <Row key={contact} style={{ padding: 10 }}>
                    <Row style={{ textAlign: "left" }}>
                      <Col>{contact?.name}</Col>
                      <Col>{contact?.value}</Col>
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
