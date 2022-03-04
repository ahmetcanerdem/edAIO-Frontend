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

  const studentInfor = {
    idNumber: "001",
    name: "Name 001",
    surname: "Surname 001",
  };

  return (
    <div className="profil-page">
      <div className="container">
        <div className="row align-items-center my-5">
          <div classNames="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">My Information</h1>
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
              !!data && <div>{data.gradesList[0].terms[1].courses[0].grade}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;
