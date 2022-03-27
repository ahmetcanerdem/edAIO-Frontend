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

  const [data, setData] = useState(null);
  useEffect( () => {
    axios
      .get(
        "http://localhost:1337/finals"
      )
      .then((response) => {
        setData(response.data);
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

else if(data === null)
{ 
  return <div>henuz final donemi degil</div>;
}

else{
  return (

    <>
    <h2 style={{ marginTop: "30px", marginBottom: "30px" }}>
        Dönem Sonu Sınav Takvimi
      </h2>
      <div className="ag-theme-balham"
        style={{
          width: "95%",
          height: 200
        }}>
        <AgGridReact
          columnDefs={columns}
          rowData={data}
        />
      </div>
    </>
  );
}
};

export default MakeUpsPage;
