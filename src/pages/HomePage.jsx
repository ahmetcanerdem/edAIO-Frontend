import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students"
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <>
    <div>
        <div>Home</div>
        {!!data && data.home.map((home) => { 
            const row = [];
    
        row.push(<li key={home}>
            <ul>
                <li>Gpa: {home.gpa.map((gpa)=>  {
                    const row2 = [];
                    row2.push(<li key={gpa}>
                        <ul>
                            <li>Year: {gpa.year}</li>
                            <li>Term: {gpa.term}</li>
                            <li>Value: {gpa.value}</li>
                        </ul>
                    </li>);
                    return row2;
                    })}
                    </li>
                    <li>Incoming Courses: {home.incomingCourses.map((incomingCourses)=>  {
                    const row3 = [];
                    row3.push(<li key={incomingCourses}>
                        <ul>
                            <li>Date: {incomingCourses.date}</li>
                            <li>Short Code: {incomingCourses.shortCode}</li>
                            <li>Section: {incomingCourses.section}</li>
                            <li>Description: {incomingCourses.description}</li>
                            <li>Time: {incomingCourses.time}</li>
                        </ul>
                    </li>);
                    return row3;
                    })}
                    </li>
                    <li>Student Confirmed: {home.isStudentConfirmed}</li>
                    <li>Advisor Confirmed: {home.isAdvisorConfirmed}</li>
                    <li>Date: {home.date}</li>
                    <li>Role: {home.role}</li>
            </ul>
        </li>);
      return row;
    }
      )}
    </div>
    </>

  //   <header className="App-header">
  //     <div>
  //       {loginData ? (
  //         <>
  //         <div>
  //           <div>Home Page</div>
  //           {!!data && data.home.map((home) => { 

  //             const row = [];
    
  //             row.push(<li key={home}>
  //             <ul>
  //               <li>Gpa: {home.gpa.map((gpa) =>{
  //                 const row2 = [];
  //                 row2.push(<li key={gpa}>
  //                   <ul>
  //                     <li>Year: {gpa.year}</li>
  //                     <li>Term: {gpa.term}</li>
  //                     <li>Value: {gpa.value}</li>
  //                     </ul>)
  //               })}</li>
                  
  //          </div>

  //           <div className="logout-button">
  //             <button onClick={handleLogout}>Logout</button>
  //           </div>
  //         </>
  //       ) : (
  //         <LoginPage setLoginData={setLoginData} loginData={loginData} />
  //       )}
        
  //     </div>
  //   </header>
  );
};

export default HomePage;
