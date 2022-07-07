import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { register } from '../../configs/redux/action/user';
import styles from './auth.module.css'
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { useFormik } from "formik";


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!")
    }),
    onSubmit: values => {
      dispatch(register(values))
        .then((res) => {
          Swal.fire({
            title: "Success!",
            text: res,
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#ffba33",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            } else {
              navigate("/login");
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
            <label htmlFor="name" className="form-label text-secondary">
              <small>Name</small>
            </label>
            <input
              type="text"
              className={`form-control ${styles.inputAuth}`}
              id="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="error">{formik.errors.name}</p>
            )}
          </div>
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
              placeholder="Type your password"
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
            Register
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
            Register With
          </div>
          <div className="col-4">
            <div className="line" />
          </div>
        </div>
        <button type="button" className={`btn w-100  p-3 rounded-pill mt-3 ${styles.btnGoogle}`}>
          Google
        </button>
        <p className="text-center mt-4">
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;