import axios from "axios";
import React, { useEffect,useState } from "react";

const LectureSchedule = () => {
    const [program, setProgram] = useState(null);

    // const columns = [
    //   {
    //     Header: 'Pazartesi',
    //     accessor: 'Pazartesi'
    //   },
    //   {
    //     Header: 'Salı',
    //     accessor: 'Salı'
    //   },
    //   {
    //     title: 'Çarşamba',
    //     accessor: 'Çarşamba'
    //   },
    //   {
    //     Header: 'Perşembe',
    //     accessor: 'Perşembe'
    //   },
    //   {
    //     Header: 'Cuma',
    //     accessor: 'Cuma'
    //   },
    //   {
    //     Header: 'Cumartesi',
    //     accessor: 'Cumartesi'
    //   },
    //   {
    //     Header: 'Pazar',
    //     accessor: 'Pazar'
    //   }
    // ];
    // const rows = [
    //   {
    //     title: '08:30 - 09:20'
    //   },
    //   {
    //     title: '09:30 - 10:20'
    //   },
    //   {
    //     title: '10:30 - 11:20'
    //   },
    //   {
    //     title: '11:30 - 12:20'
    //   },
    //   {
    //     title: '12:30 - 13:20'
    //   },
    //   {
    //     title: '13:30 - 14:20'
    //   },
    //   {
    //     title: '14:30 - 15:20'
    //   },
    //   {
    //     title: '15:30 - 16:20'
    //   },
    //   {
    //     title: '16:30 - 17:20'
    //   },
    //   {
    //     title: '17:30 - 18:20'
    //   },
    //   {
    //     title: '18:30 - 19:20'
    //   },
    //   {
    //     title: '19:30 - 20:20'
    //   },
    //   {
    //     title: '20:30 - 21:20'
    //   }
    // ];

    // const schedulerAvailabilities = (programs) =>{
    //   programs.day.forEach((eachDayProgram) =>{
    //     eachDayProgram.forEach(day => {
    //       customSchedule.push(
    //         {
    //           day: eachDayProgram
    //         }
    //       )
    //     });
    //   })
    // }

    useEffect(() => {
      axios.get("https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/termInfo/program")
      .then(response => {
        setProgram(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    },[]);

    return(
        <>
          <h1>Program Sayfasi Güncelleniyor...</h1>
        </>
    );
}

export default LectureSchedule;