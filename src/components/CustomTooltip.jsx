import React from "react";
import "../styles/CustomTooltip.css";

const CustomTooltip = (props) => {
  const lessonInfo = [];
  const lecture = [];

  let lessonClass;
  let zoomId;
  let lessonIndex;
  let lessonName;

  if (props.value instanceof Array) {
    props.value.forEach((item) => {
      lecture.push(item);
    });
  } else {
    lecture.push(props.value);
  }

  lecture.forEach((item) => {
    lessonIndex = item.indexOf("Derslik");
    lessonName = item.substring(0, lessonIndex);
    const loadingId = item.indexOf("ID ");
    if (loadingId > 0) {
      lessonClass = item.substring(lessonIndex + 9, loadingId - 1);
      zoomId = item.substring(loadingId);
    } else {
      const zoomIndex = item.indexOf("Zoom");
      zoomId = item.substring(zoomIndex + 9);
      lessonClass = item.substring(lessonIndex + 9, zoomIndex - 1);
    }
    lessonInfo.push({
      lessonName: lessonName,
      lessonClass: lessonClass,
      zoomId: zoomId,
    });
  });

  const heightSize = lessonInfo.length * 80 + "px";

  const shownItem = () => {
    const items = [];
    lessonInfo.forEach((lesson) => {
      items.push(
        <div className="element-tooltip">
          <div>
            <span className="header-tooltip">Ders İsmi: </span> {lesson.lessonName}
          </div>
          <div>
            <span className="header-tooltip">Ders Saati: </span> {props.data.hours}
          </div>
          <div>
            <span className="header-tooltip">Derslik: </span>
            {lesson.lessonClass}
          </div>
          <div>
            <span className="header-tooltip">Zoom ID: </span>
            {lesson.zoomId}
          </div>
        </div>
      );
    });
    return <>{items}</>;
  };

  return (
    <div
      className="custom-tooltip"
      style={{
        backgroundColor: props.color || "white",
        height: heightSize,
      }}
    >
      <div
        style={{
          height: heightSize,
          backgroundColor: props.color || "white",
        }}
      >
        {shownItem()}
      </div>
    </div>
  );
};

export default CustomTooltip;
