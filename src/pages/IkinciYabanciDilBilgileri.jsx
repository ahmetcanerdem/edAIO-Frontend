import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { AgGridReact } from "ag-grid-react";
import { PieChart, Pie, Sector } from "recharts";
import "../styles/Sfl.css";

const IkinciYabanciDilBilgileri = () => {
  const [sflInformation, setSflInformation] = useState(null);
  const [reload, setReload] = useState(1);
  const [sfl, setSfl] = useState(null);
  const [allDstr, setAllDstr] = useState(null);
  // const [facultyDstr, setFacultyDstr] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("loginData"));
  const studentId = userInfo.studentID;
  const [departmentDstr, setDepartmentDstr] = useState(null);
  const [data, setData] = useState(null);
  const [isExpanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [distributeFunc, setDistributeFunc] = useState("");
  const server = "http://localhost:5000";

  const ALL = "Genel";
  const DEPARTMENT = "Bölüm Bazında";

  const takenSfl = [];
  const allDistribution = [];
  const departmentDistribution = [];
  const mustListSfl = [
    {
      lectureType: "iyd1",
      lectureStatus: "Almadı",
    },
    {
      lectureType: "iyd2",
      lectureStatus: "Almadı",
    },
    {
      lectureType: "iyd3",
      lectureStatus: "Almadı",
    },
    {
      lectureType: "iyd4",
      lectureStatus: "Almadı",
    },
  ];
  const [sflSelect, setSflSelect] = useState();

  useEffect(async () => {
    let response = await axios.get(server + "/student/id=" + studentId);
    if (!!response.data) {
      console.log(response);
      setSflSelect(response.data.student[0].secondForeignLanguage);
    } else {
      console.log(response.error);
    }
  }, []);

  useEffect(async () => {
    let response = await axios.get(
      server + "/student/getSFLanguage/id=" + studentId
    );
    if (!!response.data) {
      setSflInformation(response.data);
    } else {
      console.log(response.error);
    }
  }, [sflSelect]);

  useEffect(() => {
    setReload((prevState) => prevState + 1);
  }, [sfl]);

  useEffect(() => {
    if (distributeFunc == ALL) {
      setData(allDstr);
    } else if (distributeFunc == DEPARTMENT) {
      setData(departmentDstr);
    }
    setReload((prevState) => prevState + 1);
  }, [distributeFunc]);

  useEffect(() => {
    setCourses();
    setAllDistribution();
    // setFacultyDistribution();
    setDepartmentDistribution();
  }, [sflInformation]);

  const setCourses = () => {
    if (!!sflInformation?.courses) {
      sflInformation?.courses?.forEach((sflCourse) => {
        takenSfl.push({
          takenYear: sflCourse.year,
          takenSemester: sflCourse.term,
          lectureType: sflCourse.courseType,
          lectureShortCode: sflCourse.shortCode,
          lectureGrade: sflCourse.grade,
          lectureStatus: sflCourse.status,
        });
      });
      mustListSfl.forEach((mustSfl) => {
        if (
          takenSfl.filter((sfl) => sfl.lectureType == mustSfl.lectureType)
            .length <= 0
        )
          takenSfl.push(mustSfl);
      });
      takenSfl.sort((a, b) => a.lectureType - b.lectureType);
      setSfl(takenSfl);
    }
  };

  const setAllDistribution = () => {
    sflInformation?.all?.forEach((allSfl) => {
      allDistribution.push({
        name: allSfl.name,
        value: allSfl.value,
      });
    });
    setAllDstr(allDistribution);
  };

  const setDepartmentDistribution = () => {
    sflInformation?.dept?.forEach((departmentSfl) => {
      departmentDistribution.push({
        name: departmentSfl.name,
        value: departmentSfl.value,
      });
    });
    setDepartmentDstr(departmentDistribution);
  };

  const curriculumTable = [
    { headerName: "Öğretim Yılı", field: "takenYear" },
    { headerName: "Öğretim Dönemi", field: "takenSemester" },
    { headerName: "Ders Kodu", field: "lectureType" },
    { headerName: "Seçmeli Ders Kodu", field: "lectureShortCode" },
    { headerName: "Harf Not", field: "lectureGrade" },
    { headerName: "Durum", field: "lectureStatus" },
  ];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Kişi Sayısı: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Yüzde: ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  let handleSFL = {
    secondForeignLanguage: "",
  };
  const [selectedSFL, setSelectedSFL] = useState();

  const secondFL = [
    {
      name: "Almanca",
      short: "alm",
    },
    {
      name: "Arapça",
      short: "arp",
    },
    {
      name: "Çince",
      short: "cin",
    },
    {
      name: "Fransızca",
      short: "fr",
    },
    {
      name: "İspanyolca",
      short: "isp",
    },
    {
      name: "İtalyanca",
      short: "itl",
    },
    {
      name: "Japonca",
      short: "jap",
    },
    {
      name: "Rusça",
      short: "rus",
    },
  ];

  const postSFL = () => {
    handleSFL.secondForeignLanguage = selectedSFL;

    axios({
      method: "post",
      url: server + "/student/setSFLanguage/sid=" + studentId,
      data: handleSFL,
    });
  };

  const SecimComponent = () => {
    const [isExpandedMfredat, setExpandedMfredat] = useState(false);
    return (
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading
            onClick={() => {
              setExpandedMfredat(!isExpandedMfredat);
            }}
          >
            <AccordionItemButton>
              <h4 className="accordion-item-button-header">
                İkinci Yabancı Dil Müfredatı
              </h4>
            </AccordionItemButton>
          </AccordionItemHeading>

          <AccordionItemPanel>
            <div
              className="ag-theme-balham"
              style={{
                height: 200,
                width: "70%",
                marginLeft: "75px",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              <AgGridReact columnDefs={curriculumTable} rowData={sfl} />
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  };

  const ScheduleComponent = () => {
    const [isExpandedSelect, setExpandedSelect] = useState(false);
    return (
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading
            onClick={() => {
              setExpandedSelect(!isExpandedSelect);
            }}
          >
            <AccordionItemButton>
              <h4 className="accordion-item-button-header">
                İkinci Yabancı Dil Seçiminizi Yapınız:
              </h4>
            </AccordionItemButton>
          </AccordionItemHeading>

          <AccordionItemPanel>
            <div style={{paddingLeft: "50px"}}>
              <form>
                <div className="form-group">
                  <ul>
                    {secondFL.map((language, index) => {
                      return (
                        <li key={index}>
                          <input
                            type="checkbox"
                            id={index}
                            defaultChecked={false}
                            onChange={(e) => {
                              setSelectedSFL(secondFL[e.target.id].name);
                            }}
                          />
                          <label>{language.name}</label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </form>
              {!!selectedSFL && (
                <button
                  type="submit"
                  className="button button-5"
                  onClick={postSFL}
                >
                  Submit
                </button>
              )}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    reload && <>
      {!!sflSelect ? (
        <div
          style={{
            paddingTop: "50px",
            paddingLeft: "50px",
          }}
        >
          <h3>Almış Olduğunuz İkinci Yabancı Dil:</h3>
          <div style={{color: "red", fontWeight: 700}}>{sflSelect}</div>
        </div>
      ) : (
        <h3>Henüz İkinci Yabancı Dilinizi Seçmediniz.</h3>
      )}
      <div>
        {!!sflSelect ? <SecimComponent /> : <ScheduleComponent />}

        <Accordion>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="accordion-item-button-header-div">
                  <h4 className="header-button">
                    İkinci Yabancı Dil Tercih Dağılımı
                  </h4>
                  <button
                    style={{ backgroundColor: "#86afef" }}
                    onClick={() => {
                      setDistributeFunc(ALL);
                      setReload((prevState) => prevState + 1);
                    }}
                  >
                    Genel
                  </button>
                  <button
                    style={{ backgroundColor: "#b5f8f7" }}
                    onClick={() => {
                      setDistributeFunc(DEPARTMENT);
                      setReload((prevState) => prevState + 1);
                    }}
                  >
                    Bölüm Bazında
                  </button>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="accordion-item-panel-div">
                <h4
                  style={{
                    color: "darkblue",
                  }}
                >
                  {distributeFunc} İkinci Yabancı Dil Tercih Dağılımı
                </h4>
                <div>
                  <PieChart width={500} height={300}>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#596868"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    />
                  </PieChart>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default IkinciYabanciDilBilgileri;
