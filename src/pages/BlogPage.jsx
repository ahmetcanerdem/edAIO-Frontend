import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";



const BlogPage = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/blog"
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []
  );



  return (
    <>
    <div>
        <h1>Blog Sayfası</h1>
        {!!data && data.lessonBlogPage.map((lesson) => { 
            const row = [];
    
        row.push(<li key={lesson}>
            <ul>
                <li>Lesson Code: {lesson.lessonId}</li>
                <li>Posts: {lesson.posts.map((post)=>  {
                    const row2 = [];
                    row2.push(<li key={post}>
                        <ul>
                            <li>Post #: {post.postId}</li>
                            <li>Header: {post.postHeader}</li>
                            <li>Writer: {post.postWriterName}</li>
                            <li>Date: {post.postDate}</li>
                            <li>Body: {post.postBody}</li>
                            <li>Responses: {post.postResponses.map((response)=> {
                                const row3 = [];
                                row3.push(<li key= {response}>
                                    <ul>
                                        <li>Writer: {response.responseWriterName}</li>
                                        <li>Body: {response.responseBody}</li>
                                    </ul>
                                </li>);
                            return row3;
                            })}</li>
                        </ul>
                    </li>);
                    return row2;
                    })}
                    </li>
                    <li>Resources: <ul>
                <li>Assignments: {lesson.resources.assignment.map((assignment)=> {
                    const row4 = [];
                    row4.push(<li key={assignment}>
                        <ul>
                            <li>Id: {assignment.assignmentId}</li>
                            <li>File: {assignment.assignmentFile}</li>
                            <li>Due Date: {assignment.dueDate}</li>
                            <li>Upload Date: {assignment.uploadDate}</li>
                        </ul>
                    </li>);
                    return row4;
                })}</li>
                <li>Lecture Notes: {lesson.resources.lectureNotes.map((notes)=>{
                    const row5 = [];
                    row5.push(<li key={notes}>
                        <ul>
                            <li>Id: {notes.notesId}</li>
                            <li>File: {notes.notesFile}</li>
                            <li>Upload Date: {notes.uploadDate}</li>
                        </ul>
                    </li>);
                    return row5;
                })}</li>
                <li>Videos: {lesson.resources.lectureVideos.map((videos)=>{
                    const row6 = [];
                    row6.push(<li key={videos}>
                        <ul>
                            <li>Id: {videos.videosId}</li>
                            <li>Link: {videos.videosLink}</li>
                            <li>Upload Date: {videos.uploadDate}</li>
                        </ul>
                    </li>);
                    return row6;
                })}</li>
                <li>Exams: {lesson.resources.exams.map((exam)=>{
                    const row7 = [];
                    row7.push(<li key={exam}>
                        <ul>
                            <li>File: {exam.examFile}</li>
                            <li>Due Date: {exam.dueDate}</li>
                            <li>Upload Date: {exam.uploadDate}</li>
                        </ul>
                    </li>);
                    return row7;
                })}</li>
                <li>Other Resources: {lesson.resources.otherResources.map((other)=> {
                    const row8 = [];
                    row8.push(<li key={other}>
                        <ul>
                            <li>File: {other.ResourceFile}</li>
                            <li>Upload Date: {other.uploadDate}</li>
                        </ul>
                    </li>);
                    return row8;
                })}

                </li>
                </ul>
            </li>

            </ul>
        </li>);
      return row;
    }
      
      )}
    </div>
    </>
  );
};

export default BlogPage;
