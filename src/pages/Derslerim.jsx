import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
// import scheduleLesson from "../helpers/Schedule";

const Derslerim = () => {
  const [dersler, derslerimiAyarla] = React.useState();
  const [ekranaBasilacakDers, ekranaBasilacakDersiAyarla] = useState(null);
  const [dersiGoster, dersiGostermeAyariniDegistir] = useState(false);
  const [reload, setReload] = useState(1);
  let courseInformation = [];
  let buttons = [];
  const [butonDersler, butonDerslerEklensin] = useState([]);
  useEffect(async () => {
    let findAllLessons = await axios.get("http://localhost:1337/courses");
    if (!!findAllLessons.data) {
      derslerimiAyarla(findAllLessons.data);
    } else {
      console.log(findAllLessons.error);
    }
  }, []);

  useEffect(() => {
    dersleriKaydet();
  }, [dersler]);

  const dersleriKaydet = () => {
    dersler?.courses?.forEach((course) => {
      courseInformation.push({
        courseCode: course.code,
        courseName: course.name,
        sectionID: course.sectionId,
        credit: course.credit,
        lessonInstructor: course.instructor,
        numberStudents: course.numberOfStudents,
        averageGrade: course.averageGrage,
        gpaDistributionOnPreviousTerms: course.gpaDistributionOnPreviousTerms,
        lessonHours: course.lessonHours,
      });
    });
    ekranaBasilacakButonlar();
  };

  const ekranaBasilacakButonlar = () => {
    let ind = 0;
    for (let course of courseInformation) {
      const button_i_lesson = (
        <div key={course.courseCode}>
          <button onClick={(e) => SecilenDersEkrani(e.target.innerText)}>
            {course.courseCode}
          </button>
          <h3>{course.courseName}</h3>
        </div>
      );
      ind = ind + 1;
      buttons.push(button_i_lesson);
      if (ind == courseInformation.length) butonDerslerEklensin(buttons);
    }
    setReload((prevState) => prevState + 1);
  };

  function SecilenDersEkrani(text) {
    courseInformation?.forEach((oneOfTheCourse) => {
      if (oneOfTheCourse.courseCode == text) {
        ekranaBasilacakDersiAyarla(oneOfTheCourse);
        dersiGostermeAyariniDegistir(true);
      }
    });
  }

  const EkranaBas = () => {
    return !!ekranaBasilacakDers ? (
      <div style={{maxHeight:"40rem", overflow: "auto"}}>
        <div style={{marginTop: "20px"}}>
          <h3 style={{ color: "red"}}>Ders Bilgileri</h3>
          <div>
            <div
              className="lessonInfo"
              style={{
                justifyContent: "space-between",
                display: "inline-flex",
              }}
            >
              <div
                className="sub-header"
                style={{ fontWeight: "700", textDecoration: "underline" }}
              >
                Ders:
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {ekranaBasilacakDers.courseCode}
              </div>
              <div>{ekranaBasilacakDers.courseName}</div>
            </div>
          </div>
          <div>
            <div
              className="sectionInfo"
              style={{
                justifyContent: "space-between",
                display: "inline-flex",
              }}
            >
              <div
                className="sub-header"
                style={{ fontWeight: "700", textDecoration: "underline" }}
              >
                Şube:
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {ekranaBasilacakDers.sectionID}.
              </div>
              <div>Şube</div>
            </div>
          </div>
          <div>
            <div
              className="sectionInfo"
              style={{
                justifyContent: "space-between",
                display: "inline-flex",
              }}
            >
              <div
                className="sub-header"
                style={{ fontWeight: "700", textDecoration: "underline" }}
              >
                Kredi:
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {ekranaBasilacakDers.credit}
              </div>
              <div>Kredi</div>
            </div>
          </div>
        </div>
        <div style={{marginTop: "20px"}}>
          <h3 style={{ color: "red"}}>Ders Öğretim Üyesi Bilgileri</h3>
          <div>
            <div
              className="sectionInfo"
              style={{
                justifyContent: "space-between",
                display: "inline-flex",
              }}
            >
              <div
                className="sub-header"
                style={{ fontWeight: "700", textDecoration: "underline" }}
              >
                Öğretim Üyesi:
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {ekranaBasilacakDers.lessonInstructor.title}
              </div>
              <div style={{
                color: "blue", 
                textDecoration: "underline" 
                }}>{ekranaBasilacakDers.lessonInstructor.mail}</div>
            </div>
          </div>
        </div>

        <div style={{marginTop: "20px"}}>
          <h3 style={{ color: "red"}}>Dersi Alan Öğrenciler Hakkında</h3>
          <div>
            <div
              className="sectionInfo"
              style={{
                justifyContent: "space-between",
                display: "inline-flex",
              }}
            >
              <div
                className="sub-header"
                style={{ fontWeight: "700", textDecoration: "underline" }}
              >
                Öğrenci Sayısı:
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {ekranaBasilacakDers.numberStudents}
              </div>
            </div>
          </div>
          <div>
            <div
              className="sectionInfo"
              style={{
                justifyContent: "space-between",
                display: "inline-flex",
              }}
            >
              <div
                className="sub-header"
                style={{ fontWeight: "700", textDecoration: "underline" }}
              >
                Dersi Alan Öğrencilerin GNO Ortalaması:
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {ekranaBasilacakDers.averageGrade}
              </div>
            </div>
          </div>
        </div>
        
        <div style={{marginTop: "20px"}}>
          <h3 style={{ color: "red"}}>Ders Programı</h3>
          <LessonPrograms ekranaBasilacakDers={ekranaBasilacakDers} />
        </div>
      </div>
      
    ) : null;
  };

  return (
    reload && (
      <>
        <h1>Derslerim:</h1>
        {butonDersler.length > 0 ? <div style={{textAlign: "center"}}> {butonDersler} </div> : null}
        {dersiGoster && !!ekranaBasilacakDers ? EkranaBas() : null}
      </>
    )
  );
};

