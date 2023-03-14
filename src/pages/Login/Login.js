import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { NavLink, useHistory, Link, useNavigate } from "react-router-dom";
import {ProjectContext} from '../../Context/index';
const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
});


export const Login = (props) => {
    const navigate = useNavigate();
    const BaseUrl = process.env.REACT_APP_BASE_URL

    // const [isLoggedIn, setIsLoggedIn] = useState(ProjectContext)
    const { isLoggedIn, setIsLoggedIn } = useContext(ProjectContext);
    console.log("isLoggedIn", isLoggedIn);
    console.log(window.sessionStorage.getItem("isLoggedIn"));
    const onSubmit = async (values) => {
        const { username, password } = values;
        const data = { 'username': username, "userpassword": password, userrole: "admin" };
        const response = await axios.post(BaseUrl + "/users/signin", data)

            .then((res) => {
                console.log("res", res)
                if (res.status == 200) {
                    setIsLoggedIn(window.sessionStorage.setItem("isLoggedIn", true))
                    
                  
                    // navigate('/home')
                    window.location = "/home"
                    Swal.fire(
                        {
                            icon: 'success',
                            // title: res?.status,
                            text: res.data.message
                        }
                    )
                    // setTimeout(() =>
                    //     window.location = "/home",
                    //     //  navigate('/home'),
                    //     2000);
                } else {
                    // window.location = "/sign-in";
                    console.log("user not found or invalid credentials");
                    // setShow(true);
                }
            })
        .catch((err) => {
            console.log(err);
            console.log("error", err.response.data.status);
            Swal.fire(
                {
                    icon: 'fail',
                    // title: res?.status,
                    text: err.response.data.message
                }
            )
        });

        formik.resetForm();
    };

    const formik = useFormik({
        initialValues: { username: "", password: "" },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    });

    return (
        <div className="mainContainer">
            <div className="py-5 login-screen">
                <div className="container">
                    <div>
                        <div className="auth-inner mx-auto">
                            <h3 className="login-txt text-center"> Login</h3>
                            <div className="form-group">
                                <label>User name</label>
                                <input
                                    className="form-control"
                                    name="username"
                                    type="text"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="error-msg">
                                    {formik.touched.username && formik.errors.username
                                        ? formik.errors.username
                                        : " "}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="error-msg">
                                    {formik.touched.password && formik.errors.password
                                        ? formik.errors.password
                                        : " "}
                                </div>
                            </div>

                            <div className="">

                                <Button
                                    onClick={formik.handleSubmit}
                                    type="submit"
                                    className=" border-radius-15 px-3"
                                    variant="success"
                                >
                                    Login
                                </Button>{" "}
                                <NavLink className="float-right  nav-link " to="/">
                                    <Button
                                        className=" border-radius-15 px-3"
                                        variant="success"
                                    >
                                        Register
                                    </Button>{" "}
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
