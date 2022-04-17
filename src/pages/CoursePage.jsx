import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavDropdown, Nav } from "react-bootstrap";

const CoursePage = () => {
    const userInfo = JSON.parse(localStorage.getItem("loginData"));
    const studentId = userInfo.studentID;
    const [courses, setCourses] = React.useState();
    const [buttons, setButtons] = React.useState();
    const [selectCourseInformation,setSelectCourseInformation] = React.useState();

    useEffect(async ()=> {
        let getTermCourses = await axios.get(
            "http://localhost:5000/student/getTermCourses/id=" + studentId
          );
          if (!!getTermCourses.data) {
            setCourses(getTermCourses.data);
          } else {
            console.log(getTermCourses.error);
          }
    })

    useEffect(() => {
        const shownButtons = [];
        courses?.courses?.forEach((course) => {
          shownButtons.push(
            <NavDropdown.Item
              className="button button-1"
              onClick={() => {
                handleSelectCourse(course.courseInfo.course);
              }}
            >
              {course.code}
            </NavDropdown.Item>
          );
        });
        setButtons(shownButtons);
      }, [courses]);

    const handleSelectCourse = async (id) => {
        let getCourseInfo = await axios.get(
            "http://localhost:5000/course/id=" + id
        );
        if (!!getCourseInfo.data)   
            setSelectCourseInformation(getCourseInfo.data);
        else console.log(getCourseInfo.error);
    };

    return(
        <>
        {buttons}
        </>
    );
    
}

export default CoursePage;