const initLesson = (props) => {
  const programData = [];
  programData.push(
    { hours: "08.30-09.20" },
    { hours: "09.30-10.20" },
    { hours: "10.30-11.20" },
    { hours: "11.30-12.20" },
    { hours: "12.30-13.20" },
    { hours: "13.30-14.20" },
    { hours: "14.30-15.20" },
    { hours: "15.30-16.20" },
    { hours: "16.30-17.20" },
    { hours: "17.30-18.20" },
    { hours: "18.30-19.20" },
    { hours: "19.30-20.20" },
    { hours: "20.30-21.20" }
  );
  const scheduleHours = [];
  props.ekranaBasilacakDers.lessonHours.forEach((lessonHour) => {
    scheduleHours.push({ hours: lessonHour.hours });
  });
  const uniqueScheduleHours = [];
  programData.forEach((hour) => {
    let notContains = true;
    for (let i = 0; i < scheduleHours.length; i++) {
      if (hour.hours === scheduleHours[i].hours) notContains = false;
    }
    if (notContains) uniqueScheduleHours.push(hour);
  });
  return uniqueScheduleHours;
};

const LessonPrograms = (props) => {
  const scheduleLesson = [
    { headerName: "Saatler", field: "hours" },
    { headerName: "Pazartesi", field: "pazartesi" },
    { headerName: "Salı", field: "salı" },
    { headerName: "Çarşamba", field: "çarşamba" },
    { headerName: "Perşembe", field: "perşembe" },
    { headerName: "Cuma", field: "cuma" },
    { headerName: "Cumartesi", field: "cumartesi" },
  ];

  const programData = initLesson(props);

  props.ekranaBasilacakDers.lessonHours.forEach((lessonHour) => {
    switch (lessonHour.day) {
      case "Pazartesi":
        programData.push({
          hours: lessonHour.hours,
          pazartesi: props.ekranaBasilacakDers.courseName,
        });
        break;
      case "Salı":
        programData.push({
          hours: lessonHour.hours,
          salı: props.ekranaBasilacakDers.courseName,
        });
        break;
      case "Çarşamba":
        programData.push({
          hours: lessonHour.hours,
          çarşamba: props.ekranaBasilacakDers.courseName,
        });
        break;
      case "Perşembe":
        programData.push({
          hours: lessonHour.hours,
          perşembe: props.ekranaBasilacakDers.courseName,
        });
        break;
      case "Cuma":
        programData.push({
          hours: lessonHour.hours,
          cuma: props.ekranaBasilacakDers.courseName,
        });
        break;
      case "Cumartesi":
        programData.push({
          hours: lessonHour.hours,
          cumartesi: props.ekranaBasilacakDers.courseName,
        });
        break;
    }
  });
  programData.sort((a, b) => a.hours.localeCompare(b.hours));

  return (
    <>
      <div
        className="ag-theme-balham"
        style={{
          width: "85%",
          height: 400,
        }}
      >
        <AgGridReact columnDefs={scheduleLesson} rowData={programData} />
      </div>
    </>
  );
};

export default Derslerim;
