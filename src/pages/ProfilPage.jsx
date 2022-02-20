import React from "react";

function ProfilPage() {
  const studentInfor = {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;
