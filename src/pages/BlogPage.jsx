import axios from "axios";
import React, { useEffect, useState } from "react";

import "../styles/BlogPage.css";

import { NavDropdown, Nav, Row, Container, Col } from "react-bootstrap";

const BlogPage = () => {
  const [postData, setPostData] = useState(null);
  const [postIndex, setPostIndex] = useState(0);
  const [postClicked, setPostClicked] = useState(false);
  const [isQA, setQA] = useState(true);
  const [isResource, setResource] = useState(false);
  const [course, setCourse] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const [courses, setCourses] = useState(null);
  const studentId = userInfo.id;
  const [isPosting, setPosting] = useState(false);
  const [courseId, setCourseId] = useState("");
  const userId = JSON.parse(localStorage.getItem("loginData"))._id;
  console.log(JSON.parse(localStorage.getItem("loginData")));
  let server = "http://localhost:5000";

  useEffect(() => {
    axios
      .get(server + "/student/getTermCourses/id=" + studentId)
      .then((response) => {
        console.log(response.data, "courses");
        setCourseId(response.data.courses[0].id);
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
  };

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
    setCourseId(courses[e.target.id].id);
    handleCourses(courses[e.target.id].id);
    console.log(courses[e.target.id]);
  };
  const handlePost = (e) => {
    setPostClicked(true);
    setPosting(false);
    setPostIndex(e.target.id);
  };

  const handlePosting = () => {
    setPosting(true);
    setPostClicked(false);
  };

  const handleTitle = (e) => {
    setPostData({ ...postData, title: e.target.value });
  };

  const handleContent = (e) => {
    setPostData({ ...postData, content: e.target.value });
  };

  const handleSubmit = () => {
    setPosting(false);
    setPostClicked(false);
    axios({
      method: "post",
      url: server + "/post/add/cid=" + courseId,
      data: {
        title: postData.title,
        content: postData.content,
        createdBy: JSON.parse(localStorage.getItem("loginData"))._id,
      },
    });
    
  };

  const handleResponseContent = (e) => {
    setResponseData({ ...responseData, content: e.target.value });
  };

  const handleResponseSubmit = () => {
    axios({
      method: "post",
      url: server + "/comment/addComment/" + course.posts[postIndex]._id,
      data: {
        id: postIndex,
        content: responseData.content,
        createdBy: JSON.parse(localStorage.getItem("loginData"))._id,
      },
    });
    
  };

  const [assignmentData, setAssignmentData] = useState(null);
  const [uploadingAssg, setUploadingAssg] = useState(false);
  const [uploadingNote, setUploadingNote] = useState(false);
  const [noteData, setNoteData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [examData, setExamData] = useState(null);
  const [uploadingExam, setUploadingExam] = useState(false);
  const [generalResourceData, setGeneralResourceData] = useState(null);
  const [uploadingGeneralResource, setUploadingGeneralResource] =
    useState(false);
  const [submittingAssg, setSubmittingAssg] = useState(false);
  const [submitAssgData, setSubmitAssgData] = useState(null);
  const [isExamUploaded, setExamUploaded] = useState(false);
  const [submitExamData, setSubmitExamData] = useState(null);
  const [submittingExam, setSubmittingExam] = useState(false);

  const handleUploadingGeneralResource = () => {
    setUploadingGeneralResource(!uploadingGeneralResource);
  };

  const handleGeneralResourceTitle = (e) => {
    setGeneralResourceData({
      ...generalResourceData,
      title: e.target.value,
    });
  };

  const handleGeneralResourceDescription = (e) => {
    setGeneralResourceData({
      ...generalResourceData,
      description: e.target.value,
    });
  };

  const handleGeneralResourceSelect = (e) => {
    setGeneralResourceData({
      ...generalResourceData,
      file: e.target.files[0],
    });
  };

  const handleUploadingExam = () => {
    setUploadingExam(!uploadingExam);
  };

  const handleExamSelect = (e) => {
    setExamData({ ...examData, file: e.target.files[0] });
  };

  const handleExamDescription = (e) => {
    setExamData({ ...examData, description: e.target.value });
  };

  const handleExamDueDate = (e) => {
    setExamData({ ...examData, dueDate: e.target.value });
  };

  const handleExamTitle = (e) => {
    setExamData({ ...examData, title: e.target.value });
  };

  const handleUploadingVideo = () => {
    setUploadingVideo(!uploadingVideo);
  };

  const handleVideoTitle = (e) => {
    setVideoData({ ...videoData, title: e.target.value });
  };

  const handleVideoDescription = (e) => {
    setVideoData({ ...videoData, description: e.target.value });
  };

  const handleVideoSelect = (e) => {
    setVideoData({ ...videoData, video: e.target.files[0] });
  };

  const handleVideoUpload = () => {
    setUploadingVideo(false);
    const formData = new FormData();
    formData.append("file", videoData.file);
    formData.append("title", videoData.title);
    formData.append("description", videoData.description);
    axios({
      method: "post",
      url: server + "/resource/upload/lectureVideos/cid=" + courseId,
      data: formData,
    });
  };

  const handleUploadingNote = () => {
    setUploadingNote(!uploadingNote);
  };

  const handleNoteTitle = (e) => {
    setNoteData({ ...noteData, title: e.target.value });
  };

  const handleNoteDescription = (e) => {
    setNoteData({ ...noteData, description: e.target.value });
  };

  const handleNoteSelection = (e) => {
    setNoteData({ ...noteData, file: e.target.files[0] });
  };

  const handleNoteUpload = () => {
    setUploadingNote(false);
    const formData = new FormData();
    formData.append("file", noteData.file);
    formData.append("title", noteData.title);
    formData.append("description", noteData.description);
    axios({
      method: "post",
      url: server + "/resource/upload/lectureNotes/cid=" + courseId,
      data: formData,
    });
  };

  const handleExamUpload = () => {
    setUploadingExam(false);
    console.log(examData)
    const formData = new FormData();
    formData.append("file", examData.file);
    formData.append("title", examData.title);
    formData.append("description", examData.description);
    formData.append("dueDate", examData.dueDate);
    axios({
      method: "post",
      url: server + "/exam/upload/cid=" + courseId,
      data: formData,
    });
  };
  const handleUploadingAssg = () => {
    setUploadingAssg(!uploadingAssg);
  };
  const handleAssignmentUpload = () => {
    setUploadingAssg(false);
    const formData = new FormData();
    formData.append("file", assignmentData.file);
    formData.append("title", assignmentData.title);
    formData.append("description", assignmentData.description);
    formData.append("dueDate", assignmentData.dueDate);
    console.log(assignmentData);
    axios({
      method: "post",
      url: server + "/assignment/upload/cid=" + courseId,
      data: formData,
    });
  };

  const handleGeneralResourceUpload = (data) => {
    setUploadingGeneralResource(false);
    const formData = new FormData();
    formData.append("file", generalResourceData.file);
    formData.append("title", generalResourceData.title);
    formData.append("description", generalResourceData.description);
    axios({
      method: "post",
      url: server + "/resource/upload/otherResources/cid=" + courseId,
      data: formData,
    });
  };

  const handleSubmittingAssg = () => {
    setSubmittingAssg(!submittingAssg);
  };

  const handleSubmitAssg = (e) => {
    setSubmitAssgData({
      ...submitAssgData,
      file: e.target.files[0],
    });
  };

  const handleAssignmentSubmit = (id) => {
    setSubmittingAssg(false);
    console.log(submitAssgData);
    const formData = new FormData();
    formData.append("file", submitAssgData.file);
    axios({
      method: "post",
      url:
        server +
        "/assignment/upload/cid=" +
        courseId +
        "/aid=" +
        id +
        "/sid=" +
        studentId,
      data: formData,
    });
  };

  const handleSubmittingExam = () => {
    setSubmittingExam(!submittingExam);
  };

  const handleSubmitExam = (e) => {
    setSubmitExamData({
      ...submitExamData,
      file: e.target.files[0],
    });
  };
  const handleExamSubmit = (id) => {
    setSubmittingExam(false);
    console.log(submitExamData);
    const formData = new FormData();
    formData.append("file", submitExamData.file);
    axios({
      method: "post",
      url:
        server +
        "/exam/upload/cid=" +
        courseId +
        "/aid=" +
        id +
        "/sid=" +
        studentId,
      data: formData,
    });
  };
  const handleAssingmentSelection = (e) => {
    setAssignmentData({ ...assignmentData, file: e.target.files[0] });
  };
  const handleAssingmentDueDate = (e) => {
    setAssignmentData({ ...assignmentData, dueDate: e.target.value });
  };
  const handleAssignmentTitle = (e) => {
    setAssignmentData({ ...assignmentData, title: e.target.value });
  };
  const handleAssignmentDescription = (e) => {
    setAssignmentData({ ...assignmentData, description: e.target.value });
  };

  const handleAssgSubmitCheck = (id) => {
    axios
      .get(
        server +
          "/assignment/upload/cid=" +
          courseId +
          "/aid=" +
          id +
          "/sid=" +
          studentId
      )
      .then((response) => {
        console.log(response.data, "  ASSSGGGGG");
        return response.data.isRegistered;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleExamSubmitCheck = (id) => {
    axios
      .get(
        server +
          "/assignment/upload/cid=" +
          courseId +
          "/aid=" +
          id +
          "/sid=" +
          studentId
      )
      .then((response) => {
        console.log(response.data, " AAAAAAAAAAAAAAAAAAAAAAAAAA");
        return response.data.isRegistered;
      })
      .catch((error) => {
        console.log(error);
      });
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
                      id={index}
                      value={index}
                    >
                      {lecture.code}
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
              <label>
                Posts:{" "}
                <button className="button button-1" onClick={handlePosting}>
                  +
                </button>
              </label>

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
                            id={index}
                            onClick={handlePost}
                            value={index}
                          >
                            <div className="col-md-6">{post.title}</div>
                            <div className="col-md-6">
                              <label id="post-writer">
                                {post.createdBy.name}
                              </label>
                            </div>
                          </Nav.Link>
                        </Row>
                      </>
                    );
                    return postHeaders;
                  })}
                </Nav>
              </div>
              {isPosting ? (
                <>
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
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Post</label>
                          <input
                            className="form-control"
                            placeholder="Post Title"
                            onChange={handleTitle}
                          />
                          <input
                            className="form-control"
                            placeholder="Post Body"
                            onChange={handleContent}
                          />
                          <button
                            className="button button-1"
                            onClick={handleSubmit}
                          >
                            Yukle
                          </button>
                        </div>
                      </Container>
                    </Container>
                  </div>
                </>
              ) : (
                <></>
              )}
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
                      <>
                        <Row>{course.posts[postIndex].title}</Row>
                        <Row>{course.posts[postIndex].content}</Row>
                        <Row>
                          <Col>{course.posts[postIndex].createdBy.name}</Col>
                          <Col>{course.posts[postIndex].createdAt}</Col>
                        </Row>
                        <br />
                      </>
                      {course.posts[postIndex].comments.map((response) => {
                        const row = [];
                        row.push(
                          <Row key={response} style={{ padding: 10 }}>
                            <Row>
                              <Col>{response.createdBy.name}</Col>
                              <Col></Col>
                            </Row>
                            <hr />
                            <Row>{response.content}</Row>
                            <hr />
                          </Row>
                        );
                        return row;
                      })}
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
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Yorum</label>
                              <input
                                className="form-control"
                                placeholder="Yorum"
                                onChange={handleResponseContent}
                              />
                              <button
                                className="button button-1"
                                onClick={handleResponseSubmit}
                              >
                                Yukle
                              </button>
                            </div>
                          </Container>
                        </Container>
                      </div>
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
            <br />
            <Row>
              <Col xs={8}>
                <h3>Assignments</h3>
              </Col>
              <Col xs={2}>
                {userInfo.isStudent ? (
                  <>
                    {uploadingAssg ? (
                      <>
                        <div>
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleAssingmentSelection}
                          ></input>
                          <input
                            type="date"
                            className="form-control"
                            onChange={handleAssingmentDueDate}
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleAssignmentTitle}
                            placeholder="Baslik"
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleAssignmentDescription}
                            placeholder="Aciklama"
                          ></input>
                          <Row>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleAssignmentUpload}
                              >
                                Yukle
                              </Nav.Link>
                            </Col>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleUploadingAssg}
                              >
                                Vazgec
                              </Nav.Link>
                            </Col>
                          </Row>
                        </div>
                      </>
                    ) : (
                      <>
                        <Nav.Link
                          className="button button-1"
                          onClick={handleUploadingAssg}
                        >
                          +
                        </Nav.Link>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Col>
              <Col xs={2}></Col>
            </Row>
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
                  <Col>Teslim</Col>
                </Row>
                {course.resources.assignments.map((assignment) => {
                  const row = [];
                  row.push(
                    <>
                      <hr />
                      <Row key={assignment} style={{ textAlign: "center" }}>
                        <Col>{assignment.title}</Col>
                        <Col>{assignment.fileName}</Col>
                        <Col>
                          {new Date(
                            assignment.uploadedDate
                          ).toLocaleDateString()}
                        </Col>
                        <Col>
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </Col>
                        <Col>
                          {new Date().getTime() <
                          new Date(assignment.dueDate).getTime() ? (
                            <>
                              {!handleAssgSubmitCheck(assignment._id) ? (
                                <>
                                  {!submittingAssg ? (
                                    <Nav.Link
                                      type="file"
                                      className="button button-1"
                                      onClick={handleSubmittingAssg}
                                    >
                                      Teslim Et
                                    </Nav.Link>
                                  ) : (
                                    <>
                                      <Row>
                                        <input
                                          type="file"
                                          className="form-control"
                                          onChange={handleSubmitAssg}
                                        ></input>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <Nav.Link
                                            className="button button-1"
                                            onClick={() => {
                                              handleAssignmentSubmit(
                                                assignment._id
                                              );
                                            }}
                                          >
                                            Yukle
                                          </Nav.Link>
                                        </Col>
                                        <Col>
                                          <Nav.Link
                                            className="button button-1"
                                            onClick={handleSubmittingAssg}
                                          >
                                            Vazgec
                                          </Nav.Link>
                                        </Col>
                                      </Row>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {!submittingAssg ? (
                                    <Nav.Link
                                      type="file"
                                      className="button button-1"
                                      onClick={handleSubmittingAssg}
                                    >
                                      Teslim Edildi
                                    </Nav.Link>
                                  ) : (
                                    <>
                                      
                                      <Row>
                                        <input
                                          type="file"
                                          className="form-control"
                                          onChange={handleSubmitAssg}
                                        ></input>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <Nav.Link
                                            className="button button-1"
                                            onClick={() => {
                                              handleAssignmentSubmit(
                                                assignment._id
                                              );
                                            }}
                                          >
                                            Yukle
                                          </Nav.Link>
                                        </Col>
                                        <Col>
                                          <Nav.Link
                                            className="button button-1"
                                            onClick={handleSubmittingAssg}
                                          >
                                            Vazgec
                                          </Nav.Link>
                                        </Col>
                                      </Row>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <label>Gecmis</label>
                            </>
                          )}
                        </Col>
                      </Row>
                    </>
                  );
                  return row;
                })}
              </Container>
            </Container>
            <br />
            <Row>
              <Col xs={8}>
                <h3>Notes</h3>
              </Col>
              <Col xs={2}>
                {userInfo.isStudent ? (
                  <>
                    {uploadingNote ? (
                      <>
                        <div>
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleNoteSelection}
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleNoteTitle}
                            placeholder="Baslik"
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleNoteDescription}
                            placeholder="Aciklama"
                          ></input>
                          <Row>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleNoteUpload}
                              >
                                Yukle
                              </Nav.Link>
                            </Col>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleUploadingNote}
                              >
                                Vazgec
                              </Nav.Link>
                            </Col>
                          </Row>
                        </div>
                      </>
                    ) : (
                      <>
                        <Nav.Link
                          className="button button-1"
                          onClick={handleUploadingNote}
                        >
                          +
                        </Nav.Link>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Col>
              <Col xs={2}></Col>
            </Row>
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
                    <>
                      <hr />
                      <Row key={note} style={{ padding: 10 }}>
                        <Row style={{ textAlign: "center" }}>
                          <Col>{note.title}</Col>
                          <Col>
                            {new Date(note.uploadedDate).toLocaleDateString()}
                          </Col>
                        </Row>
                        <hr />
                      </Row>
                    </>
                  );
                  return row;
                })}
              </Container>
            </Container>
            <br />
            <Row>
              <Col xs={8}>
                <h3>Videos</h3>
              </Col>
              <Col xs={2}>
                {userInfo.isStudent ? (
                  <>
                    {uploadingVideo ? (
                      <>
                        <div>
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleVideoSelect}
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleVideoTitle}
                            placeholder="Baslik"
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleVideoDescription}
                            placeholder="Aciklama"
                          ></input>
                          <Row>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleVideoUpload}
                              >
                                Yukle
                              </Nav.Link>
                            </Col>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleUploadingVideo}
                              >
                                Vazgec
                              </Nav.Link>
                            </Col>
                          </Row>
                        </div>
                      </>
                    ) : (
                      <>
                        <Nav.Link
                          className="button button-1"
                          onClick={handleUploadingVideo}
                        >
                          +
                        </Nav.Link>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Col>
              <Col xs={2}></Col>
            </Row>
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
                    <>
                      <hr />
                      <Row key={video} style={{ padding: 10 }}>
                        <Row style={{ textAlign: "center" }}>
                          <Col>
                            <a href={video.title}>Video{index + 1}</a>
                          </Col>
                          <Col>
                            {new Date(video.uploadedDate).toLocaleDateString()}
                          </Col>
                        </Row>
                      </Row>
                    </>
                  );
                  return row;
                })}
              </Container>
            </Container>
            <br />
            <Row>
              <Col xs={8}>
                <h3>Exams</h3>
              </Col>
              <Col xs={2}>
                {userInfo.isStudent ? (
                  <>
                    {uploadingExam ? (
                      <>
                        <div>
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleExamSelect}
                          ></input>
                          <input
                            type="date"
                            className="form-control"
                            onChange={handleExamDueDate}
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleExamTitle}
                            placeholder="Baslik"
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleExamDescription}
                            placeholder="Aciklama"
                          ></input>
                          <Row>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleExamUpload}
                              >
                                Yukle
                              </Nav.Link>
                            </Col>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleUploadingExam}
                              >
                                Vazgec
                              </Nav.Link>
                            </Col>
                          </Row>
                        </div>
                      </>
                    ) : (
                      <>
                        <Nav.Link
                          className="button button-1"
                          onClick={handleUploadingExam}
                        >
                          +
                        </Nav.Link>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Col>
              <Col xs={2}></Col>
            </Row>
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
                  <Col>Teslim</Col>
                </Row>
                {course.resources.exams.map((exam) => {
                  const row = [];
                  row.push(
                    <>
                      <hr />
                      <Row key={exam} style={{ padding: 10 }}>
                        <Row style={{ textAlign: "center" }}>
                          <Col>{exam.title}</Col>
                          <Col>
                            {new Date(exam.uploadedDate).toLocaleDateString()}
                          </Col>
                          <Col>
                            {new Date(exam.dueDate).toLocaleDateString()}
                          </Col>
                          <Col>
                            {new Date().getTime() <
                            new Date(exam.dueDate).getTime() ? (
                              <>
                                {!handleExamSubmitCheck(exam._id) ? (
                                <>
                                  {!submittingExam ? (
                                    <Nav.Link
                                      type="file"
                                      className="button button-1"
                                      onClick={handleSubmittingExam}
                                    >
                                      Teslim Et
                                    </Nav.Link>
                                  ) : (
                                    <>
                                      <Row>
                                        <input
                                          type="file"
                                          className="form-control"
                                          onChange={handleSubmitExam}
                                        ></input>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <Nav.Link
                                            className="button button-1"
                                            onClick={() => {
                                              handleExamSubmit(
                                                exam._id
                                              );
                                            }}
                                          >
                                            Yukle
                                          </Nav.Link>
                                        </Col>
                                        <Col>
                                          <Nav.Link
                                            className="button button-1"
                                            onClick={handleSubmittingExam}
                                          >
                                            Vazgec
                                          </Nav.Link>
                                        </Col>
                                      </Row>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {!submittingAssg ? (
                                    <Nav.Link
                                      type="file"
                                      className="button button-1"
                                      onClick={handleSubmittingExam}
                                    >
                                      Teslim Edildi
                                    </Nav.Link>
                                  ) : (
                                    <>
                                      
                                      <Row>
                                        <input
                                          type="file"
                                          className="form-control"
                                          onChange={handleSubmitExam}
                                        ></input>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <Nav.Link
                                            className="button button-1"
                                            onClick={() => {
                                              handleExamSubmit(
                                                exam._id
                                              );
                                            }}
                                          >
                                            Yukle
                                          </Nav.Link>
                                        </Col>
                                        <Col>
                                          <Nav.Link
                                            className="button button-1"
                                            onClick={handleSubmittingExam}
                                          >
                                            Vazgec
                                          </Nav.Link>
                                        </Col>
                                      </Row>
                                    </>
                                  )}
                                </>
                              )}
                              </>
                            ) : (
                              <>
                                <label>Gecmis</label>
                              </>
                            )}
                          </Col>
                        </Row>
                      </Row>
                    </>
                  );
                  return row;
                })}
              </Container>
            </Container>
            <br />
            <Row>
              <Col xs={8}>
                <h3>General Resources</h3>
              </Col>
              <Col xs={2}>
                {userInfo.isStudent ? (
                  <>
                    {uploadingGeneralResource ? (
                      <>
                        <div>
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleGeneralResourceSelect}
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleGeneralResourceTitle}
                            placeholder="Baslik"
                          ></input>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleGeneralResourceDescription}
                            placeholder="Aciklama"
                          ></input>
                          <Row>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleGeneralResourceUpload}
                              >
                                Yukle
                              </Nav.Link>
                            </Col>
                            <Col>
                              <Nav.Link
                                className="button button-1"
                                onClick={handleUploadingGeneralResource}
                              >
                                Vazgec
                              </Nav.Link>
                            </Col>
                          </Row>
                        </div>
                      </>
                    ) : (
                      <>
                        <Nav.Link
                          className="button button-1"
                          onClick={handleUploadingGeneralResource}
                        >
                          +
                        </Nav.Link>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Col>
              <Col xs={2}></Col>
            </Row>
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
                        <Col>
                          <a href="">{resource.title}</a>
                        </Col>
                        <Col>
                          {new Date(resource.uploadedDate).toLocaleDateString()}
                        </Col>
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
