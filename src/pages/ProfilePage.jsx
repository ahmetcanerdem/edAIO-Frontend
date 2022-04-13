import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavDropdown, Nav, Container, Row, Col, Stack } from "react-bootstrap";
import "../styles/Buttons.css";
import "../styles/ProfilePage.css";
import { getCurrentDate } from "../helpers/functions";

function ProfilPage() {
  const [data, setData] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));

  useEffect(() => {
    axios.get("http://localhost:5000/student")
      .then(response => {
        handleUser(response.data.student[0]._id)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const handleUser = ((id) => {
    axios.get("http://localhost:5000/student/getProfile/id=" + id)  //JSON.parse(localStorage.getItem("loginData")).user._id
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  });

  return (
    <>
     <Row>
          <Col xs={8}></Col>
          {/* <Col>
            Rol:{" "}
            {JSON.parse(localStorage.getItem("loginData")).user.isAdmin ? (
              <>Admin</>
            ) : (
              <>Ogrenci</>
            )}
          </Col> */}
          <Col>
            Merhaba {userInfo.name}
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Col xs={10}>
            <h2>Bilgilerim</h2>
          </Col>
          <Col>Bugun: {getCurrentDate("/")}</Col>
        </Row>
      <Container style={{ backgroundColor: 'gray', borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10 }}>
        <Row>
          <Col xs={4}>
            <Container style={{ marginTop: "3%", backgroundColor: 'white', borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10 }}>
              {!!data ? (<>
                <Row>
                  <Col><img src={data.image} className="masked" /></Col>
                  <Col>
                    <Row>{data.name}</Row>
                    <Row>{data.department}</Row>
                  </Col>
                </Row>

                <Row>Ogrenci No: {data.id}</Row>
                <Row>E-mail: {data.email}</Row>
                <Row>Danisman: {data.advisor}</Row>
                <Row>Danisman E-mail: {data.advisorMail}</Row>
                <Nav.Link className="button button-1" href="/profile/info">Bilgilerim</Nav.Link>
                <Nav.Link className="button button-1" href="/profile/grades">Not Goruntuleme</Nav.Link>
                <Nav.Link className="button button-1" href="/profile/internships">Ortak Egitim Bilgileri</Nav.Link>
                <Nav.Link className="button button-1" href="/profile/sfl">Ikinci Yabanci Dil</Nav.Link>
                <Nav.Link className="button button-1" href="/profile/payment">Odeme Bilgilerim</Nav.Link>
                <Nav.Link className="button button-1" href="/profile/addresses">Adres/Iletisim Bilgilerim</Nav.Link>

              </>) : (<></>)}
            </Container>
          </Col>
          <Col>
            <Container style={{ marginTop: "1%", backgroundColor: 'white', borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10 }}>
              <Row>
                <h3>
                  Ana Dal Bilgilerim
                </h3>
              </Row>
              {!!data ? (<>
                <Row>
                  <Col xs={6} style={{borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10}}>{data.department}</Col>
                  <Col style={{borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10}}>
                    <Row>{data.class}</Row>
                    <Row>{data.status}</Row>
                  </Col>
                  <Col style={{borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10}}>
                    <Row>{data.gpa}</Row>
                    <Row>Ortalama</Row>
                  </Col>
                </Row>
                <Row> </Row>
                <Col xs={6} style={{borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10}}>
                  <Row>
                    <Col xs={4}>Burs Durumu:</Col>
                    <Col></Col>
                    <Col xs={1}>{data.scholarship}</Col>
                  </Row>

                  <Row>
                    <Col xs={4}>Egitim Yariyili:</Col>
                    <Col></Col>
                    <Col xs={1}>{data.term}</Col>
                  </Row>

                  <Row>
                    <Col xs={4}>Mufredat:</Col>
                    <Col></Col>
                    <Col xs={7}>{data.department} Lisans Programi</Col>
                  </Row>

                  <Row>
                    <Col xs={4}>Kayit Tarihi:</Col>
                    <Col></Col>
                    <Col xs={4}>{(data.createdAt).substring(0, 10)}</Col>
                  </Row>
                  <Row>
                  <Col></Col>
                    <Col xs={5}>
                      <Row>{data.creditsCompleted}</Row>
                      <Row>Tamamlanan Kredi</Row>
                    </Col>
                    <Col></Col>
                    <Col xs={5}>
                      <Row>{data.creditsTaken}</Row>
                      <Row>Alinan Kredi</Row>
                    </Col>
                  </Row>
                </Col>
              </>) : (<></>)}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProfilPage;
