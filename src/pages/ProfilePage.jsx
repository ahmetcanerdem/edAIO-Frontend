import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav, Container, Row, Col } from "react-bootstrap";
import "../styles/Buttons.css";
import "../styles/ProfilePage.css";
import { getCurrentDate } from "../helpers/functions";

function ProfilPage() {
  const server = "http://localhost:5000";
  const [data, setData] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));

  useEffect(() => {
    axios
      .get(server + "/student/getProfile/id=" + JSON.parse(localStorage.getItem("userData")).id) 
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <Row>
        <Col xs={8}></Col>
        <Col>
          Rol:{" "}
          {JSON.parse(localStorage.getItem("userData")).isStudent ? (
            <>Ogrenci</>
          ) : (
            <>Ogretmen</>
          )}
        </Col>
        <Col>Merhaba {userInfo.name}</Col>
      </Row>
      <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Col xs={10}>
          <h2>Bilgilerim</h2>
        </Col>
        <Col>Bugün: {getCurrentDate("/")}</Col>
      </Row>
      <div
        style={{
          paddingRight: 20,
        }}
      >
        <Row>
          <Col xs={1}></Col>
          <Col xs={3}>
            <Container
              style={{
                backgroundColor: "#F5F5F5",
                paddingRight: 10,
                paddingTop: 10,
                height: "600px",
              }}
            >
              {!!data ? (
                <>
                  <Row>
                    <Col>
                      <img src={data.image} className="masked" />
                    </Col>
                    <br/>
                    <Col>
                      <Row>{data.name}</Row>
                      <Row>{data.department}</Row>
                    </Col>
                  </Row>

                  <br/>
                  <Row>Öğrenci No: {data.id}</Row>
                  
                  <br/>
                  <Row>E-mail: {data.email}</Row>
                    <br/>
                  <Row>Danışman: {data.advisor}</Row>
                    <br/>
                  <Row>Danışman E-mail: {data.advisorMail}</Row>
                  
                  <br/>
                  <Nav.Link className="button button-1" href="/profile/info">
                    Bilgilerim
                  </Nav.Link>
                  
                  <Nav.Link className="button button-1" href="/profile/grades">
                    Not Görüntüleme
                  </Nav.Link>
                  <Nav.Link
                    className="button button-1"
                    href="/profile/internships"
                  >
                    Ortak Egitim Bilgileri
                  </Nav.Link>
                  <Nav.Link className="button button-1" href="/profile/sfl">
                    İkinci Yabancı Dil
                  </Nav.Link>
                  <Nav.Link className="button button-1" href="/profile/payment">
                    Ödeme Bilgilerim
                  </Nav.Link>
                  <Nav.Link
                    className="button button-1"
                    href="/profile/addresses"
                  >
                    Adres/İletişim Bilgilerim
                  </Nav.Link>
                </>
              ) : (
                <></>
              )}
            </Container>
          </Col>
          <Col xs={7}>
            <div>
              <Row>
                <div
                  style={{
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <h4 style={{ margin: "22px" }}>Ana Dal Bilgilerim</h4>
                </div>
              </Row>
              <br></br>

              {!!data ? (
                <>
                  <Row>
                    <Col
                      xs={6}
                      style={{
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <div>{data.department}</div>
                    </Col>
                    <Col xs={1} />
                    <Col
                      xs={2}
                      style={{
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <div>
                        <Row>{data.class}. Sinif</Row>
                        <Row>{data.status}</Row>
                      </div>
                    </Col>
                    <Col xs={1} />
                    <Col
                      xs={2}
                      style={{
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <div>
                        <Row>{data.gpa}</Row>
                        <Row>Ortalama</Row>
                      </div>
                    </Col>
                  </Row>

                  <br />
                  <div>
                    <Row>
                      <Col
                        xs={7}
                        style={{
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        <div>
                          <Row>
                            <Col xs={6}>Burs Durumu:</Col>
                            <Col xs={6} style={{textAlign:"right"}}>{data.scholarship}</Col>
                          </Row>
                        </div>
                        <br/>
                        <div>
                          <Row>
                            <Col xs={6}>Egitim Yarıyılı:</Col>
                            <Col xs={6} style={{textAlign:"right"}}>{data.term}</Col>
                          </Row>
                        </div>
                        <br/>
                        <div>
                          <Row>
                            <Col xs={2}>Müfredat:</Col>
                            <Col xs={10} style={{textAlign:"right"}}>{data.department} Lisans Programı</Col>
                          </Row>
                        </div>
                        <br/>
                        <div>
                          <Row>
                            <Col xs={6}>Kayıt Tarihi:</Col>
                            <Col xs={6} style={{textAlign:"right"}}>{data.createdAt.substring(0, 10)}</Col>
                          </Row>
                        </div>
                      </Col>

                      <Col xs={1} />
                      <Col xs={4}>
                        <Nav.Link
                          style={{ width: "100%", height: "100%" }}
                          className="button button-4"
                          href="/otherpages/blog"
                        >
                          <div
                            style={{
                              textAlign: "center",
                              transform: "translateY(100%)",
                            }}
                          >
                            Blog
                          </div>
                        </Nav.Link>
                      </Col>
                    </Row>
                  </div>
                  <br />
                  <Row>
                    <Col xs={1} />
                    <Col xs={3}>
                      <div
                        style={{
                          backgroundColor: "#F5F5F5",
                          margin: "22px",
                        }}
                      >
                        <div>
                          <Row>
                            <label style={{ textAlign: "center" }}>
                              {data.creditsCompleted}
                            </label>
                          </Row>
                          <Row>
                            <label style={{ textAlign: "center" }}>
                              Tamamlanan Kredi
                            </label>
                          </Row>
                        </div>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div
                        style={{
                          backgroundColor: "#F5F5F5",
                          margin: "22px",
                        }}
                      >
                        <div>
                          <Row>
                            <label style={{ textAlign: "center" }}>
                              {data.creditsTaken}
                            </label>
                          </Row>
                          <Row>
                            <label style={{ textAlign: "center" }}>
                              Alınan Kredi
                            </label>
                          </Row>
                        </div>
                      </div>
                    </Col>
                    <Col xs={1} />
                    <Col xs={4}>
                      <Row></Row>
                    </Col>
                  </Row>
                </>
              ) : (
                <></>
              )}
            </div>
          </Col>
          <Col xs={1}></Col>
        </Row>
      </div>
    </>
  );
}

export default ProfilPage;
