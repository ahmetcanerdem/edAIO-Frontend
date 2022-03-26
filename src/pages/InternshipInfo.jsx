import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { Container, Row, Col } from "react-bootstrap";

const InternshipInfo = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:1337/internships")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div class="row">
        <h1>Ortak Eğitim Bilgilerim</h1>
        <Container style={{paddingRight: 40, paddingTop: 30}}>
        <Container style={{borderRadius: 10, border: "2px solid gray", backgroundColor: `#dcdcdc`, paddingBottom: 20, paddingTop: 20}}>
          <Row>
            <Col>Ortak Eğitim Türü</Col>
            <Col>Yıl</Col>
            <Col>Dönem</Col>
            <Col>Firma Adı</Col>
            <Col>Başlangıç</Col>
            <Col>Bitiş</Col>
            <Col>Grade</Col>
          </Row>
          {!!data &&
            data.internships.map((internship) => {
              const row = [];
              row.push(
                <div key={internship}>
                  <hr />
                  <Row>
                    <Col>{internship.type}</Col>
                    <Col>{internship.year}</Col>
                    <Col>{internship.term}</Col>
                    <Col>{internship.companyName}</Col>
                    <Col>{internship.startDate}</Col>
                    <Col>{internship.endDate}</Col>
                    <Col>{internship.grade}</Col>
                  </Row>
                </div>
              );
              return row;
            })}
        </Container>
        </Container>
      </div>
    </>
  );
};

export default InternshipInfo;
