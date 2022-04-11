
import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../styles/Buttons.css";
import {
  NavDropdown, Nav, Row, Container, Col, Button
} from 'react-bootstrap';


function AdminPage(props) {
    const [keywords, setKeywords] = useState('')
    const [fetchedData, setFetchedData] = useState('')
		const [depData, setDepData] = useState('')
		const [lecturers, setLecturersData] = useState('')
		const [lecturer, setLecData] = useState('Advisor')
		const [depLoading, setDepLoading] = useState(true)
		const [department, setDepartment] = useState('')
		const [depSelected, setDepSelected] = useState(false)
		const [contact, setContact] = useState('')
		const [address, setAddress] = useState('')
		const [id, setId] = useState('')
		const [email, setEmail] = useState('')
		const scholars = [100,75,50,25,0]
		const [scholarShip, setScholarShip] = useState(scholars[0])
		// const [submit, setSubmit] = useState(null)
		
		let submit = {
			contact : [],
			address : [],
			id : 0,
			scholarShip : 0,
			department: "", 
			email: "",
			advisor : ""
		}

		useEffect(() => {
			axios
				.get(
					"http://localhost:1337/departments"
				)
				.then((response) => {
					setDepData(response.data)
					setDepartment(response.data[0].department);
					setDepLoading(false);
				})
				.catch((error) => {
					console.log(error);
					// localStorage.removeItem("loginData");
				});
		}, []
		);
		
	

		const handleScholar = ((e) => {
			setScholarShip(scholars[e.target.attributes.value.value]);
		});
	

		const handleDepartment = ((e) => {

			setDepartment(depData[e.target.attributes.value.value].department);
			axios
				.get(
					"http://192.168.0.11:3000/lecturer/" + depData[e.target.attributes.value.value].department
				)
				.then((response) => {
					 setLecturersData(response.data)
					 setLecData(response.data[0])
				})
				.catch((error) => {
					console.log(error);
					// localStorage.removeItem("loginData");
				});
		});

		const handleLecturers = ((e) => {

			setLecData(lecturers[e.target.attributes.value.value]);
		});

		const handleContact = ((event) => {
			submit.contact = event.target.value;
		});
		const handleAddress = ((event) => { //
		
			submit.address = event.target.value;
		});
		const handleID = ((event) => { //
			submit.id = (event.target.value);
		});
		const handleEmail = ((event) => {
			submit.email = (event.target.value);
		
		})

		const handleSubmit = (() => {
			submit.scholarShip = scholarShip;
			submit.department = department;
			submit.advisor = lecturer;
			axios
				.post(
					"http://192.168.0.11:3000/ahmed", {submit,
					headers: {
						'content-type': 'text/json',
						'Access-Control-Allow-Origin': '*'
					}
					}
				)
				.then((response) => {
					console.log(response.data)
				})
				.catch((error) => {
					console.log(error);
					// localStorage.removeItem("loginData");
				});
		});


			

		if (depLoading) {
			return <div>Loading...</div>;
		}

    return (
        <>
        
        <div>
      <form>
        <label>
          Iletisim:
          <textarea value0={contact} onChange={handleContact} />
        </label>
				<label>
          Adresler:
          <textarea value1={address} onChange={handleAddress} />
        </label>
				<label>
          Ogrenci No:
          <textarea value2={id} onChange={handleID} />
        </label>
				<label>
          E-mail:
          <textarea value3={email} onChange={handleEmail} />
        </label>
				<NavDropdown className="button button-1" title={scholarShip} >
							
									<NavDropdown.Item className="button button-1" onClick={handleScholar} key={0} value={0}>
										100
									</NavDropdown.Item>
									<NavDropdown.Item className="button button-1" onClick={handleScholar} key={1} value={1}>
										75
									</NavDropdown.Item>
									<NavDropdown.Item className="button button-1" onClick={handleScholar} key={2} value={2}>
										50
									</NavDropdown.Item>
									<NavDropdown.Item className="button button-1" onClick={handleScholar} key={3} value={3}>
										25
									</NavDropdown.Item>
									<NavDropdown.Item className="button button-1" onClick={handleScholar} key={4} value={4}>
										0
									</NavDropdown.Item>
								
						</NavDropdown>
					<NavDropdown className="button button-1" title={department} >
							{!!depData && depData.map((dep, index) =>
								<div>
									<NavDropdown.Item className="button button-1" onClick={handleDepartment} key={index} value={index}>
										{dep.department}
									</NavDropdown.Item>
								</div>
							)}
						</NavDropdown>
						{!!lecturers ? (
						<NavDropdown className="button button-1" title={lecturer} >
							 {lecturers.map((lec, index) =>
							 
								<div>
									<NavDropdown.Item className="button button-1" onClick={handleLecturers} key={index} value={index}>
										{lec}
									</NavDropdown.Item>
								</div>
							)}
						</NavDropdown>): (<></>)}

		<Button onClick={handleSubmit} className="button button-3">Gonder</Button>
						</form>
        </div>
        </>
    )
}

export default AdminPage;