import axios from "axios";
import React, { useEffect, useState } from "react";

const DonemSonuSinavi = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:1337/finals")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <>

      <div>
        <h1>Donem sonu Sınavlar</h1>
        {!!data && data.finals.map((final) => {
          const row = [];

          row.push(<li key={final}>
            <ul>
              <li>{final.code}</li>
              <li>{final.location}</li>
              <li>{final.zoomId}</li>
              <li>{final.day}</li>
              <li>{final.hours}</li>
            </ul>
          </li>);
          return row;
        }

        )}
      </div>
    </>
  );
}

export default DonemSonuSinavi;