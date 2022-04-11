import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";


const InfoPage = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/student"
      )
      .then((response) => {
        setData(response.data.student[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []
  );


  return (
    <>
      <div>
        <h1>Bilgilerim</h1>
        {!!data ? (
          <div>
            <li>GPA: {data.gpa}</li>
            <li>Completed Credits: {data.creditsCompleted}</li>
            <li>Overall Credits: {data.creditsTaken}</li>
            <li>Faculty: {data.faculty}</li>
            <li>Department: {data.department}</li>
            <li>Enrolled in: {data.enrollmentDate}</li>
            <li>Scholarship: {data.scholarship}</li>
            <li>School Year: {data.schoolYear}</li>
            <li>Advisor: {data.advisor}</li>
            <li>Status: {data.status}</li>
          </div>
        ):(
          <div>
            Could not load data
          </div>
        )}
      </div>
    </>
  );
};

export default InfoPage;
