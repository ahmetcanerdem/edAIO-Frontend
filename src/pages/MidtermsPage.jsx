import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";



const MidtermsPage = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "http://localhost:1337/midterms"
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
        <h1>Ara Sınavlar</h1>
        {!!data && data.midterms.map((midterm) => { 
            const row = [];
    
        row.push(<li key={midterm}>
            <ul>
                <li>{midterm.code}</li>
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
