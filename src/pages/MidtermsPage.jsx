import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Row, Container, Col
} from 'react-bootstrap';

const MakeUpsPage = () => {
  const [isLoading, setLoading] = useState(true);



  let studentNumber = 121101016;

  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(
        "http://localhost:1337/midterms"
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []
  );



  if (isLoading) {
    return <div>Loading...</div>;
  }


  else {
    return (

      <>
        <div className="row" ><label style={{ textAlign: 'right' }}>Bugun {new Date().getDate() + "/" + (new Date().getMonth() + 1)}</label></div>
        <h2 style={{ marginTop: "30px", marginBottom: "30px" }}>
          Ara Sınav Takvimi
        </h2>
        <Container style={{ paddingRight: 40, paddingTop: 30 }}>
          <Container style={{ backgroundColor: `#dcdcdc`, borderRadius: 10, border: "2px solid gray", paddingRight: 10, paddingTop: 10 }} >

            <Row style={{ textAlign: "center" }}>
              <Col>Ders Kodu</Col>
              <Col>Ders Adi</Col>
              <Col>Sinav Tarihi</Col>
              <Col>Derslik</Col>
              <Col>Sinav Baslangic</Col>
              <Col>Sinav Bitis</Col>
              <Col>Gozetmen</Col>
            </Row>
            {data.map((midterm) => {
              const row = [];
              row.push(
                <Row key={midterm} style={{ paddingTop: 10, paddingBottom: 10 }}>

                  <Row style={{ textAlign: "center" }}>
                    <Col>{midterm.code}</Col>
                    <Col>{midterm.name}</Col>
                    <Col>{midterm.date}</Col>
                    <Col>{midterm.class}</Col>
                    <Col>{midterm.start}</Col>
                    <Col>{midterm.finish}</Col>
                    <Col>{midterm.observer}</Col>
                  </Row>
                  <hr />

                </Row>
              );
              return row;
            })}

          </Container>
        </Container>
      </>
    );
  }
};

export default MakeUpsPage;
