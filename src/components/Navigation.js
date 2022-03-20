import React from "react";
import "../styles/Navigation.css";
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-navigation">
          <div>
            <Navbar bg="dark" variant="light">
              <Nav
                variant="pills" className="flex-column"
              >
                <Nav.Item>
                  <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <NavDropdown title="Dropdown" id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/grades">Grades</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/internships">Internship</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/curriculum">Curriculum</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/courses">Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/sfl">Second Foreign Language</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/payment">Payment</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/appointment">Appointment</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/addresses">Addresses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/info">Info</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/blog">Blog</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/midterms">Midterms</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/finals">Finals</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/makeups">Make-Ups</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar>
            {/* <ul className="navbar-nav ml-auto">
     
      
  
              <li className="nav-item">
                <NavLink className="nav-link" to="/addresses">
                  Adres ve İletişim Bilgileri
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/midterms">
                  Ara Sınavlar
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/info">
                  Bilgilerim
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">
                  Blog Sayfasi
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/makeups">
                  Bütünleme Sınavları
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Giriş / Çıkış
                </NavLink>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
