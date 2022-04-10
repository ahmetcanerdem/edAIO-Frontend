import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import convertToShortDate from "../helpers/functions";
import columns from   "../helpers/table";

const MakeUpsPage = () => {
  /*
  Sisteme giris yapan ID yi alacağı
  Bu giriş sayfasında cekilip : 
  JSON.parse(localStorage.getItem("loginData")).id ile 
  doğruda id alıcam :
  (("http://localhost:5000/student/getSFLanguage/id="+JSON.parse(localStorage.getItem("loginData")).id))
  şeklinde atacağım.

  let user = await axios.get("http://localhost:5000/getUser");
    if (!!user.data) {
      localStorage.setItem("loginData", JSON.stringify(user.data));
    } else {
      console.log(user.error);
      yazacağım.
    }
  */
  const [isLoading, setLoading] = useState(true);
  const [isAnnouncement, setAnnouncement] = useState(false);
  const userIDTemp = "623e3bbb92a74c8f919058c7";

  const [data, setData] = useState(null);
  const [makeUpExam, setMakeUpExam] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/student/getExamInfo/id=" + userIDTemp)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(data);
    const makeUp = [];
    let announcement = false;
    data?.makeUpExam.forEach((exam) => {
      if(exam.makeUpExam.location != null){
        announcement = true;
      }
      makeUp.push({
        code: exam.code,
        name: exam.name,
        date: convertToShortDate(exam.makeUpExam.date),
        class: exam.makeUpExam.location,
        start: exam.makeUpExam.startTime,
        finish: exam.makeUpExam.endTime,
        observer: exam.makeUpExam.observer,
      });
    });
    if(announcement){
      setAnnouncement(announcement);
    }
    setMakeUpExam(makeUp);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!isAnnouncement) {
    return <h2>Bütünleme Sınavları Döneminde Bulunmamaktayız.</h2>
  } else {
    return (
      <div style={{ width: "100%", height: "80%" }}>
        <h2 style={{ marginTop: "30px", marginBottom: "30px" }}>
          Bütünleme Sınav Takvimi
        </h2>
        <div
          className="ag-theme-balham"
          style={{
            width: "95%",
            height: "100%",
          }}
        >
          <AgGridReact columnDefs={columns} rowData={makeUpExam} />
        </div>
      </div>
    );
  }
};

export default MakeUpsPage;
