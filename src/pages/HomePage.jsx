import axios from "axios";
import React, { useEffect, useState } from "react";
const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:1337/home")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* <div>
        <h1>Ana Sayfa</h1>
        {!!data &&
          data.home.map((home) => {
            const row = [];

            row.push(
              <li key={home}>
                <ul>
                  <li>
                    Gpa:{" "}
                    {home.gpa.map((gpa) => {
                      const row2 = [];
                      row2.push(
                        <li key={gpa}>
                          <ul>
                            <li>Year: {gpa.year}</li>
                            <li>Term: {gpa.term}</li>
                            <li>Value: {gpa.value}</li>
                          </ul>
                        </li>
                      );
                      return row2;
                    })}
                  </li>
                  <li>
                    Incoming Courses:{" "}
                    {home.incomingCourses.map((incomingCourses) => {
                      const row3 = [];
                      row3.push(
                        <li key={incomingCourses}>
                          <ul>
                            <li>Date: {incomingCourses.date}</li>
                            <li>Short Code: {incomingCourses.shortCode}</li>
                            <li>Section: {incomingCourses.section}</li>
                            <li>Description: {incomingCourses.description}</li>
                            <li>Time: {incomingCourses.time}</li>
                          </ul>
                        </li>
                      );
                      return row3;
                    })}
                  </li>
                  <li>Student Confirmed: {home.isStudentConfirmed}</li>
                  <li>Advisor Confirmed: {home.isAdvisorConfirmed}</li>
                  <li>Date: {home.date}</li>
                  <li>Role: {home.role}</li>
                </ul>
              </li>
            );
            return row;
          })}
      </div> */}
    </>
  );
};

export default HomePage;
