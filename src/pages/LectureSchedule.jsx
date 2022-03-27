import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import CustomTooltip from "../components/CustomTooltip";

const scheduleLesson = [
  { headerName: "Saatler", field: "hours" , filter: true},
  { headerName: "Pazartesi", field: "pazartesi" , filter: true, tooltipField: "pazartesi"},
  { headerName: "Salı", field: "salı" , filter: true, tooltipField: "salı"},
  { headerName: "Çarşamba", field: "çarşamba" , filter: true, tooltipField: "çarşamba"},
  { headerName: "Perşembe", field: "perşembe" , filter: true, tooltipField: "perşembe"},
  { headerName: "Cuma", field: "cuma" , filter: true, tooltipField: "cuma" },
  { headerName: "Cumartesi", field: "cumartesi" , filter: true, tooltipField: "cumartesi"},
];

const initLesson = (data) => {
  const programData = [];
  const scheduleHours = [];
  const uniqueScheduleHours = [];

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

  data?.forEach((lesson) => {
    scheduleHours.push({ hours: lesson.time }); // Current Lesson Program
  });

  programData?.forEach((hour) => {
    let notContains = true;
    // For not lesson hours display
    for (let i = 0; i < scheduleHours.length; i++) {
      if (hour.hours === scheduleHours[i].hours) notContains = false;
    }
    if (notContains) uniqueScheduleHours.push(hour);
  });

  return uniqueScheduleHours;
};

function program(data, setSchedulePlan) {
  const programData = initLesson(data);

  data?.forEach((lessonHour) => {
    let value =
      lessonHour.lectureName +
      " Derslik: " +
      lessonHour.location +
      (!!lessonHour.zoomId
        ? " Zoom Id: " + lessonHour.zoomId
        : " ID Bekleniyor");

    switch (lessonHour.day) {
      case "Pazartesi":
        programData.push({
          hours: lessonHour.time,
          pazartesi: value,
        });
        break;
      case "Salı":
        programData.push({
          hours: lessonHour.time,
          salı: value,
        });
        break;
      case "Çarşamba":
        programData.push({
          hours: lessonHour.time,
          çarşamba: value,
        });
        break;
      case "Perşembe":
        programData.push({
          hours: lessonHour.time,
          perşembe: value,
        });
        break;
      case "Cuma":
        programData.push({
          hours: lessonHour.time,
          cuma: value,
        });
        break;
      case "Cumartesi":
        programData.push({
          hours: lessonHour.time,
          cumartesi: value,
        });
        break;
    }
  });
  programData.sort((a, b) => a.hours.localeCompare(b.hours));

  const programArray = [];
  programData.forEach((data) => {
    let added = false;
    for (let i = 0; i < programArray.length; i++) {
      if (programArray[i].hours == data.hours) {
        //önceki saatlerden biri oldu!.
        if (!!data.pazartesi) {
          if (!!programArray[i].pazartesi) {
            programArray[i].pazartesi = [ programArray[i].pazartesi, data.pazartesi ];
            added = true;
          }
          else{
            programArray[i].pazartesi = data.pazartesi;
            added = true;
          }
        }
        if (!!data.salı) {
          if (!!programArray[i].salı) {
            programArray[i].salı = [ programArray[i].salı, data.salı ];
            added = true;
          }
          else{
            programArray[i].salı = data.salı;
            added = true;
          }
        }
        if (!!data.çarşamba) {
          if(!!programArray[i].çarşamba){
            programArray[i].çarşamba = [ programArray[i].çarşamba, data.çarşamba ];
            added = true;
          }
          else{
            programArray[i].çarşamba = data.çarşamba;
            added = true;
          }
        }
        if (!!data.perşembe) {
          if(!!programArray[i].perşembe){
            programArray[i].perşembe = [ programArray[i].perşembe, data.perşembe ];
            added = true;
          }
          else{
            programArray[i].perşembe = data.perşembe;
            added = true;
          }
        }
        if (!!data.cuma) {
          if(!!programArray[i].cuma){
            programArray[i].cuma = [ programArray[i].cuma, data.cuma ];
            added = true;
          }
          else{
            programArray[i].cuma = data.cuma;
            added = true;
          }
        }
        if (!!data.cumartesi) {
          if(!!programArray[i].cumartesi){
            programArray[i].cumartesi = [ programArray[i].cumartesi, data.cumartesi ];
            added = true;
          }
          else{
            programArray[i].cumartesi = data.cumartesi;
            added = true;
          }
        }
      }
    }
    if(!added){
      programArray.push(data);
    }
  });
  programArray.sort((a, b) => a.hours.localeCompare(b.hours));
  setSchedulePlan(programArray);
}

const LectureSchedule = () => {
  const [data, setData] = useState(null);
  const [schedulePlan, setSchedulePlan] = useState(null);

  const defaultSchedule = useMemo(()=>{
    return{
      tooltipComponent: CustomTooltip
    };
  },[]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/curriculum")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    !!data && program(data, setSchedulePlan);
  }, [data]);

  return (
    <>
      <h2 style={{ marginTop: "30px", marginBottom: "30px" }}>
        Haftalık Ders Programı
      </h2>

      <div
        className="ag-theme-balham"
        style={{
          width: "85%",
          height: 420
        }}
      >
        {scheduleLesson && (
          <AgGridReact 
          columnDefs={scheduleLesson} 
          rowData={schedulePlan} 
          defaultColDef={defaultSchedule}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
          />
        )}
      </div>
    </>
  );
};

export default LectureSchedule;
