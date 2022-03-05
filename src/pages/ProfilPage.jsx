import axios from "axios";
import React, { useEffect,useState } from "react";

function ProfilPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/grades")
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  },[]);
  
  const studentInfor = { //Example for write a page
    idNumber: "001",
    name: "Name 001",
    surname: "Surname 001",
  };

  return (
    <div className="profil-page">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">My Information</h1>
            <div>
              <span>Name:</span>
              <span>{studentInfor.name}</span>
            </div>
            <div>
              <span>Name:</span>
              <span>{studentInfor.surname}</span>
            </div>
            <div>
              <span>Data</span>
              {!!data && <div>{data.gradesList[0].terms[1].courses[0].grade}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;
