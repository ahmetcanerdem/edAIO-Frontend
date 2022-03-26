import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const PaymentInfo = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:1337/payment")
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
        <h1>Ödeme Bilgilerim</h1>
        <Container style={{paddingRight: 40, paddingTop: 30}}>
        <Container style={{borderRadius: 10, border: "2px solid gray", backgroundColor: `#dcdcdc`, paddingBottom: 20, paddingTop: 20}}>
          <Row style={{fontWeight: 'bold'}}>
            <Col>Öğrenim Bilgileri</Col>
            <Col>Öğretim Dönemi</Col>
            <Col>Ücret Tipi</Col>
            <Col>Ücret Tutarı</Col>
            <Col>Tahsilat</Col>
          </Row>
          {!!data &&
            data.payments.map((payment) => {
              const row = [];

              row.push(
                <div key={payment}>
                  <hr />
                  <Row>
                    <Col>{payment.year}</Col>
                    <Col>{payment.term}</Col>
                    <Col>{payment.paymentType}</Col>
                    <Col>{payment.fee}</Col>
                    <Col>{payment.collection}</Col>
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

export default PaymentInfo;
