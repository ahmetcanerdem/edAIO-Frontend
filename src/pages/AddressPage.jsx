import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/AddressPage.css";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'



const AddressPage = () => {

  const [isAddrLoading, setAddrLoading] = useState(true);

  const [isInfoLoading, setInfoLoading] = useState(true);

  const [addrColumns] = useState(
    [
      { headerName: "Adres Turu", field: "type" },
      { headerName: "Adres", field: "addr" },
      { headerName: "Sehir", field: "city" },
      { headerName: "Ilce", field: "dist" },
      { headerName: "Posta kodu", field: "code" }
    ]
  );
  const [addrRows, setAddrRows] = useState();


  const [contColumns] = useState(
    [
      { headerName: "Iletisim Turu", field: "type" },
      { headerName: "Iletisim Bilgisi", field: "value" }
    ]
  );
  const [contRows, setContRows] = useState();

  const [info, setInfo] = useState(null);


  let studentNumber = 121101016;

  useEffect(() => {
    axios
      .get(
        "http://localhost:1337/addresses"
      )
      .then((response) => {
        setAddrRows(response.data.addresses);
        setContRows(response.data.contacts);
        setAddrLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []
  );


  useEffect(() => {
    axios
      .get(
        "http://localhost:1337/info"
      )
      .then((response) => {
        setInfo(response.data);
        setInfoLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []
  );

  const gridOptions = {
    defaultColDef: {
      resizable: true,
    },
    columnDefs: addrColumns,
    rowData: null,
    onColumnResized: (params) => {
      console.log(params);
    },
  };

  function autoSizeAll() {
    const allColumnIds = [];
    gridOptions.columnApi.getAllColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });

    gridOptions.columnApi.autoSizeColumns(allColumnIds);
  }

  if (isAddrLoading) {
    return <div>Loading...</div>;
  }
  else if (isInfoLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div className="role row">Role: {info.role}</div>
      <div className="row">
        <div className="row" ><label style={{textAlign: 'right'}}>Bugun {new Date().getDate() + "/" + (new Date().getMonth() + 1)}</label></div>
        <div className='col-md-1' />
        <div className="col-md-3">
          <div className='row'>
            <div className='col-md-4'>
              <img className="pic" src={JSON.parse(localStorage.getItem("loginData")).picture}></img>
            </div>
            <div className='col-md-8'>
              <div>{JSON.parse(localStorage.getItem("loginData")).name}</div>
              <div>{info.department}</div>
            </div>
          </div>
          <div>{info.no}</div>
          <div>{JSON.parse(localStorage.getItem("loginData")).email}</div>
          <div>{info.advisor}</div>
          <div>{info.advisorMail}</div>
        </div>
        <div className="col-md-8">
          <h4 className="head">Adres Bilgilerim</h4>
          <div className="ag-theme-balham"
            style={{
              width: 1010,
              height: 200
            }}>
            <AgGridReact
              columnDefs={addrColumns}
              rowData={addrRows}
            />
          </div>

          <h4 className="head">İletişim Bilgilerim</h4>
          <div className="ag-theme-balham"
            style={{
              width: 600,
              height: 200
            }}>
            <AgGridReact
              columnDefs={contColumns}
              rowData={contRows}
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default AddressPage;
