import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap'
import { NavLink, useHistory, Link, useNavigate } from "react-router-dom";
import { ProjectContext } from '../../Context/index';
const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
});


export const Header = (props) => {
    const navigate = useNavigate();
    const user = window.sessionStorage.getItem("isLoggedIn")
    const BaseUrl = process.env.REACT_APP_BASE_URL
    const { isLoggedIn, setIsLoggedIn } = useContext(ProjectContext);
    console.log("user", user);

    const logoutHandler = () => {
       
        Swal.fire(
            {
                icon: 'success',
                // title: res?.status,
                text: "Logout"
            }
        )
        sessionStorage.clear();
        window.location = "/login"
    };
    
    return (
        <div className="mainContainer">
            
            <Navbar bg="light" expand="lg">
                <div className="container">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                       <NavLink className="nav-link " to="/home">Home</NavLink>
                    </Nav>
                 
                </Navbar.Collapse>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {user ? <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">View Profile</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item> */}
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown> :null}
                           
                        </Nav>

                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    );
};
