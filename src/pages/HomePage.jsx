import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

fontawesome.library.add(faCircleXmark, faCircleCheck);
const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:1337/home")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [datas, setDatas] = useState(null);
  useEffect(() => {
    if (!!data) {
      const gpasData = [];
      data.home[0].gpa.forEach((gpax) => {
        gpasData.push({
          name: gpax.year + " " + gpax.term,
          value: gpax.value,
        });
      });
      setDatas(gpasData);
    }
  }, [data]);

  return (
    <>
      <div>
        <h1>Ana Sayfa</h1>
        <Container>
          {!!data &&
            data.home.map((home) => {
              const row = [];

              row.push(
                <Row key={home}>
                  <Row>
                    <Col style={{paddingRight: 50}}>
                      <Container style={{paddingTop: 100}}>
                        <LineChart
                          width={500}
                          height={200}
                          data={datas}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 30,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <Tooltip wrapperStyle={{ backgroundColor: '#ffffff' }}/>
                          <Line
                            dataKey="value"
                            stroke="#ff0000"
                            fill="#ff0000"
                          />
                        </LineChart>
                      </Container>
                    </Col>
                    <Col>
                      <Container>
                        <h2>Incoming Courses: </h2>
                        {home.incomingCourses.map((incomingCourses) => {
                          const row3 = [];
                          row3.push(
                            <Row
                              key={incomingCourses}
                              style={{ paddingTop: 10 }}
                            >
                              <a href="https://us02web.zoom.us/j/86086854065"><Container 
                                style={{
                                  backgroundColor: `#dcdcdc`,
                                  borderRadius: 10,
                                  border: "2px solid gray",
                                  paddingRight: 10,
                                  paddingTop: 10,
                                  paddingLeft: 10,
                                }}
                              >
                                <Row style={{ paddingLeft: 10 }}>
                                  Tarih: {incomingCourses.date}
                                </Row>
                                <Row style={{ paddingLeft: 10 }}>
                                  Ders Kodu: {incomingCourses.shortCode}
                                </Row>
                                <Row style={{ paddingLeft: 10 }}>
                                  Şube: {incomingCourses.section}
                                </Row>
                                <Row style={{ paddingLeft: 10 }}>
                                  Ders: {incomingCourses.description}
                                </Row>
                                <Row style={{ paddingLeft: 10 }}>
                                  Saat: {incomingCourses.time}
                                </Row>
                              </Container>
                              </a>
                            </Row>
                          );
                          return row3;
                        })}
                      </Container>
                    </Col>
                    <Col>
                      <Container style={{ paddingTop: 60 }}>
                        <Row>
                          <Container
                            style={{
                              backgroundColor: `#dcdcdc`,
                              borderRadius: 10,
                              border: "2px solid gray",
                              paddingRight: 10,
                              paddingTop: 10,
                              paddingLeft: 10,
                            }}
                          >
                            Öğrenci Onayı: {home.isStudentConfirmed ? <FontAwesomeIcon icon="circle-check"></FontAwesomeIcon> : <FontAwesomeIcon icon="circle-xmark"></FontAwesomeIcon>}
                          </Container>
                        </Row>
                        <Row style={{ paddingTop: 20 }}>
                          <Container
                            style={{
                              backgroundColor: `#dcdcdc`,
                              borderRadius: 10,
                              border: "2px solid gray",
                              paddingRight: 10,
                              paddingTop: 10,
                              paddingLeft: 10,
                            }}
                          >
                            Danışman Onayı: {home.isAdvisorConfirmed ? <FontAwesomeIcon icon="circle-check"></FontAwesomeIcon> : <FontAwesomeIcon icon="circle-xmark"></FontAwesomeIcon>}
                          </Container>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                </Row>
              );
              return row;
            })}
        </Container>
      </div>
    </>
  );
};

export default HomePage;
