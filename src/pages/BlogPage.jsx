import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


import "../styles/BlogPage.css";

import {
	NavDropdown, Nav, Row
} from 'react-bootstrap';



const BlogPage = () => {
	let studentNumber = 121101016;

	const [hwColumns] = useState(
		[
			{ headerName: "Odev", field: "file" },
			{ headerName: "Yuklenme Tarihi", field: "uploadDate" },
			{ headerName: "Teslim Tarihi", field: "dueDate" }
		]
	);
	const [hwRows, setHWRows] = useState();

	const [noteColumns] = useState(
		[
			{ headerName: "Notlar", field: "file" },
			{ headerName: "Yuklenme Tarihi", field: "uploadDate" }
		]
	);
	const [noteRows, setNoteRows] = useState();

	const [videoColumns] = useState(
		[
			{ headerName: "Video", field: "link" },
			{ headerName: "Yuklenme Tarihi", field: "uploadDate" }
		]
	);
	const [videoRows, setVideoRows] = useState();

	const [examColumns] = useState(
		[
			{ headerName: "Sinav", field: "file" },
			{ headerName: "Yuklenme Tarihi", field: "uploadDate" },
			{ headerName: "Teslim Tarihi", field: "dueDate" }
		]
	);
	const [examRows, setExamRows] = useState();

	const [recColumns] = useState(
		[
			{ headerName: "Kaynak", field: "file" },
			{ headerName: "Yuklenme Tarihi", field: "uploadDate" }
		]
	);
	const [recRows, setRecRows] = useState();




	const [postData, setPostData] = useState(null);
	const [postClicked, setPostClicked] = useState(false);
	const [isQA, setQA] = useState(true);
	const [isResource, setResource] = useState(false);
	const [course, setCourse] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		axios
			.get(
				"http://localhost:1337/blog"
			)
			.then((response) => {
				setData(response.data);
				setCourse(response.data.lectures[0]);
				setLoading(false);
			})
			.catch((error) => {
				console.log("errordayim");
				console.log(error);
			});
	}, []
	);

	const handleNav = ((e) => {
		if (e.target.text === "Q & A") {
			setQA(true);
			setResource(false);
		}
		else {
			setResource(true);
			setQA(false);
		}
		console.log(e.target.text);
	});


	const handleCourse = ((e) => {
		setCourse(data.lectures[e.target.attributes.value.value]);
		console.log(data.lectures[e.target.attributes.value.value]);
	});
	const handlePost = ((e) => {
		setPostClicked(true);
		setPostData(e.target.attributes.value.value);
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}




	return (
		<>
			<div>
				<h1>Blog Sayfası</h1>
				<div className="row" ><label style={{textAlign: 'right'}}>Bugun {new Date().getDate() + "/" + (new Date().getMonth() + 1)}</label></div>
				<div className="row post-pad">
					<Nav className="button-container" id="blogpage">
						<NavDropdown className="button button-1" title={course.code} >
							{!!data && data.lectures.map((lecture, index) =>
								<div>
									<NavDropdown.Item className="button button-1" onClick={handleCourse} key={index} value={index}>
										{lecture.code}
									</NavDropdown.Item>
								</div>
							)}
						</NavDropdown>
						<Nav.Link className="button button-1" onClick={handleNav}>Q & A</Nav.Link>
						<Nav.Link className="button button-1" onClick={handleNav}>Resources</Nav.Link>
					</Nav>
				</div>
				{isQA ?
					<>
						<Row className='post-pad'>
							<label>Posts:</label>

							<div className="col-md-2 post-div">
								<Nav className="flex-column">
									{course.posts.map((post, index) => {
										const postHeaders = [];
										postHeaders.push(
											<>
												<Row>
													<Nav.Link className="button button-5" key={index} onClick={handlePost} value={index}>
														<div className="col-md-6">
															{post.header}
														</div>
														<div className="col-md-6"  >
															<label id="post-writer">{post.writer}</label>
														</div>
													</Nav.Link>
												</Row>
											</>
										)
										return postHeaders
									})}
								</Nav>
							</div>
							{postClicked ?
								<div className="col-md-10">
									<Row>
										<label>{course.posts[postData].header}</label>
									</Row>
									<div className="row">{course.posts[postData].body}</div>
									{course.posts[postData].responses.map((response) => {
										const postResponses = [];
										postResponses.push(<>
											<div className="row">
												<label>{response.writer}</label>
												<div>{response.body}</div>
											</div>
										</>)
										return postResponses
									})}
								</div>
								: null}
						</Row>
					</>
					:
					<div></div>
				}
				{isResource ?
					<div className="res">
						<h1>{course.code}</h1>
						<h3>Homeworks</h3>
						<div className="ag-theme-balham"
							style={{
								width: "40%",
								height: 100,
								margin: 'auto'
							}}>
							<AgGridReact
								columnDefs={hwColumns}
								rowData={course.resources.assignments}
							/>
						</div>
						<h3>Notes</h3>
						<div className="ag-theme-balham"
							style={{
								width: "40%",
								height: 100,
								margin: 'auto'
							}}>
							<AgGridReact
								columnDefs={noteColumns}
								rowData={course.resources.lectureNotes}
							/>
						</div>
						<h3>Videos</h3>
						<div className="ag-theme-balham"
							style={{
								width: "40%",
								height: 100,
								margin: 'auto'
							}}>
							<AgGridReact
								columnDefs={videoColumns}
								rowData={course.resources.lectureVideos}
							/>
						</div>
						<h3>Exams</h3>
						<div className="ag-theme-balham"
							style={{
								width: "40%",
								height: 100,
								margin: 'auto'
							}}>
							<AgGridReact
								columnDefs={examColumns}
								rowData={course.resources.exams}
							/>
						</div>
						<h3>General Resources</h3>
						<div className="ag-theme-balham"
							style={{
								width: "40%",
								height: 100,
								margin: 'auto'
							}}>
							<AgGridReact
								columnDefs={recColumns}
								rowData={course.resources.otherResources}
							/>
						</div>
					</div> :
					<div></div>
				}

			</div>
		</>
	);
};

export default BlogPage;