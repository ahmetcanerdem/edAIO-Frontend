import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

const Derslerim = () => {
  const [dersler, derslerimiAyarla] = React.useState();
  const [ekranaBasilacakDers, ekranaBasilacakDersiAyarla] = useState(null);
  const [dersiGoster, dersiGostermeAyariniDegistir] = useState(false);
  const [reload, setReload] = useState(1);
  let courseInformation = [];
  let buttons = [];
  const [butonDersler, butonDerslerEklensin] = useState([]);
  useEffect(async () => {
    let findAllLessons = await axios.get("http://localhost:5000/course");
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
    dersler?.course?.forEach((course) => {
      courseInformation.push({
        courseId: course._id,
        courseCode: course.code,
        courseName: course.name,
        credit: course.credit,
        department: course.department,
        lessonHours: course.schedule,
        studentList: course.students,
        lessonInstructor: course.lecturer,
        courseAssignment: course.assignments
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

  async function SecilenDersEkrani(text) {
    courseInformation?.forEach(async (oneOfTheCourse) => {
      if (oneOfTheCourse.courseCode == text) {
        
        let findLecturer = await axios.get( "http://localhost:5000/course/getCourseInfo/id=" + oneOfTheCourse.courseId);
        if (!!findLecturer.data) {
          const infoCourse = {
            numberStudents: findLecturer.data.students,
            averageGrade: findLecturer.data.avgGpa
          } ;
        
          let infoInstructor = await axios.get("http://localhost:5000/lecturer/id=" + oneOfTheCourse.lessonInstructor);
          if(!!infoInstructor.data){
            const infoLecture = {
              mail: infoInstructor.data.lecturer.schoolMail,
              title: infoInstructor.data.lecturer.title
            };
            const selectedCourse = {
              courseId: oneOfTheCourse.courseId,
              courseCode: oneOfTheCourse.courseCode,
              courseName: oneOfTheCourse.courseName,
              credit: oneOfTheCourse.credit,
              department: oneOfTheCourse.department,
              lessonHours: oneOfTheCourse.lessonHours,
              studentList: oneOfTheCourse.studentList,
              lessonInstructor: oneOfTheCourse.lessonInstructor,
              courseAssignment: oneOfTheCourse.courseAssignment,
              numberStudents: infoCourse.numberStudents,
              averageGrade: infoCourse.averageGrade,
              mail: infoLecture.mail,
              title: infoLecture.title
            }
  
            ekranaBasilacakDersiAyarla(selectedCourse);
            dersiGostermeAyariniDegistir(true);
          }
          else{
            console.log(infoInstructor.error);
          }
        } else {
          console.log(findLecturer.error);
        }        
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
                {ekranaBasilacakDers.title}
              </div>
              <div style={{
                color: "blue", 
                textDecoration: "underline" 
                }}>{ekranaBasilacakDers.mail}</div>
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
  props.ekranaBasilacakDers.lessonHours?.forEach((lessonHour) => {
    scheduleHours.push({ hours: lessonHour.time });
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

  props.ekranaBasilacakDers.lessonHours?.forEach((lessonHour) => {
    switch (lessonHour.day) {
      case 1:
        programData.push({
          hours: lessonHour.time,
          pazartesi: props.ekranaBasilacakDers.courseName,
        });
        break;
      case 2:
        programData.push({
          hours: lessonHour.time,
          salı: props.ekranaBasilacakDers.courseName,
        });
        break;
      case 3:
        programData.push({
          hours: lessonHour.time,
          çarşamba: props.ekranaBasilacakDers.courseName,
        });
        break;
      case 4:
        programData.push({
          hours: lessonHour.time,
          perşembe: props.ekranaBasilacakDers.courseName,
        });
        break;
      case 5:
        programData.push({
          hours: lessonHour.time,
          cuma: props.ekranaBasilacakDers.courseName,
        });
        break;
      case 6:
        programData.push({
          hours: lessonHour.time,
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
