import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import "../styles/ProfilePage.css";

function ProfilPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:1337/profile")
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <h1>Bilgilerim Sayfası Güncelleniyor...</h1>
        {!!data ? (
          <div className="role">Role: {data.role}</div>
        ) : (
          <div></div>
        )}
      </Stack>
      {!!data ? (
        <div className="bg">

          <Stack direction="horizontal" gap={1}>
            <img src={data.image} className="masked" />
            <Stack>
              <Stack className="name" direction="horizontal" gap={3}>
                <div>Name: </div>
                <div className="ms-auto">{data.name}</div>
              </Stack>
              <Button className="btn-product" size="sm" href="#">{data.email}</Button>
              <Stack className="department" direction="horizontal" gap={3}>
                <div>Department: </div>
                <div className="ms-auto">{data.department}</div>
              </Stack>
              <Stack className="id" direction="horizontal" gap={3}>
                <div>Student number: </div>
                <div className="ms-auto">{data.id}</div>
              </Stack>
            </Stack>
            <Stack className="ls">
              <h3 className="head">Major Info</h3>
              <Stack direction="horizontal">
                <Stack className="o-t">
                  <h4>{data.faculty}</h4>
                  <div>{data.department}</div>
                </Stack>
                <div className="o-o">Grade: {data.class} </div>
                <div className="o-o">GPA: {data.gpa} </div>
              </Stack>
              <Stack className="sch" direction="horizontal" gap={3}>
                <div>Scholarship: </div>
                <div className="ms-auto">{data.scholarship}</div>
              </Stack>
              <Stack className="term" direction="horizontal" gap={3}>
                <div>Term: </div>
                <div className="ms-auto">{data.term}</div>
              </Stack>
              <Stack className="curr" direction="horizontal" gap={3}>
                <div>Curriculum: </div>
                <div className="ms-auto">{data.curriculum}</div>
              </Stack>
              <Stack className="enr" direction="horizontal" gap={3}>
                <div>Enrolled in: </div>
                <div className="ms-auto">{data.createdAt}</div>
              </Stack>
              <Stack className="stat" direction="horizontal" gap={3}>
                <div>Status: </div>
                <div className="ms-auto">{data.status}</div>
              </Stack>
              <Stack direction="horizontal">
                <div className="w-w">Credits Taken: {data.creditTaken} </div>
                <div className="w-w">Credits Completed: {data.creditCompleted} </div>
              </Stack>
            </Stack>
          </Stack>
        </div>
      ) : (
        <div>
          Couldn't load data...
        </div>
      )}
    </>
  );
}

export default ProfilPage;
