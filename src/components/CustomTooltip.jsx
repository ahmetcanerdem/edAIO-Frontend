import React from "react";
import "../styles/CustomTooltip.css";

const CustomTooltip = (props) => {
  const lessonIndex = props.value.indexOf("Derslik");
  const lessonName = props.value.substring(0, lessonIndex);
  let lessonClass;
  let zoomId;
  const loadingId = props.value.indexOf("ID ");
    if (loadingId > 0) {
      lessonClass = props.value.substring(lessonIndex + 9, loadingId - 1);
      zoomId = props.value.substring(loadingId);
    } else {
      const zoomIndex = props.value.indexOf("Zoom");
      zoomId = props.value.substring(zoomIndex + 9);
      lessonClass = props.value.substring(lessonIndex + 9, zoomIndex - 1);
    }

  return (
    <div
      className="custom-tooltip"
      style={{ backgroundColor: props.color || "white" }}
    >
      <p>
        <div>Ders İsmi: {lessonName}</div>
        <div>Ders Saati: {props.data.hours}</div>
        <div>Derslik: {lessonClass}</div>
        <div>Zoom ID: {zoomId}</div>
      </p>
    </div>
  );
};

export default CustomTooltip;
