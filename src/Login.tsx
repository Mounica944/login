import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
const Login = () => (
  <Formik
    initialValues={{ username: "", password: "" }}
    // on submit api call trigger
    onSubmit={(values) => {
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((data) => data.json());
    }}

    //setting the
    validationSchema={Yup.object().shape({
      username: Yup.string().required("Username is Required."),
      password: Yup.string()
        .required("Password is required.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
    })}
  >
    {/* props */}
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      return (
        <div className="App">
          <div className="container">
            <h1 className="title"> Sign in </h1>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username && touched.username ? "error" : ""}
                />
                {errors.username && touched.username && (
                  <div className="input-feedback">{errors.username}</div>
                )}
              </div>
              <div className="row">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "error" : ""}
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </div>
              <div className="remember">
                <input type="checkbox" /> Remember me?
              </div>
              <button>SIGN IN</button>
            </form>
            <div className="actions">
              <div>
                <a>forgot your password?</a>
              </div>
              <div>
                don't have account? <a>Sign up</a>{" "}
              </div>
              <div>
                <a>Resend Email confirmation</a>
              </div>
            </div>
          </div>
        </div>
      );
    }}
  </Formik>
);

export default Login;
