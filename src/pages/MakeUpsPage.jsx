import axios from "axios";
import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const MakeUpsPage = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/makeups"
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
       
  <Button variant="primary" lassName="btn-primary">Primary</Button>{' '}
  <Button variant="secondary">Secondary</Button>{' '}
  <Button variant="success">Success</Button>{' '}
  <Button variant="warning">Warning</Button>{' '}


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

export default MakeUpsPage;
