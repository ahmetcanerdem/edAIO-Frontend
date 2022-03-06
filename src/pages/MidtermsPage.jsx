import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";



const MidtermsPage = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/midterms"
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
        <h1>Sınavlar</h1>
        {!!data && data.midterms.map((midterm) => { 
            const row = [];
    
        row.push(<li key={midterm}>
            <ul>
                <li>{midterm.shortCode}</li>
                <li>{midterm.location}</li>
                <li>{midterm.zoomId}</li>
                <li>{midterm.day}</li>
                <li>{midterm.hours}</li>
            </ul>
        </li>);
      return row;
    }
      
      )}
    </div>
    </>
  );
};

export default MidtermsPage;
