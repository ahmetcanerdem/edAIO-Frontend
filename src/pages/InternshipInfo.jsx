import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";



const InternshipInfo = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:1337/internships"
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
        <h1>Ortak Eğitim Bilgilerim</h1>
        {!!data && data.internships.map((internship) => {
          const row = [];
          row.push(<li key={internship}>
            <ul>
              <li>Type: {internship.type}</li>
              <li>Year: {internship.year}</li>
              <li>Term: {internship.term}</li>
              <li>Company Name: {internship.companyName}</li>
              <li>Start Date: {internship.startDate}</li>
              <li>End Date: {internship.endDate}</li>
              <li>Grade: {internship.grade}</li>
            </ul>
          </li>);
          return row;
        }
        )}
      </div>
    </>
  );
};

export default InternshipInfo;
