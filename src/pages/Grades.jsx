import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Grades = () => {
  const studentId = JSON.parse(localStorage.getItem("userData")).id;
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/student/getTranscript/id=" + studentId)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleUser = ((id) =>{ 
    
  });

  return (
    <>
      <div>
        <h1>Not Bilgilerim</h1>
        <Container style={{ paddingRight: 40, paddingTop: 30 }}>
          {!!data &&
            data.terms.map((term) => {
              const row = [];
              row.push(
                <Row key={term} style={{ padding: 10 }}>
                  <Container style={{ backgroundColor: `#dcdcdc`, borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10 }} >
                    <Row style={{ fontWeight: 'bold', paddingLeft: 10, paddingTop: 10, paddingBottom: 20 }}>{term.name}</Row>

                    <Row>
                      <Col>Ders Kodu</Col>
                      <Col>Ders Adı</Col>
                      <Col>Ders Türü</Col>
                      <Col>Harf Notu</Col>
                    </Row>
                    <hr />
                    {term.courses.map((course) => {
                      const row2 = [];
                      row2.push(
                        <Row key={course}>
                          <Row>
                            <Col>{course.code}</Col>
                            <Col>{course.name}</Col>
                            <Col>{course.courseType}</Col>
                            {/* <Col>{course.degreeType}</Col> */}
                            {/* <Col>{course.repeat}</Col> */}
                            {/* <Col>{course.lastTerm}</Col> */}
                            {/* <Col>{course.substitutedCourse}</Col> */}
                            <Col>{course.grade}</Col>
                          </Row>
                          <hr />
                        </Row>
                      );
                      return row2;
                    })}
                  </Container>
                </Row>
              );
              return row;
            })}
        </Container>
      </div>
    </>
  );
};

export default Grades;
