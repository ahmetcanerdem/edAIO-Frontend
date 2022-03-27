import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


const MakeUpsPage = () => {
  const [isLoading, setLoading] = useState(true);

  const [columns] = useState(
    [
      { headerName: "Ders Kodu", field: "code" },
      { headerName: "Ders Adi", field: "name" },
      { headerName: "Sinav Tarihi", field: "date" },
      { headerName: "Derslik", field: "class" },
      { headerName: "Baslangic", field: "start" },
      { headerName: "Bitis", field: "finish" },
      { headerName: "Gozetmen", field: "observer" }
    ]
  );
  const [rows, setRows] = useState();

  let studentNumber = 121101016;

  const [data, setData] = useState(null);
  useEffect( () => {
    axios
      .get(
        "http://localhost:1337/makeups"
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
    <div className="row" ><label style={{textAlign: 'right'}}>Bugun {new Date().getDate() + "/" + (new Date().getMonth() + 1)}</label></div>
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

export default MakeUpsPage;
