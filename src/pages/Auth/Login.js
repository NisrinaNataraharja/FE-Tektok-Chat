import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css'
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { login } from '../../configs/redux/action/user'
import io from 'socket.io-client'
import * as Yup from 'yup';
import { useFormik } from "formik";

const Login = ({setSocket}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!")
        }),
        onSubmit: values => {
            dispatch(login(values))
                .then((res) => {
                    // console.log(res.data.token);
                    const resultSocket = io(process.env.REACT_APP_TEKTOK_API_HEROKU, {
                        query:{
                            token: res.data.token
                        }      
                    })
                    setSocket(resultSocket)
                    Swal.fire({
                        title: "Success!",
                        text: res.data.message,
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#ffba33",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/home");
                        } else {
                            navigate("/home");
                        }
                    });
                })
                .catch((err) => {
                    Swal.fire({
                        title: "Error!",
                        text: err,
                        icon: "error",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#6a4029",
                    });
                });
        }
    });

    return (
        <div className="container">
            <div className={`mx-auto ${styles.auth}`}>
                <h3 className="color-blue text-center mb-4">Login</h3>
                <p>Hi, welcome back!</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-secondary">
                            <small>Email</small>
                        </label>
                        <input
                            type="email"
                            className={`form-control ${styles.inputAuth}`}
                            id="email"
                            placeholder="Enter your email adress"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className="error">{formik.errors.email}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-secondary">
                            <small>Password</small>
                        </label>
                        <input
                            type="password"
                            className={`form-control ${styles.inputAuth}`}
                            id="password"
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className="error">{formik.errors.password}</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                        <Link to="/forgot">Forgot Password</Link>
                    </div>
                    <button
                        type="submit"
                        className="btn bg-blue w-100 text-white p-3 rounded-pill"
                    >
                        Login
                    </button>
                </form>
                <div className="row title-bottom">
                    <div className="col-4">
                        <div className="line" />
                    </div>
                    <div
                        className="col-4 text-secondary text-center"
                        style={{ marginTop: '10px' }}
                    >
                        Login With
                    </div>
                    <div className="col-4">
                        <div className="line" />
                    </div>
                </div>
                <button type="button" className={`btn w-100  p-3 rounded-pill mt-3 ${styles.btnGoogle}`}>
                    Google
                </button>
                <p className="text-center mt-4">
                    Don&apos;t have an account?
                    {' '}
                    <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;