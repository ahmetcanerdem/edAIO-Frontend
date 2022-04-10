import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import columns from "../helpers/table";
import convertToShortDate from "../helpers/functions";

const MidtermsPage = () => {
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
  const [midtermExam, setMidtermExam] = useState(null);
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
    const midterm = [];
    let announcement = false;
    data?.midterm.forEach((exam) => {
      if(exam.midterm.location != null){
        announcement = true;
      }
      midterm.push({
        code: exam.code,
        name: exam.name,
        date: convertToShortDate(exam.midterm.date),
        class: exam.midterm.location,
        start: exam.midterm.startTime,
        finish: exam.midterm.endTime,
        observer: exam.midterm.observer,
      });
    });
    if(announcement){
      setAnnouncement(announcement);
    }
    setMidtermExam(midterm);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!isAnnouncement) {
    return <h2>Vize döneminde bulunmamaktayız.</h2>
  } else {
    return (
      <div style={{ width: "100%", height: "80%" }}>
        <h2 style={{ marginTop: "30px", marginBottom: "30px" }}>
          Ara Sınav Takvimi
        </h2>
        <div
          className="ag-theme-balham"
          style={{
            width: "95%",
            height: "100%",
          }}
        >
          <AgGridReact columnDefs={columns} rowData={midtermExam} />
        </div>
      </div>
    );
  }
};

export default MidtermsPage;
