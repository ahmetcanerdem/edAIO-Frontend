import axios from "axios";
import React, { useEffect, useState } from "react";
const Derslerim = () => {
  const [dersler, derslerimiAyarla] = React.useState();
  const [ekranaBasilacakDers, ekranaBasilacakDersiAyarla] = useState(null);
  const [dersiGoster, dersiGostermeAyariniDegistir] = useState(false);
  const [reload, setReload] = useState(1);
  let mevcutDonemDersleri = [];
  let dersButonlari = [];
  const [butonDersler, butonDerslerEklensin]=useState([]);
  useEffect(async () => {
    let dersleriGetir = await axios.get(
      "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/termInfo/courses"
    );
    if (!!dersleriGetir.data) {
      derslerimiAyarla(dersleriGetir.data);
    } else {
      console.log(dersleriGetir.error);
    }
  }, []);

  useEffect(() => {
    dersleriKaydet();
  }, [dersler]);

  const dersleriKaydet = () => {
    dersler?.lesson?.forEach((ders) => {
      mevcutDonemDersleri.push({
        dersinIsmi: ders.name,
        dersSubesi: ders.sectionId,
        dersiAlanOgrencilerinOrtalamasi: ders.avgGpa,
        kredi: ders.credit,
        oncekiDonemBilgileri: ders.gpaPercOnPrevTerm,
        dersSaatleri: ders.lessonHours,
        dersiVerenHoca: ders.prof,
        dersAdiKisa: ders.shortCode,
        dersiAlanOgrenciSayisi: ders.studentNo,
      });
    });
    ekranaBasilacakButonlar();
  };

  const ekranaBasilacakButonlar = () => {
      let ind = 0;
      for (let ders of mevcutDonemDersleri) {
        const button_i_lesson = <div key= {ders.dersAdiKisa} >
            <button onClick={(e) => SecilenDersEkrani(e.target.innerText)}>
                {ders.dersAdiKisa}
            </button>
            <h3>{ders.dersinIsmi}</h3>
        </div>;
        ind = ind + 1;
        dersButonlari.push(button_i_lesson);
        if(ind == mevcutDonemDersleri.length)
            butonDerslerEklensin(dersButonlari);
      }
      setReload(prevState => prevState+1);
  };

  function SecilenDersEkrani(text) {
    mevcutDonemDersleri?.forEach((derslerinHepsindenBiri) => {
      if (derslerinHepsindenBiri.dersAdiKisa == text) {
        ekranaBasilacakDersiAyarla(derslerinHepsindenBiri);
        dersiGostermeAyariniDegistir(true);
      }
    });
  }

  const EkranaBas = () => {
    return !!ekranaBasilacakDers ? (
      <div>
        <div>
          <div>{ekranaBasilacakDers.dersAdiKisa}</div>
          <div>{ekranaBasilacakDers.dersinIsmi}</div>
        </div>
        <div>
          <div>{ekranaBasilacakDers.dersSubesi}.</div>
          <div>Şube</div>
        </div>
        <div>
          <div>Kredi</div>
          <div>{ekranaBasilacakDers.kredi}</div>
        </div>
        <div>
          <h3>Ders Öğretim Üyesi Bilgileri</h3>
          <div>{ekranaBasilacakDers.dersiVerenHoca.title}.</div>
          <div>{ekranaBasilacakDers.dersiVerenHoca.mail}</div>
        </div>
        <div>
          <h3>Öğrenci Sayısı</h3>
          <div>{ekranaBasilacakDers.dersiAlanOgrenciSayisi}</div>
        </div>
        <div>
          <h3>Dersi Alan Öğrencilerin GNO Ortalaması</h3>
          <div>{ekranaBasilacakDers.dersiAlanOgrencilerinOrtalamasi}</div>
        </div>
      </div>
    ) : null;
  };

  return (
    reload && (
      <>
        <h1>Derslerim:</h1>
        {butonDersler.length > 0 ? 
            (<div> {butonDersler} </div>)  : 
            null}
        {dersiGoster && !!ekranaBasilacakDers ? EkranaBas() : null}
      </>
    )
  );
};

export default Derslerim;
