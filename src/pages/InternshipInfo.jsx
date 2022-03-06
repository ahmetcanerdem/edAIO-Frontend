import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";



const InternshipInfo = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/internships"
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
        <div>Internships</div>
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
