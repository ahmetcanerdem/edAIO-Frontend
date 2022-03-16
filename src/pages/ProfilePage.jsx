import axios from "axios";
import React, { useEffect,useState } from "react";

function ProfilPage() {
  const [profilBilgilerim, profilBilgilerimiAyarla] = useState(null);

  useEffect(() => {
    axios.get("https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/profile")
    .then(response => {
      profilBilgilerimiAyarla(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  },[]);

  return (<>
    <h1>Bilgilerim Sayfası Güncelleniyor...</h1>
    </>
  );
}

export default ProfilPage;
