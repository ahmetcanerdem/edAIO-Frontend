import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "../styles/Appointment.css";

const Appointment = () => {
  const [data, setData] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const studentId = userInfo.studentId;
  const [isExpanded, setExpanded] = useState(false);
  const [dataClassification, setDataClassification] = useState([]);
  const [shownData, setShownData] = useState(null);
  const [shownNewData, setNewShownData] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [rowShown, setRowShown] = useState(null);
  const [shownPanelContext, setShownPanelContext] = useState();
  const [buttonHeader, setButtonHeader] = useState();
  const [reload, setReload] = useState(1);

  useEffect(async () => {
    let response = await axios.get(
      "http://localhost:5000/student/getAppointment/id=" + studentId
    );
    if (!!response.data) {
      setData(response.data);
    } else console.log(response.error);
  }, []);

  useEffect(async () => {
    if (!!data) {
      const classifications = [
        {
          header: "Öğretim Görevlisi Randevuları",
          appointmentHeader: "Öğretim Görevlisi",
          appointments: data.lecturerAppointments,
          code: data.lecturerAppointments.code,
          attName: "appointmentsWith",
        },
        {
          header: "Öğrenci İşleri Randevuları",
          appointmentHeader: "Personel",
          appointments: data.studentAffairsAppointments,
          toAppointment: data.studentAffairsAppointments.appointmentToName,
          code: data.studentAffairsAppointments.code,
          attName: "appointmentsWith",
        },
        {
          header: "Danışman Öğretmen Randevuları",
          appointmentHeader: "Danışman Öğretmen",
          appointments: data.advisorAppointments,
          toAppointment: data.advisorAppointments.appointmentToName,
          code: data.advisorAppointments.code,
          attName: "appointmentsWith",
        },
        {
          header: "Bilişim Teknolojileri Randevuları",
          appointmentHeader: "IT Yetkilisi",
          appointments: data.ITAppointments,
          toAppointment: data.ITAppointments.appointmentToName,
          code: data.ITAppointments.code,
          attName: "appointmentsWith",
        },
      ];
      setDataClassification(classifications);
    }
  }, [data]);

  useEffect(async () => {
    if (dataClassification.length > 0) {
      const options = [];
      dataClassification.forEach((classfct) => {
        options.push(
          <div className="button-appointment-div">
            <button className="button-appointment"
              onClick={(e) => {
                setButtonHeader(e.target.innerText);
              }}
            >
              {classfct.header}
            </button>
          </div>
        );
      });
      setButtons(options);
    }
  }, [dataClassification]);

  useEffect(async () => {
    let classificationShown = null;
    dataClassification.forEach((clss) => {
      if (clss.header == buttonHeader) {
        classificationShown = clss;
      }
    });
    setShownData(classificationShown);
  }, [buttonHeader]);

  useEffect(async () => {
    if (!!shownData) {
      const rows = [];
      shownData?.appointments?.forEach((appointment) => {
        setNewShownData({
          ...shownData,
          toAppointment: appointment[shownData.attName],
        });
        appointment?.appointments?.forEach((anApp) => {
          rows.push(
            <Row style={{ paddingTop: 5 }}>
              <Container
                style={{
                  backgroundColor: `#CDCFCE`,
                  borderRadius: 10,
                  border: "1px solid gray",
                  paddingLeft: 20,
                }}
              >
                <Row>Tarih: {anApp.date}</Row>
                <Row>Saat: {anApp.hours}</Row>
              </Container>
            </Row>
          );
        });
        setRowShown(rows);
      });
    }
  }, [shownData]);

  useEffect(()=>{
      setShownPanelContext(
        <Row>
          <Container style={{ paddingBottom: 20, paddingTop: 20 }}>
            <h2>{shownNewData?.header}</h2>
            <Row>
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
                        {shownNewData?.appointmentHeader
                          ? shownNewData.appointmentHeader +
                            ": " +
                            shownNewData?.toAppointment
                          : null}
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
                    <Row style={{ fontWeight: "bold", paddingLeft: 10 }}>
                      Randevular:{" "}
                    </Row>
                    <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
                      {rowShown}
                    </Container>
                  </Container>
                </Row>
              </div>
            </Row>
          </Container>
        </Row>
      );
  },[shownNewData]);

  return (
    reload && <>
      <div>
        <Accordion>
          <AccordionItem>
            <AccordionItemHeading
              onClick={(e) => {
                setExpanded(!isExpanded);
                setButtonHeader(e.target.innerText);
                setReload(prevState => prevState + 1);
              }}
            >
              <AccordionItemButton>
                <h4 className="accordion-item-button-header appointment">
                  Randevuları Görüntüle
                </h4>
                {buttons}
              </AccordionItemButton>
            </AccordionItemHeading>
            {
              !!shownData && (
                <AccordionItemPanel> {shownPanelContext}</AccordionItemPanel>
              )
            }
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading
              onClick={(e) => {
                setReload(prevState => prevState + 1);
              }}
            >
              <AccordionItemButton>
                <h4 className="accordion-item-button-header appointment">
                  Randevu Al
                </h4>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <h2>Loading</h2>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Appointment;
