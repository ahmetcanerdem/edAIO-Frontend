import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";



const BlogPage = () => {

	const [data, setData] = useState(null);
	useEffect(() => {
		axios
			.get(
				"http://localhost:1337/blog"
			)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log("errordayim");
				console.log(error);
			});
	}, []
	);



	return (
		<>
			<div>
				<h1>Blog Sayfası</h1>
				{!!data && data.lectures.map((lecture) => {
					const row = [];
					row.push(<li key={lecture}>
						<ul>
							<li>Lecture Code: {lecture.code}</li>
							<li>Posts: {lecture.posts.map((post) => {
								const row2 = [];
								row2.push(<li key={post}>
									<ul>
										<li>Post #: {post.id}</li>
										<li>Header: {post.header}</li>
										<li>Writer: {post.writer}</li>
										<li>Date: {post.date}</li>
										<li>Body: {post.body}</li>
										<li>Responses: {post.responses.map((response) => {
											const row3 = [];
											row3.push(<li key={response}>
												<ul>
													<li>Writer: {response.writer}</li>
													<li>Body: {response.body}</li>
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
								<li>Assignments: {lecture.resources.assignments.map((assignment) => {
									const row4 = [];
									row4.push(<li key={assignment}>
										<ul>
											<li>Id: {assignment.id}</li>
											<li>File: {assignment.file}</li>
											<li>Due Date: {assignment.dueDate}</li>
											<li>Upload Date: {assignment.uploadDate}</li>
										</ul>
									</li>);
									return row4;
								})}</li>
								<li>Lecture Notes: {lecture.resources.lectureNotes.map((notes) => {
									const row5 = [];
									row5.push(<li key={notes}>
										<ul>
											<li>File: {notes.file}</li>
											<li>Upload Date: {notes.uploadDate}</li>
										</ul>
									</li>);
									return row5;
								})}</li>
								<li>Videos: {lecture.resources.lectureVideos.map((videos) => {
									const row6 = [];
									row6.push(<li key={videos}>
										<ul>
											<li>Link: {videos.link}</li>
											<li>Upload Date: {videos.uploadDate}</li>
										</ul>
									</li>);
									return row6;
								})}</li>
								<li>Exams: {lecture.resources.exams.map((exam) => {
									const row7 = [];
									row7.push(<li key={exam}>
										<ul>
											<li>File: {exam.file}</li>
											<li>Due Date: {exam.dueDate}</li>
											<li>Upload Date: {exam.uploadDate}</li>
										</ul>
									</li>);
									return row7;
								})}</li>
								<li>Other Resources: {lecture.resources.otherResources.map((other) => {
									const row8 = [];
									row8.push(<li key={other}>
										<ul>
											<li>File: {other.file}</li>
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
