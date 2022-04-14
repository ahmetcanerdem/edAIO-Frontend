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

const Appointment = () => {
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(1);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const studentId = userInfo.studentId;
  const [isExpanded, setExpanded] = useState(false);
  const [dataClassification, setDataClassification] = useState([]);
  const [shownData, setShownData] = useState(null);
  const [shownRows, setShownRows] = useState(null);
  const [buttons, setButtons] = useState(null);

  useEffect(async () => {
    let response = await axios.get(
      "http://localhost:5000/student/getAppointment/id=" + studentId
    );
    if (!!response.data) {
      setData(response.data);
      setDataWithDatabase();
    }
    else console.log(response.error);
  }, []);

  const setDataWithDatabase = () => {
    if (!!data) {
      const classifications = [
        {
          header: "Öğretim Görevlisi Randevuları",
          appointmentHeader: "Öğretim Görevlisi",
          appointments: data.lecturerAppointments,
          code: data.lecturerAppointments.code,
          attName: "teacherName",
        },
        {
          header: "Öğrenci İşleri Randevuları",
          appointmentHeader: "Personel",
          appointments: data.studentAffairsAppointments,
          toAppointment: data.studentAffairsAppointments.appointmentToName,
          code: data.studentAffairsAppointments.code,
          attName: "personnelName",
        },
        {
          header: "Danışman Öğretmen Randevuları",
          appointmentHeader: "Danışman Öğretmen",
          appointments: data.advisorAppointments,
          toAppointment: data.advisorAppointments.appointmentToName,
          code: data.advisorAppointments.code,
          attName: "teacherName",
        },
        {
          header: "Bilişim Teknolojileri Randevuları",
          appointments: data.ITAppointments,
          toAppointment: data.ITAppointments.appointmentToName,
          code: data.ITAppointments.code,
          attName: "personnelName",
        },
      ];
      setDataClassification(classifications);
      setButtonsByClassification();
    }
  }

  const setButtonsByClassification = () => {
    if (dataClassification.length > 0) {
      const options = [];
      dataClassification.forEach((classfct) => {
        options.push(
          <div style={{ textAlign: "center", width: "100% !important" }}>
            <button
              style={{
                backgroundColor: "#86afef",
                border: "darkblue solid 1px",
                width: "75% !important",
              }}
              onClick={(e) => {
                willBeShown(e.target.innerText);
              }}
            >
              {classfct.header}
            </button>
          </div>
        );
      });
      setButtons(options);
      setReload(prevState => prevState + 1);
    }
  };

  const willBeShown = (shownAppointments) => {
    let classificationShown = null;
    dataClassification.forEach((clss) => {
      if (clss.header == shownAppointments) {
        classificationShown = clss;
      }
    });
    setShownData(classificationShown);
    setRowsByShownButton();
  };

  const setRowsByShownButton = () => {
    if (!!shownData) {
      const rows = [];
      shownData?.appointments?.forEach((appointment) => {
        setShownData({
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
      });
      setShownRows(rows);
    }
  }

  return (
    reload && <>
      <div>
        <Accordion>
          <AccordionItem>
            <AccordionItemHeading
              onClick={() => {
                setExpanded(!isExpanded);
                setReload(prevState => prevState + 1)
              }}
            >
              <AccordionItemButton>
                <h4 className="accordion-item-button-header">
                  Randevuları Görüntüle
                </h4>
                {buttons}
              </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel>
              {!!shownData && (
                <Row>
                  <Container style={{ paddingBottom: 20, paddingTop: 20 }}>
                    <h2>{shownData?.header}</h2>
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
                                <div>
                                  {shownData?.appointmentHeader
                                    ? shownData.appointmentHeader +
                                      ": " +
                                      shownData.toAppointment
                                    : null}
                                </div>
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
                              {shownRows}
                            </Container>
                          </Container>
                        </Row>
                      </div>
                    </Row>
                  </Container>
                </Row>
              )}
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Appointment;
