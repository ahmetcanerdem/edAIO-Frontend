import axios from "axios";
import React, { useEffect, useState } from "react";

const Grades = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/grades"
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []
  );



  return (
    <>
    <div>
        <h1>Not Bilgilerim</h1>
        {!!data && data.gradesList.map((grades) => { 
          const row = [];
          row.push(<li key={grades}>
            <ul>
                <li>Terms: {grades.terms.map((term)=>  {
                    const row2 = [];
                    row2.push(<li key={term}>
                        <ul>
                            <li>Name: {term.name}</li>
                            <li>Courses: {term.courses.map((course)=> {
                                const row3 = [];
                                row3.push(<li key= {course}>
                                    <ul>
                                        <li>Short Code: {course.code}</li>
                                        <li>Name: {course.name}</li>
                                        <li>Type: {course.type}</li>
                                        <li>Degree Type: {course.degreeType}</li>
                                        <li>Repeat: {course.repeat}</li>
                                        <li>Last Term: {course.lastTerm}</li>
                                        <li>Substituted Course: {course.substitutedCourse}</li>
                                        <li>Grade: {course.grade}</li>
                                    </ul>
                                </li>);
                            return row3;
                            })}</li>
                        </ul>
                    </li>);
                return row2;
                })}
              </li>
            </ul>
        </li>);
      return row;
    }
      )}
    </div>
    </>
  );
};

export default Grades;
