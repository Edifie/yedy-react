import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import "./Auth.css";
import login from "./login.png";

const Login = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(6, "Password should contain minimum 6 characters.")
      .required("Password required."),
  });

  const handleSubmit = async (values) => {
    await Axios({
      method: "POST",
      url: "http://localhost:8080/api/users/login",
      data: values,
    })
      .then((res) => {
        console.log(res);
        alert("Succesffuly logged in!");
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(values);
  };

  // after submitting the form redirect to /users
  const navigate = useNavigate();
  const RedirecToHome = () => {
    setTimeout(() => {
      navigate("/users");
    }, 2000);
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <div className="grid-container__auth">
            <div className="grid-left__auth" id="login">
              <img src={login} alt="register" />
            </div>

            <div className="grid-right__auth ">
              <br />

              <Form className="form__auth">
                <h1>Log in to your account</h1>

                <div className="field--margin">
                  <Field
                    className="input__auth"
                    type="email"
                    name="email"
                    placeholder="Please enter your email"
                  />

                  {errors.email && touched.email ? (
                    <div className="error--form">{errors.email}</div>
                  ) : null}
                </div>


                <div className="field--margin">
                <Field
                  className="input__auth input-field"
                  type="password"
                  name="password"
                  placeholder="Please enter your password"
                />
                {errors.password && touched.password ? (
                  <div className="error--form">{errors.password}</div>
                ) : null}
                </div>

                <button
                  onClick={RedirecToHome}
                  className="btn--auth"
                  id="register"
                  type="submit"
                >
                  Login
                </button>
              </Form>

              <div className="login-user">
                <hr />
                <p>Don't have an account?</p>
                <Link id="create-href" to="/register">
                  Register here
                </Link>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;