import axios from "axios";
import React, { useEffect,useState } from "react";

const DonemSonuSinavi = () => {
    const [donemSonuSinavlari, donemSonuSinavlariniAyarla] = useState(null);

    useEffect(() => {
      axios.get("https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/midterms")
      .then(response => {
        donemSonuSinavlariniAyarla(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    },[]);

    return(
        <>
          <h1>Dönem Sonu Sınavları Sayfası Güncelleniyor...</h1>
        </>
    );
}

export default DonemSonuSinavi;