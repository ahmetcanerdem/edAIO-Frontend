import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getCurrentDate } from "../helpers/functions";

const Appointment = () => {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("loginData"));
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/student")
      .then((response) => {
        handleUser(response.data.student[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleUser = ((id) =>{ 
    axios
      .get("http://localhost:5000/student/getAppointment/id=" + id)
      .then((response) => {

        console.log(JSON.parse(localStorage.getItem("loginData")));
        setData(response.data);
      })
      .catch((error) => {
        console.log("AAAAAAAAAA");
        console.log(error);
      });
  });

  return (
    <>
      <div>
      <Row>
          <Col xs={8}></Col>
          <Col>
            Rol:{" "}
            {user.isAdmin ? (
              <>Admin</>
            ) : (
              <>Ogrenci</>
            )}
          </Col>
          <Col>
            Merhaba {user.name}
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Col xs={10}>
            <h2>Randevular</h2>
          </Col>
          <Col>Bugun: {getCurrentDate("/")}</Col>
        </Row>
        <Container>
          <Row>
            <Container style={{ paddingBottom: 20, paddingTop: 20 }}>
              <h2>Öğretim Görevlisi Randevuları:</h2>
              {!!data &&
                data.lecturerAppointments.map((lecture) => {
                  const row = [];

                  row.push(
                    <Row key={lecture}>
                      <div>
                        <Row style={{ paddingBottom: 10, paddingTop: 10 }}>
                          <Container
                            style={{
                              paddingBottom: 10,
                              paddingTop: 10,
                              backgroundColor: `#dcdcdc`,
                              borderRadius: 10,
                              border: "2px solid gray",
                            }}
                          >
                            <Row>
                              <Col style={{ fontWeight: "bold" }}>
                                Ders Kodu:{" "}
                              </Col>
                              <Col style={{ paddingRight: 800 }}>
                                {lecture.code}
                              </Col>
                            </Row>
                            <Row>
                              <Col style={{ fontWeight: "bold" }}>
                                Öğretim Görevlisi:
                              </Col>
                              <Col style={{ paddingRight: 800 }}>
                                {lecture.teacherName}
                              </Col>
                            </Row>
                          </Container>
                        </Row>
                        <Row>
                          <Container
                            style={{
                              backgroundColor: `#dcdcdc`,
                              borderRadius: 10,
                              border: "2px solid gray",
                            }}
                          >
                            <Row
                              style={{ fontWeight: "bold", paddingLeft: 10 }}
                            >
                              Randevular:{" "}
                            </Row>
                            <Container
                              style={{ paddingTop: 10, paddingBottom: 10 }}
                            >
                              {lecture.appointments.map((appointment) => {
                                const row2 = [];
                                row2.push(
                                  <Row
                                    key={appointment}
                                    style={{ paddingTop: 5 }}
                                  >
                                    <Container
                                      style={{
                                        backgroundColor: `#CDCFCE`,
                                        borderRadius: 10,
                                        border: "1px solid gray",
                                        paddingLeft: 20,
                                      }}
                                    >
                                      <Row>Date: {appointment.date}</Row>
                                      <Row>Hours: {appointment.hours}</Row>
                                    </Container>
                                  </Row>
                                );
                                return row2;
                              })}
                            </Container>
                          </Container>
                        </Row>
                      </div>
                    </Row>
                  );
                  return row;
                })}
            </Container>
          </Row>

          <Row>
            <Container style={{ paddingBottom: 20, paddingTop: 20 }}>
              <h2>Öğrenci İşleri Randevuları:</h2>
              {!!data &&
                data.studentAffairsAppointments.map((studentAffairs) => {
                  const row = [];

                  row.push(
                    <Row key={studentAffairs}>
                      <div>
                        <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
                          <Container
                            style={{
                              paddingBottom: 10,
                              paddingTop: 10,
                              backgroundColor: `#dcdcdc`,
                              borderRadius: 10,
                              border: "2px solid gray",
                            }}
                          >
                            <Row>
                              <Col style={{ fontWeight: "bold" }}>
                                Personel:
                              </Col>
                              <Col style={{ paddingRight: 800 }}>
                                {studentAffairs.personnelName}
                              </Col>
                            </Row>
                          </Container>
                        </Row>
                        <Row>
                          <Container
                            style={{
                              backgroundColor: `#dcdcdc`,
                              borderRadius: 10,
                              border: "2px solid gray",
                            }}
                          >
                            <Row
                              style={{ fontWeight: "bold", paddingLeft: 10 }}
                            >
                              Randevular:{" "}
                            </Row>

                            <Container
                              style={{ paddingTop: 10, paddingBottom: 10 }}
                            >
                              {studentAffairs.appointments.map(
                                (appointment) => {
                                  const row2 = [];
                                  row2.push(
                                    <Row
                                      key={appointment}
                                      style={{ paddingTop: 5 }}
                                    >
                                      <Container
                                        style={{
                                          backgroundColor: `#CDCFCE`,
                                          borderRadius: 10,
                                          border: "1px solid gray",
                                          paddingLeft: 20,
                                        }}
                                      >
                                        <Row>Tarih: {appointment.date}</Row>
                                        <Row>Saat: {appointment.hours}</Row>
                                      </Container>
                                    </Row>
                                  );
                                  return row2;
                                }
                              )}
                            </Container>
                          </Container>
                        </Row>
                      </div>
                    </Row>
                  );
                  return row;
                })}
            </Container>
          </Row>
          <Row>
            <Container style={{ paddingBottom: 20, paddingTop: 20 }}>
              <h2>Danışman Öğretmen Randevuları:</h2>
              {!!data &&
                data.advisorAppointments.map((advisor) => {
                  const row = [];
                  row.push(
                    <Row key={advisor}>
                      <div>
                        <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
                          <Container
                            style={{
                              paddingBottom: 10,
                              paddingTop: 10,
                              backgroundColor: `#dcdcdc`,
                              borderRadius: 10,
                              border: "2px solid gray",
                            }}
                          >
                            <Row>
                              <Col style={{ fontWeight: "bold" }}>
                                Danışman Öğretmen:
                              </Col>
                              <Col style={{ paddingRight: 800 }}>
                                {advisor.teacherName}
                              </Col>
                            </Row>
                          </Container>
                        </Row>
                        <Row>
                          <Container
                            style={{
                              backgroundColor: `#dcdcdc`,
                              borderRadius: 10,
                              border: "2px solid gray",
                            }}
                          >
                            <Row
                              style={{ fontWeight: "bold", paddingLeft: 10 }}
                            >
                              Randevular:{" "}
                            </Row>
                            <Container
                              style={{ paddingTop: 10, paddingBottom: 10 }}
                            >
                              {advisor.appointments.map((appointment) => {
                                const row2 = [];
                                row2.push(
                                  <Row
                                    key={appointment}
                                    style={{ paddingTop: 5 }}
                                  >
                                    <Container
                                      style={{
                                        backgroundColor: `#CDCFCE`,
                                        borderRadius: 10,
                                        border: "1px solid gray",
                                        paddingLeft: 20,
                                      }}
                                    >
                                      <Row>Tarih: {appointment.date}</Row>
                                      <Row>Saat: {appointment.hours}</Row>
                                    </Container>
                                  </Row>
                                );
                                return row2;
                              })}
                            </Container>
                          </Container>
                        </Row>
                      </div>
                    </Row>
                  );
                  return row;
                })}
            </Container>
          </Row>

          <Row>
            <Container style={{ paddingBottom: 20, paddingTop: 20 }}>
              <h2>Bilişim Teknolojileri Randevuları:</h2>
              {!!data && (
                <div>
                  {data.ITAppointments.map((it) => {
                    const row = [];
                    row.push(
                      <Row key={it}>
                        <div>
                          <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Container
                              style={{
                                paddingBottom: 10,
                                paddingTop: 10,
                                backgroundColor: `#dcdcdc`,
                                borderRadius: 10,
                                border: "2px solid gray",
                              }}
                            >
                              <Row style={{paddingLeft: 20}}>Tarih: {it.date}</Row>
                              <Row style={{paddingLeft: 20}}>Saat: {it.hours}</Row>
                            </Container>
                          </Row>
                        </div>
                      </Row>
                    );
                    return row;
                  })}
                </div>
              )}
            </Container>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Appointment;
