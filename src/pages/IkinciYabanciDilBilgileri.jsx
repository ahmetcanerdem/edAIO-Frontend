import axios from "axios";
import React, { useEffect,useState } from "react";

const IkinciYabanciDilBilgileri = () => {
    const [ikinciYabanciDilBilgileri, ikinciYabanciDilBilgileriniAyarla] = useState(null);

    useEffect(() => {
      axios.get("https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/sfl")
      .then(response => {
        ikinciYabanciDilBilgileriniAyarla(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    },[]);

    return(
        <>
          <h1>İkinci Yabanci Dil Bilgileri Sayfası Güncelleniyor...</h1>
        </>
    );
}

export default IkinciYabanciDilBilgileri;