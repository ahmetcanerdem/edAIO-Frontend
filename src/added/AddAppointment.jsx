function AddAppointment() {
  const [hoursSelected, setHoursSelected] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [appoitmentWith, setAppoitmentWith] = useState();

  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const studentId = userInfo.studentID;

  let appointment = {
    date: "",
    hours: "",
  };

  useEffect(() => {
/*
1. Hocaların isimleri mi çıkmalı aldığın dersler mi çıkmalı
2. IT personellerin isimleri çekilmeli
*/

  }, []);

  const setAppointment = () => {
    appointment.date = hoursSelected;
    appointment.hours = dateSelected;
  };


  const postAppointmentToLecturer = () => {
    setAppointment();
    axios({
      method: "post",
      url: "http://localhost:5000/appointment/lecturer/id=" + studentId + "/cid=" + appoitmentWith,
      data: appointment,
    });
  }

  const postAppointmentToAdvisor = () => {
    setAppointment();
    axios({
      method: "post",
      url: "http://localhost:5000/appointment/advisor/id=" + studentId,
      data: appointment,
    });
  }

  const postAppointmentToIT = () => {
    setAppointment();
    axios({
      method: "post",
      url: "http://localhost:5000/appointment/it/id=" + studentId +"/wid="+ appoitmentWith,
      data: appointment,
    });
  }

  const postAppointmentToStudentAffair = () => {
    setAppointment();
    axios({
      method: "post",
      url: "http://localhost:5000/appointment/studentAffairs/id=" + studentId + "/wid=" + appoitmentWith,
      data: appointment,
    });
  }
}
