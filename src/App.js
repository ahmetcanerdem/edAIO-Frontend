import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navigation from "./components/Navigation";
import LectureSchedule from "./pages/LectureSchedule";
import CoursePage from "./pages/CoursePage";
import DonemSonuSinavi from "./pages/DonemSonuSinavi";
import IkinciYabanciDilBilgileri from "./pages/IkinciYabanciDilBilgileri";
import AddressPage from "./pages/AddressPage";
import MidtermsPage from "./pages/MidtermsPage";
import MakeUpsPage from "./pages/MakeUpsPage";
import BlogPage from "./pages/BlogPage";
import GirisCikisSayfasi from "./pages/GirisCikisSayfasi";
import AdminPage from "./pages/AdminPage";
import EditStudent from "./pages/EditStudent";
import { Appointment, PaymentInfo, InternshipInfo, Grades } from "./pages";
import CreateUser from "./pages/CreateUser";
import AddStudent from "./pages/AddStudent";
import AddLecturer from "./pages/AddLecturer";
import AddPersonnel from "./pages/AddPersonnel";
import CourseSelection from "./pages/CourseSelection";
import CourseConfirmation from "./pages/CourseConfirmation";
import SigningUp from "./pages/SigningUp";
import CourseApproval from "./pages/CourseApproval";

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const [userData, setUserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  );

  return (
    <Router>
      <div className="application-etuao">
        <Navigation />
        <div></div>
        {!!loginData ? (
          <>
            {loginData.isRegistered ? (
              <div className="application-menu-container">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route
                    path="/otherpages/appointment"
                    element={<Appointment />}
                  />
                  <Route path="/profile/payment" element={<PaymentInfo />} />
                  <Route
                    path="/profile/internships"
                    element={<InternshipInfo />}
                  />
                  <Route path="/profile/grades" element={<Grades />} />
                  <Route path="/profile/addresses" element={<AddressPage />} />
                  <Route path="/exams/midterms" element={<MidtermsPage />} />
                  <Route path="/otherpages/blog" element={<BlogPage />} />
                  <Route path="/profile/info" element={<ProfilePage />} />
                  <Route path="/exams/makeups" element={<MakeUpsPage />} />
                  <Route
                    path="/semester/curriculum"
                    element={<LectureSchedule />}
                  />
                  <Route path="/semester/courses" element={<CoursePage />} />
                  <Route path="/exams/finals" element={<DonemSonuSinavi />} />
                  <Route
                    path="/profile/sfl"
                    element={<IkinciYabanciDilBilgileri />}
                  />
                  <Route path="/login" element={<GirisCikisSayfasi />} />

                  {!!userData && userData.isLecturer && (
                    <Route
                      path="/courseApproval"
                      element={<CourseApproval />}
                    />
                  )}

                  {!!userData && userData.isPersonnel && (
                    <>
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="/editStudent" element={<EditStudent />} />
                      <Route path="/createUser" element={<CreateUser />} />
                      <Route path="/addStudent" element={<AddStudent />} />
                      <Route path="/addLecturer" element={<AddLecturer />} />
                      <Route path="/addPersonnel" element={<AddPersonnel />} />
                    </>
                  )}
                  <Route
                    path="/courseSelection"
                    element={<CourseSelection />}
                  />
                  <Route
                    path="/courseConfirmation"
                    element={<CourseConfirmation />}
                  />
                </Routes>
              </div>
            ) : (
              <div>
                <Routes>
                  <Route path="/*" element={<SigningUp />} />
                </Routes>
              </div>
            )}
          </>
        ) : (
          <div>
            <Routes>
              <Route path="/*" element={<GirisCikisSayfasi />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
