import axios from "axios";
import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const MakeUpsPage = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "http://localhost:1337/makeups"
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
        <h1>Bütünleme Sınavları</h1>
        
        {!!data && data.makeups.map((makeup) => { 
          const row = [];
          row.push(<li key={makeup}>
            <ul>
              <li>{makeup.code}</li>
              <li>{makeup.location}</li>
              <li>{makeup.zoomId}</li>
              <li>{makeup.day}</li>
              <li>{makeup.hours}</li>
            </ul>
          </li>);
          return row;
          }
        )}
      </div>
      
    </>
  );
};

export default MakeUpsPage;
