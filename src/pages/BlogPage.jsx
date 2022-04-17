import axios from "axios";
import React, { useEffect, useState } from "react";

import "../styles/BlogPage.css";

import { NavDropdown, Nav, Row, Container, Col } from "react-bootstrap";

const BlogPage = () => {
  let studentNumber = 121101016;

  const [postData, setPostData] = useState(null);
  const [postClicked, setPostClicked] = useState(false);
  const [isQA, setQA] = useState(true);
  const [isResource, setResource] = useState(false);
  const [course, setCourse] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const [courses, setCourses] = useState(null);
  const studentId = userInfo.id;
  let server = "http://localhost:5000";

  useEffect(() => {
    axios
      .get(server + "/student/getTermCourses/id=" + studentId)
      .then((response) => {
		setCourses(response.data.courses);
        handleCourses(response.data.courses[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCourses = (id) => {
	axios
	.get(server + "/course/getBlog/id=" + id)
	.then((response) => {
	  console.log(response.data, " AAAAAAAA");
	  
	  setCourse(response.data);
	  setLoading(false);
	})
	.catch((error) => {
	  console.log(error);
	});
}

  const handleNav = (e) => {
    if (e.target.text === "Q & A") {
      setQA(true);
      setResource(false);
    } else {
      setResource(true);
      setQA(false);
    }
    console.log(e.target.text);
  };

  const handleCourse = (e) => {
    setCourse(data.lectures[e.target.attributes.value.value]);
    console.log(data.lectures[e.target.attributes.value.value]);
  };
  const handlePost = (e) => {
    setPostClicked(true);
    setPostData(e.target.attributes.value.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>Blog Sayfası</h1>
        <div className="row">
          <label style={{ textAlign: "right" }}>
            Bugun {new Date().getDate() + "/" + (new Date().getMonth() + 1)}
          </label>
        </div>
        <div className="row post-pad">
          <Nav className="button-container" id="blogpage">
            <NavDropdown className="button button-1" title={course.courseCode}>
              {!!courses &&
                courses.map((lecture, index) => (
                  <div>
                    <NavDropdown.Item
                      className="button button-1"
                      onClick={handleCourse}
                      key={index}
                      value={index}
                    >
                      {lecture.courseCode}
                    </NavDropdown.Item>
                  </div>
                ))}
            </NavDropdown>
            <Nav.Link className="button button-1" onClick={handleNav}>
              Q & A
            </Nav.Link>
            <Nav.Link className="button button-1" onClick={handleNav}>
              Resources
            </Nav.Link>
          </Nav>
        </div>
        {isQA ? (
          <>
            <Row className="post-pad">
              <label>Posts:</label>

              <div className="col-md-2 post-div">
                <Nav className="flex-column">
                  {course.posts.map((post, index) => {
                    const postHeaders = [];
                    postHeaders.push(
                      <>
                        <Row>
                          <Nav.Link
                            className="button button-5"
                            key={index}
                            onClick={handlePost}
                            value={index}
                          >
                            <div className="col-md-6">{post.title}</div>
                            <div className="col-md-6">
                              <label id="post-writer">{post.createdBy}</label>
                            </div>
                          </Nav.Link>
                        </Row>
                      </>
                    );
                    return postHeaders;
                  })}
                </Nav>
              </div>
              {postClicked ? (
                <div className="col-md-9">
                  <Container style={{ paddingRight: 40, paddingTop: 30 }}>
                    <Container
                      style={{
                        backgroundColor: `#87CEFA`,
                        borderRadius: 10,
                        border: "2px solid gray",
                        paddingRight: 10,
                        paddingTop: 10,
                      }}
                    >
                      {console.log(postData)}
                      <>
                        <Row>{course.posts[postData].title}</Row>
                        <Row>{course.posts[postData].content}</Row>
                        <Row>
                          <Col>{course.posts[postData].createdBy}</Col>
                          <Col>{course.posts[postData].createdAt}</Col>
                        </Row>
                        <br />
                      </>
                      {course.posts[postData].comments.map((response) => {
                        const row = [];
                        row.push(
                          <Row key={response} style={{ padding: 10 }}>
                            <Row>
                              <Col>{response.createdBy}</Col>
                              <Col></Col>
                            </Row>
                            <Row>{response.content}</Row>
                            <hr />
                          </Row>
                        );
                        return row;
                      })}
                    </Container>
                  </Container>
                </div>
              ) : null}
            </Row>
          </>
        ) : (
          <div></div>
        )}
        {isResource ? (
          <div className="res">
            <h1>{course.code}</h1>
            <h3>Homeworks</h3>
            <Container style={{ paddingRight: 40, paddingTop: 30 }}>
              <Container
                style={{
                  backgroundColor: `#87CEFA`,
                  borderRadius: 10,
                  border: "2px solid gray",
                  paddingRight: 10,
                  paddingTop: 10,
                }}
              >
                <Row style={{ textAlign: "center" }}>
                  <Col>Odev Adi</Col>
                  <Col>Dosya</Col>
                  <Col>Yuklenme Tarihi</Col>
                  <Col>Teslim Tarihi</Col>
                </Row>
                {course.resources.assignments.map((assignment) => {
                  const row = [];
                  row.push(
                    <Row key={assignment} style={{ padding: 10 }}>
                      <Row style={{ textAlign: "center" }}>
                        <Col>{assignment.title}</Col>
                        <Col>{assignment.fileName}</Col>
                        <Col>{assignment.uploadedDate}</Col>
                        <Col>{assignment.dueDate}</Col>
                      </Row>
                      <hr />
                    </Row>
                  );
                  return row;
                })}
              </Container>
            </Container>
            <h3>Notes</h3>
            <Container style={{ paddingRight: 40, paddingTop: 30 }}>
              <Container
                style={{
                  backgroundColor: `#87CEFA`,
                  borderRadius: 10,
                  border: "2px solid gray",
                  paddingRight: 10,
                  paddingTop: 10,
                }}
              >
                <Row style={{ textAlign: "center" }}>
                  <Col>Dosya</Col>
                  <Col>Yuklenme Tarihi</Col>
                </Row>
                {course.resources.lectureNotes.map((note) => {
                  const row = [];
                  row.push(
                    <Row key={note} style={{ padding: 10 }}>
                      <Row style={{ textAlign: "center" }}>
                        <Col>{note.file}</Col>
                        <Col>{note.uploadDate}</Col>
                      </Row>
                      <hr />
                    </Row>
                  );
                  return row;
                })}
              </Container>
            </Container>
            <h3>Videos</h3>
            <Container style={{ paddingRight: 40, paddingTop: 30 }}>
              <Container
                style={{
                  backgroundColor: `#87CEFA`,
                  borderRadius: 10,
                  border: "2px solid gray",
                  paddingRight: 10,
                  paddingTop: 10,
                }}
              >
                <Row style={{ textAlign: "center" }}>
                  <Col>Dosya</Col>
                  <Col>Yuklenme Tarihi</Col>
                </Row>
                {course.resources.lectureVideos.map((video, index) => {
                  const row = [];
                  row.push(
                    <Row key={video} style={{ padding: 10 }}>
                      <Row style={{ textAlign: "center" }}>
                        <Col>
                          <a href={video.link}>Video{index + 1}</a>
                        </Col>
                        <Col>{video.uploadDate}</Col>
                      </Row>
                      <hr />
                    </Row>
                  );
                  return row;
                })}
              </Container>
            </Container>
            <h3>Exams</h3>
            <Container style={{ paddingRight: 40, paddingTop: 30 }}>
              <Container
                style={{
                  backgroundColor: `#87CEFA`,
                  borderRadius: 10,
                  border: "2px solid gray",
                  paddingRight: 10,
                  paddingTop: 10,
                }}
              >
                <Row style={{ textAlign: "center" }}>
                  <Col>Dosya</Col>
                  <Col>Yuklenme Tarihi</Col>
                  <Col>Teslim Tarihi</Col>
                </Row>
                {course.resources.exams.map((exam) => {
                  const row = [];
                  row.push(
                    <Row key={exam} style={{ padding: 10 }}>
                      <Row style={{ textAlign: "center" }}>
                        <Col>{exam.file}</Col>
                        <Col>{exam.uploadDate}</Col>
                        <Col>{exam.dueDate}</Col>
                      </Row>
                      <hr />
                    </Row>
                  );
                  return row;
                })}
              </Container>
            </Container>
            <h3>General Resources</h3>
            <Container
              style={{ paddingRight: 40, paddingTop: 30, paddingBottom: 20 }}
            >
              <Container
                style={{
                  backgroundColor: `#87CEFA`,
                  borderRadius: 10,
                  border: "2px solid gray",
                  paddingRight: 10,
                  paddingTop: 10,
                }}
              >
                <Row style={{ textAlign: "center" }}>
                  <Col>Dosya</Col>
                  <Col>Yuklenme Tarihi</Col>
                </Row>
                {course.resources.otherResources.map((resource) => {
                  const row = [];
                  row.push(
                    <Row key={resource} style={{ padding: 10 }}>
                      <Row style={{ textAlign: "center" }}>
                        <Col>{resource.file}</Col>
                        <Col>{resource.uploadDate}</Col>
                      </Row>
                      <hr />
                    </Row>
                  );
                  return row;
                })}
              </Container>
            </Container>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
