import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import convertToShortDate from "../helpers/functions";
import columns from   "../helpers/table";

const DonemSonuSinavi = () => {

  const [isLoading, setLoading] = useState(true);
  const [isAnnouncement, setAnnouncement] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const studentId = userInfo.studentId;
  const [data, setData] = useState(null);
  const [finalExam, setFinalExam] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/student/getExamInfo/id=" + studentId)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // localStorage.removeItem("loginData");
      });
  }, []);

  useEffect(() => {
    console.log(data);
    const finalExam = [];
    let announcement = false;
    data?.finalExam.forEach((exam) => {
      if(exam.finalExam.location != null){
        announcement = true;
      }
      finalExam.push({
        code: exam.code,
        name: exam.name,
        date: convertToShortDate(exam.finalExam.date),
        class: exam.finalExam.location,
        start: exam.finalExam.startTime,
        finish: exam.finalExam.endTime,
        observer: exam.finalExam.observer,
      });
    });
    if(announcement){
      setAnnouncement(announcement);
    }
    setFinalExam(finalExam);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!isAnnouncement) {
    return <h2>Final Döneminde Bulunmamaktayız.</h2>
  } else {
    return (
      <div style={{ width: "100%", height: "80%" }}>
        <h2 style={{ marginTop: "30px", marginBottom: "30px" }}>
          Dönem Sonu Sınav Takvimi
        </h2>
        <div
          className="ag-theme-balham"
          style={{
            width: "95%",
            height: "100%",
          }}
        >
          <AgGridReact columnDefs={columns} rowData={finalExam} />
        </div>
      </div>
    );
  }
};

export default DonemSonuSinavi;
