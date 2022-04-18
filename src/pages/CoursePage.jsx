import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Nav, Row, Col } from "react-bootstrap";
import "../styles/Buttons.css";

const CoursePage = () => {
  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const studentId = userInfo.studentID;
  const [courses, setCourses] = React.useState();
  const [buttons, setButtons] = React.useState();
  const [selectCourseInformation, setSelectCourseInformation] =
    React.useState();
  const [isShown, setShown] = React.useState();
  const [reload, setReload] = React.useState(1);
  const [isAddedCourseTime, setAddedCourseTime] = React.useState(true);
  const [data, setData] = React.useState();
  const [isLectureSet, setLectureSet] = React.useState(false);

  const [courseShown, setCourseShown] = React.useState({
    courseId: null,
    courseCode: null,
    courseName: null,
    credit: null,
    department: null,
    lessonHours: null,
    studentList: null,
    lessonInstructor: null,
    courseAssignment: null,
    numberStudents: null,
    averageGrade: null,
    mail: null,
    title: null,
  });

  useEffect(async () => {
    let getTermCourses = await axios.get(
      "http://localhost:5000/student/getTermCourses/id=" + studentId
    );
    if (!!getTermCourses.data) {
      setCourses(getTermCourses.data);
    } else {
      console.log(getTermCourses.error);
    }
  }, []);

  useEffect(() => {
    const shownButtons = [];
    courses?.courses?.forEach((course) => {
      // console.log(course);
      shownButtons.push(
        <div>
          <button onClick={() => handleSelectCourse(course.courseInfo.course)}>
            {course.code}
          </button>
          <h3>{course.name}</h3>
        </div>
      );
    });
    setButtons(shownButtons);
  }, [courses]);

  const handleSelectCourse = async (id) => {
    setCourseShown({
      courseId: null,
      courseCode: null,
      courseName: null,
      credit: null,
      department: null,
      lessonHours: null,
      studentList: null,
      lessonInstructor: null,
      courseAssignment: null,
      numberStudents: null,
      averageGrade: null,
      mail: null,
      title: null,
    });

    let getCourseInfo = await axios.get(
      "http://localhost:5000/course/id=" + id
    );
    if (!!getCourseInfo.data) {
      setCourseShown({
        ...courseShown,
        courseId: getCourseInfo.data.course._id,
        courseCode: getCourseInfo.data.course.code,
        courseName: getCourseInfo.data.course.name,
        credit: getCourseInfo.data.course.credit,
        department: getCourseInfo.data.course.department,
        lessonHours: getCourseInfo.data.course.schedule,
        studentList: getCourseInfo.data.course.students,
        lessonInstructor: getCourseInfo.data.course.lecturer,
        courseAssignment: getCourseInfo.data.course.assignments,
      });
      setSelectCourseInformation(getCourseInfo.data.course);
    } else console.log(getCourseInfo.error);
  };

  useEffect(async () => {
    // console.log(selectCourseInformation);
    if (!!selectCourseInformation) {
      await axios
        .get(
          "http://localhost:5000/course/getCourseInfo/id=" +
            selectCourseInformation._id
        )
        .then(async (findLecturer) => {
          setCourseShown({
            ...courseShown,
            numberStudents: findLecturer.data.students,
            averageGrade: findLecturer.data.avgGpa,
          });
          setLectureSet(true);
        });
    }
  }, [selectCourseInformation]);

  useEffect(async () => {
    // console.log(selectCourseInformation);
    if (isLectureSet)
      await axios
        .get(
          "http://localhost:5000/lecturer/id=" +
            selectCourseInformation.lecturer
        )
        .then((infoInstructor) => {
          setCourseShown({
            ...courseShown,
            mail: infoInstructor.data.lecturer.schoolMail,
            title: infoInstructor.data.lecturer.title,
          });
        });
  }, [isLectureSet]);

  useEffect(async () => {
    if (
      (!!courseShown.numberStudents || !!courseShown.averageGrade) &&
      (!!courseShown.mail || !!courseShown.title)
    ) {
      setData({
        courseId: null,
        courseCode: null,
        courseName: null,
        credit: null,
        department: null,
        lessonHours: null,
        studentList: null,
        lessonInstructor: null,
        courseAssignment: null,
        numberStudents: null,
        averageGrade: null,
        mail: null,
        title: null,
      });
      setData(courseShown);
      setShown(true);
      setReload((prevState) => prevState + 1);
    }
  }, [courseShown]);

  const initLesson = () => {
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
    courseShown.lessonHours?.forEach((lessonHour) => {
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

  const LessonPrograms = () => {
    const scheduleLesson = [
      { headerName: "Saatler", field: "hours" },
      { headerName: "Pazartesi", field: "pazartesi" },
      { headerName: "Salı", field: "salı" },
      { headerName: "Çarşamba", field: "çarşamba" },
      { headerName: "Perşembe", field: "perşembe" },
      { headerName: "Cuma", field: "cuma" },
      { headerName: "Cumartesi", field: "cumartesi" },
    ];

    const programData = initLesson();

    courseShown.lessonHours?.forEach((lessonHour) => {
      switch (lessonHour.day) {
        case 1:
          programData.push({
            hours: lessonHour.time,
            pazartesi: data.courseName,
          });
          break;
        case 2:
          programData.push({
            hours: lessonHour.time,
            salı: data.courseName,
          });
          break;
        case 3:
          programData.push({
            hours: lessonHour.time,
            çarşamba: data.courseName,
          });
          break;
        case 4:
          programData.push({
            hours: lessonHour.time,
            perşembe: data.courseName,
          });
          break;
        case 5:
          programData.push({
            hours: lessonHour.time,
            cuma: data.courseName,
          });
          break;
        case 6:
          programData.push({
            hours: lessonHour.time,
            cumartesi: data.courseName,
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

  const EkranaBas = () => {
    return (
      <div style={{ maxHeight: "40rem", overflow: "auto" }}>
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "red" }}>Ders Bilgileri</h3>
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
                {data.courseCode}
              </div>
              <div>{data.courseName}</div>
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
                {data.credit}
              </div>
              <div>Kredi</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "red" }}>Ders Öğretim Üyesi Bilgileri</h3>
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
                {data.title}
              </div>
              <div
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {data.mail}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "red" }}>Dersi Alan Öğrenciler Hakkında</h3>
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
                {data.numberStudents}
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
                {data.averageGrade}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "red" }}>Ders Programı</h3>
          <LessonPrograms />
        </div>
      </div>
    );
  };

  return (
    <>
      <h1>Derslerim:</h1>
      <div>
        <Row>
          {isAddedCourseTime && (
            <Col>
              <Nav.Link className="button button-4" href="/courseSelection">
                <h3
                  style={{
                    padding: "10px",
                  }}
                >
                  {" "}
                  Ders Secimi{" "}
                </h3>{" "}
              </Nav.Link>
            </Col>
          )}
          <Col>
            {buttons?.length > 0 ? (
              <div style={{ textAlign: "center" }}> {buttons} </div>
            ) : null}
            {isShown ? EkranaBas() : null}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CoursePage;
