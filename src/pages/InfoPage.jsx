import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";


const InfoPage = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/info"
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []
  );


  return (
    <>
    <div>
        <div>Info</div>
        
        {!!data && data.info.map((info) => { 
            const row = [];
    
        row.push(<li key={info}>
            <img src={JSON.parse(localStorage.getItem("loginData")).picture}></img>
            <ul>
                <li>{JSON.parse(localStorage.getItem("loginData")).name}</li>
                <li>{JSON.parse(localStorage.getItem("loginData")).email}</li>
                <li>GPA: {info.gpa}</li>
                <li>Completed Credits: {info.creditsCompleted}</li>
                <li>Overall Credits: {info.creditsTaken}</li>
                <li>Faculty: {info.faculty}</li>
                <li>Department: {info.department}</li>
                <li>Enrolled in: {info.enrollmentDate}</li>
                <li>Scholarship: {info.scholarship}</li>
                <li>School Year: {info.schoolYear}</li>
                <li>Advisor: {info.advisor}</li>
                <li>Status: {info.status}</li>
            </ul>
        </li>);

      return row;
    }
      
      )}
    </div>
    </>
  );
};

export default InfoPage;
