import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const LectureSchedule = () => {
  const [isLoading, setLoading] = useState(true);

  const [columns] = useState(
    [
      { headerName: "Hour", field: "hour" },
      { headerName: "Monday", field: "mon" },
      { headerName: "Tuesday", field: "tue" },
      { headerName: "Wednesday", field: "wed" },
      { headerName: "Thursday", field: "thu" },
      { headerName: "Friday", field: "fri" },
      { headerName: "Saturday", field: "sat" }
    ]
  );
  const [rows, setRows] = useState();

  const [data, setData] = useState(null);
  useEffect( () => {
    axios
      .get(
        "http://localhost:1337/curriculum"
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setRows(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []
  );

 
  
  if (isLoading) {
    return <div>Loading...</div>;
  }


else{
  return (

    <>
      <div className="ag-theme-balham"
        style={{
          width: 1500,
          height: 600
        }}>
        <AgGridReact
          columnDefs={columns}
          rowData={rows}
        />
      </div>
    </>
  );
}
};


export default LectureSchedule;