import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavDropdown, Row, Col, Form, Container } from "react-bootstrap";
import "../styles/Buttons.css";

function EditStudent() {
  const location = useLocation();
  const userId = location.state;
  const scholars = [100, 75, 50, 25, 0];
  const status = ["aktif", "pasif", "mezun"];
  const grade = ["1", "2", "3", "4"];
  const [dataScholarShip, setDataScholarShip] = useState(null);
  const [data, setData] = useState(null);
  const [dataPayment, setDataPayment] = useState(null);
  const [lecturers, setLecturers] = useState(null);
  const [dataStatus, setDataStatus] = useState(null);
  const [dataGrade, setDataGrade] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [reload, setReload] = React.useState(1);
  const [advisor, setAdvisor] = useState(null);
  const [user, setUser] = useState(null);

  const [putContext, setPutContext] = React.useState({
    schoolMail: null,
    id: null,
    status: null,
    code:null,
    year: null,
    companyName: null,
    startDate: null,
    endDate: null,
    grade: null,
    scholarship: null,
    term: null,
    value: null,
    year: null,
    gpa: null,
    secondForeignLanguage: null,
    department: null,
    user:null,
    advisor: null,
    credit: null,
    assignments: null,
    course: null,
    courseType: null,
    paymentType: null,
    fee: null,
    collection: null,
    approvement: null,
    lecturerApprovement: null,
    rank:null,
    company: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getId/id=" + userId)
      .then((response) => {
        setStudentId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    if (!!studentId) {
      axios
        .get("http://localhost:5000/student/id=" + studentId)
        .then((response) => {
          // console.log(response.data.student[0]);
          setData(response.data.student[0]);
          setAdvisor(response.data.student[0].advisor);
          setPutContext({
              ...putContext,
              advisor: response.data.student[0].advisor,
              scholarship: response.data.student[0].scholarship,
              status: response.data.student[0].status,
              grade: response.data.student[0].grade,

          });
          setReload((prevState) => prevState + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [studentId]);

  useEffect(() => {
    if (!!advisor) {
      axios
        .get("http://localhost:5000/lecturer/id=" + advisor)
        .then((response) => {
          setLecturers(response.data);
          setPutContext({
            ...putContext,
            lecturer: response.data
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [advisor]);

  useEffect(() => {
    if (!!data) {
      setUser(data);
    }
  }, [data]);

  const handlePayment = () => {
    axios
      .get("http://localhost:5000/student/getFeeInfo/id=" + studentId)
      .then((response) => {
        setPutContext({
          ...putContext,
          payment: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },lecturers);

  const handleScholar = (e) => {
    setDataScholarShip(scholars[e.target.attributes.value.value]);
    user.scholarship = scholars[e.target.attributes.value.value];
  };
  const handleStatus = (e) => {
    setDataStatus(status[e.target.attributes.value.value]);
    user.status = status[e.target.attributes.value.value];
  };
  const handleGrade = (e) => {
    setDataGrade(grade[e.target.attributes.value.value]);
    user.grade = grade[e.target.attributes.value.value];
  };

  const editStudent = () => {
    console.log(user);
    axios({
      method: "put",
      url: "http://localhost:5000/student/edit/" + studentId,
      data: user,
    });
  };

  return (
    reload && (
      <div>
        <h1>Öğrenci Düzenle</h1>
        <div class="row">
          {!!data &&
            data.internships.map((internship) => {
              const row = [];
              row.push(
                <Row key={internship}>
                  <Container style={{ paddingLeft: 35, paddingTop: 30 }}>
                    <Container
                      style={{
                        borderRadius: 10,
                        border: "2px solid gray",
                        backgroundColor: `#dcdcdc`,
                        paddingBottom: 20,
                        paddingTop: 20,
                      }}
                    >
                      <Row>
                        <Col>Ortak Eğitim Türü</Col>
                        <Col>Yıl</Col>
                        <Col>Dönem</Col>
                        <Col>Firma Adı</Col>
                        <Col>Başlangıç</Col>
                        <Col>Bitiş</Col>
                        <Col>Grade</Col>
                      </Row>
                      <Row>
                        <Col>
                          <input
                            type="text"
                            placeholder={internship.code}
                            style={{ width: "120px" }}
                            onChange={(e) => user.internships[0].code=e.target.value}
                          />
                        </Col>
                        <Col>
                          <input
                            type="number"
                            placeholder={internship.year}
                            style={{ width: "120px" }}
                            onChange={(e) => user.internships[0].year=e.target.value}
                          />
                        </Col>
                        <Col>
                          <input
                            type="text"
                            placeholder={internship.term}
                            style={{ width: "120px" }}
                            onChange={(e) => user.internships[0].term=e.target.value}
                          />
                        </Col>
                        <Col>
                          <input
                            type="text"
                            placeholder={internship.companyName}
                            style={{ width: "120px" }}
                            onChange={(e) => user.internships[0].companyName=e.target.value}
                          />
                        </Col>
                        <Col>
                          <input
                            type="date"
                            placeholder={internship.startDate}
                            style={{ width: "120px" }}
                            onChange={(e) => user.internships[0].startDate=e.target.value}
                          />
                        </Col>
                        <Col>
                          <input
                            type="date"
                            placeholder={internship.endDate}
                            style={{ width: "120px" }}
                            onChange={(e) => user.internships[0].endDate=e.target.value}
                          />
                        </Col>
                        <Col>
                          <input
                            type="text"
                            placeholder={internship.grade}
                            style={{ width: "120px" }}
                            onChange={(e) => user.internships[0].grade=e.target.value}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </Container>
                </Row>
              );
              return row;
            })}
          {!!data && !!dataLecturer && !!user && (
            <>
              <Container style={{ paddingTop: 30 }}>
                <Container
                  style={{
                    borderRadius: 10,
                    border: "2px solid gray",
                    backgroundColor: `#dcdcdc`,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                >
                  <Row>
                    <Col>Mail</Col>
                    <Col>Okul Numarasi</Col>
                    <Col>Ogrenci Durumu</Col>
                    <Col>Burs</Col>
                    <Col>Sinif</Col>
                  </Row>
                  <Row>
                    <Col>
                      <input
                        type="text"
                        placeholder={data.schoolMail}
                        style={{ witdh: "120px" }}
                        onChange={(e) => user.schoolMail=e.target.value}
                      />
                    </Col>
                    <Col>
                      <input
                        type="number"
                        placeholder={data.id}
                        style={{ width: "120px" }}
                        onChange={(e) => user.id=e.target.value}
                      />
                    </Col>
                    <Col>
                      <NavDropdown
                        className="button button-1"
                        title={dataStatus}
                        
                      >
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              status: status[e.target.attributes.value.value]
                          })} 
                          key={0}
                          value={0}
                        >
                          aktif
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              status: status[e.target.attributes.value.value]
                          })} 
                          key={1}
                          value={1}
                        >
                          pasif
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              status: status[e.target.attributes.value.value]
                          })} 
                          key={2}
                          value={2}
                        >
                          mezun
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                    <Col>
                      <NavDropdown
                        className="button button-1"
                        title={dataScholarShip}
                      >
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              scholarship: scholars[e.target.attributes.value.value]
                          })}
                          key={0}
                          value={0}
                        >
                          100
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="button button-1" 
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              scholarship: scholars[e.target.attributes.value.value]
                          })}
                          key={1}
                          value={1}
                        >
                          75
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              scholarship: scholars[e.target.attributes.value.value]
                          })}
                          key={2}
                          value={2}
                        >
                          50
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="button button-1"
                          oonClick={(e) => 
                            setPutContext({
                              ...putContext,
                              scholarship: scholars[e.target.attributes.value.value]
                          })}
                          key={3}
                          value={3}
                        >
                          25
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              scholarship: scholars[e.target.attributes.value.value]
                          })}
                          key={4}
                          value={4}
                        >
                          0
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                    <Col>
                      <NavDropdown
                        className="button button-1"
                        title={dataGrade}
                      >
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              grade: grade[e.target.attributes.value.value]
                          })} 
                          key={0}
                          value={0}
                        >
                          1
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              grade: grade[e.target.attributes.value.value]
                          })} 
                          key={1}
                          value={1}
                        >
                          2
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              grade: grade[e.target.attributes.value.value]
                          })} 
                          key={2}
                          value={2}
                        >
                          3
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="button button-1"
                          onClick={(e) => 
                            setPutContext({
                              ...putContext,
                              grade: grade[e.target.attributes.value.value]
                          })} 
                          key={3}
                          value={3}
                        >
                          4
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                  </Row>
                </Container>
              </Container>
              <Container style={{ paddingTop: 30 }}>
                <Container
                  style={{
                    borderRadius: 10,
                    border: "2px solid gray",
                    backgroundColor: `#dcdcdc`,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                >
                  <Row>
                    <Col>Donem</Col>
                    <Col>gpa</Col>
                    <Col>Ikinci Yabanci Dil</Col>
                    <Col>Danisman Hoca</Col>
                    <Col>Kredi</Col>
                  </Row>
                  <Row>
                    <Col>
                      <input
                        type="number"
                        placeholder={data.term}
                        style={{ width: "120px" }}
                        onChange={(e) => user.term=e.target.value}
                      />
                    </Col>
                    <Col>
                      <input
                        type="number"
                        placeholder={data.gpa}
                        style={{ width: "120px" }}
                        onChange={(e) => user.gpa=e.target.value}
                      />
                    </Col>
                    <Col>
                      <input
                        type="text"
                        placeholder={data.secondForeignLanguage}
                        style={{ width: "120px" }}
                        onChange={(e) => user.secondForeignLanguage=e.target.value}
                      />
                    </Col>
                    <Col>
                      <input
                        type="text"
                        placeholder={lecturers.lecturer.title}
                        style={{ width: "120px" }}
                      />
                    </Col>
                    <Col>
                      <input
                        type="number"
                        placeholder={data.credit}
                        style={{ width: "120px" }}
                        onChange={(e) => user.credit=e.target.value}
                      />
                    </Col>
                  </Row>
                </Container>
              </Container>
              <Container style={{ paddingTop: 30 }}>
                <Container
                  style={{
                    borderRadius: 10,
                    border: "2px solid gray",
                    backgroundColor: `#dcdcdc`,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                >
                  <Row style={{ fontWeight: "bold" }}>
                    <Col>Öğrenim Bilgileri</Col>
                    <Col>Öğretim Dönemi</Col>
                    <Col>Ücret Tipi</Col>
                    <Col>Ücret Tutarı</Col>
                    <Col>Tahsilat</Col>
                  </Row>
                  {!!dataPayment &&
                    dataPayment.payments.map((payment) => {
                      const row = [];
                      row.push(
                        <div key={payment}>
                          <hr />
                          <Row>
                            <Col>
                              <input
                                type="number"
                                placeholder={payment.year}
                                style={{ width: "120px" }}
                                onChange={(e) => user.payments[0].year=e.target.value}
                              />
                            </Col>
                            <Col>
                              <input
                                type="text"
                                placeholder={payment.term}
                                style={{ width: "120px" }}
                                onChange={(e) => user.payments[0].term=e.target.value}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <input
                                type="text"
                                placeholder={payment.paymentType}
                                style={{ width: "120px" }}
                                onChange={(e) => user.payments[0].paymentType=e.target.value}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <input
                                type="number"
                                placeholder={payment.fee}
                                style={{ width: "120px" }}
                                onChange={(e) => user.payments[0].fee=e.target.value}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <input
                                type="number"
                                placeholder={payment.collection}
                                style={{ width: "120px" }}
                                onChange={(e) => user.payments[0].collection=e.target.value}
                              />
                            </Col>
                          </Row>
                        </div>
                      );
                      return row;
                    })}
                </Container>
              </Container>
            </>
          )}
          <Container style={{ paddingTop: 30 }}>
            <Container
              style={{
                borderRadius: 10,
                border: "2px solid gray",
                backgroundColor: `#dcdcdc`,
                paddingBottom: 20,
                paddingTop: 20,
              }}
            >
              {!!data &&
                data.terms.map((term) => {
                  const row = [];
                  row.push(
                    <Row key={term}>
                      <Row>{term.name}</Row>
                      <Row>
                        <Col>Ders Kodu</Col>
                        <Col>Ders Adi</Col>
                        <Col>Ders Turu</Col>
                        <Col>Harf Notu</Col>
                      </Row>
                      <Row>
                        {!!term &&
                          term.courses.map((course) => {
                            const row2 = [];
                            row2.push(
                              <Row key={course}>
                                {!!course && (
                                  <>
                                    <Row>
                                      <Col>
                                        <input
                                          type="text"
                                          placeholder={course.code}
                                          style={{ width: "120px" }}
                                          onChange={(e) => user.terms[0].courses[0].code=e.target.value}
                                        />
                                      </Col>
                                      <Col>
                                        <input
                                          type="text"
                                          placeholder={course.name}
                                          style={{ width: "120px" }}
                                          onChange={(e) => user.terms[0].courses[0].name=e.target.value}
                                        />
                                      </Col>
                                      <Col>
                                        <input
                                          type="text"
                                          placeholder={course.courseType}
                                          style={{ width: "120px" }}
                                          onChange={(e) => user.terms[0].courses[0].courseType=e.target.value}
                                        />
                                      </Col>
                                      <Col>
                                        <input
                                          type="text"
                                          placeholder={course.grade}
                                          style={{ width: "120px" }}
                                          onChange={(e) => user.terms[0].courses[0].grade=e.target.value}
                                        />
                                      </Col>
                                    </Row>
                                  </>
                                )}
                              </Row>
                            );
                            return row2;
                          })}
                      </Row>
                    </Row>
                  );
                  return row;
                })}
            </Container>
          </Container>
        </div>
        <button type="submit" className="button button-1" onClick={editStudent}>
          Kaydet
        </button>
      </div>
    )
  );
}
export default EditStudent;
