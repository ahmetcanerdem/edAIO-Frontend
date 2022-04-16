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

  data?.schedule?.forEach((lesson) => {
    lesson?.schedule?.forEach((aHour) => {
      scheduleHours.push({hours: aHour.time}); // Current Lesson Program
    })
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
  
  data.schedule.forEach((lesson) => {
    lesson?.schedule.forEach((aLesson)=>{
      let value = 
        lesson.name +
        " Derslik: " +
        aLesson.location + 
        (!!aLesson.zoomId
          ? " Zoom Id: " + aLesson.zoomId
          : " ID Bekleniyor");

        switch(aLesson.day){
          case 1:
            programData.push({
              hours: aLesson.time,
              pazartesi: value,
            });
            break;
          case 2:
            programData.push({
              hours: aLesson.time,
              salı: value,
            });
            break;
          case 3:
            programData.push({
              hours: aLesson.time,
              çarşamba: value,
            });
            break;
          case 4:
            programData.push({
              hours: aLesson.time,
              perşembe: value,
            });
            break;
          case 5:
            programData.push({
              hours: aLesson.time,
              cuma: value,
            });
            break;
          case 6:
            programData.push({
              hours: aLesson.time,
              cumartesi: value,
            });
            break;
        }
    })
  });

  programData.sort((a, b) => a.hours.localeCompare(b.hours));

  const programArray = [];
  programData.forEach((data) => {
    let added = false;
    for (let i = 0; i < programArray.length; i++) {
      if (programArray[i].hours === data.hours) {
        //önceki saatlerden biri oldu!.
        if (!!data.pazartesi) {
          if (!!programArray[i].pazartesi) {
            if(!Array.isArray(programArray[i].pazartesi))
              programArray[i].pazartesi = [programArray[i].pazartesi, data.pazartesi];
            else
              programArray[i].pazartesi = [ ...programArray[i].pazartesi, data.pazartesi ];
            added = true;
          }
          else{
            programArray[i].pazartesi = data.pazartesi;
            added = true;
          }
        }
        if (!!data.salı) {
          if (!!programArray[i].salı) {
            if(!Array.isArray(programArray[i].salı))
              programArray[i].salı = [programArray[i].salı, data.salı];
            else
              programArray[i].salı = [ ...programArray[i].salı, data.salı ];
            added = true;
          }
          else{
            programArray[i].salı = data.salı;
            added = true;
          }
        }
        if (!!data.çarşamba) {
          if(!!programArray[i].çarşamba){
            if(!Array.isArray(programArray[i].çarşamba))
              programArray[i].çarşamba = [programArray[i].çarşamba, data.çarşamba];
            else
              programArray[i].çarşamba = [ ...programArray[i].çarşamba, data.çarşamba ];
            added = true;
          }
          else{
            programArray[i].çarşamba = data.çarşamba;
            added = true;
          }
        }
        if (!!data.perşembe) {
          if(!!programArray[i].perşembe){
            if(!Array.isArray(programArray[i].perşembe))
              programArray[i].perşembe = [programArray[i].perşembe, data.perşembe];
            else
              programArray[i].perşembe = [ ...programArray[i].perşembe, data.perşembe ];
            added = true;
          }
          else{
            programArray[i].perşembe = data.perşembe;
            added = true;
          }
        }
        if (!!data.cuma) {
          if(!!programArray[i].cuma){
            if(!Array.isArray(programArray[i].cuma))
              programArray[i].cuma = [programArray[i].cuma, data.cuma];
            else
              programArray[i].cuma = [ ...programArray[i].cuma, data.cuma ];
            added = true;
          }
          else{
            programArray[i].cuma = data.cuma;
            added = true;
          }
        }
        if (!!data.cumartesi) {
          if(!!programArray[i].cumartesi){
            if(!Array.isArray(programArray[i].cumartesi))
              programArray[i].cumartesi = [programArray[i].cumartesi, data.cumartesi];
            else
              programArray[i].cumartesi = [ ...programArray[i].cumartesi, data.cumartesi ];
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
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const studentId = userInfo.id;
  const defaultSchedule = useMemo(()=>{
    return{
      tooltipComponent: CustomTooltip
    };
  },[]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/student/getSchedule/id="+studentId)
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
