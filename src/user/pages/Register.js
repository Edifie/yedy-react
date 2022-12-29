import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import "./Auth.css";
import register from "./register.png";

const Signup = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(6, "Password should contain minimum 6 characters.")
      .required("Password required."),
    name: Yup.string().required("Name required."),
  });

  const handleSubmit = async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await Axios(
      {
        method: "POST",
        url: "http://localhost:8080/api/users/signup",
        data: values,
      },
      config
    )
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        console.log("userID --> ", res.data.userId);
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(values);
    console.log(config);
    console.log(localStorage.getItem("token"));
  };

  // after submitting the form redirect to user's page
  const navigate = useNavigate();
  const userPagesUrl = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <div className="grid-container__auth">
            <div className="grid-left__auth" id="login">
              <img src={register} alt="register" />
            </div>

            <div className="grid-right__auth ">
              <br />

              <Form className="form__auth">
                <h1>Create your account</h1>

                <div className="field--margin">
                  <Field
                    className="input__auth"
                    type="text"
                    name="name"
                    placeholder="Full name"
                  />

                  {errors.name && touched.name ? (
                    <div className="error--form">{errors.name}</div>
                  ) : null}
                </div>

                <div className="field--margin">
                  <Field
                    className="input__auth"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />

                  {errors.email && touched.email ? (
                    <div className="error--form">{errors.email}</div>
                  ) : null}
                </div>

                <div className="field--margin">
                  <Field
                    className="input__auth"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? (
                    <div className="error--form">{errors.password}</div>
                  ) : null}
                </div>

                <div className="field--margin">
                  <button
                    onClick={userPagesUrl}
                    className="btn--auth"
                    id="register"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </Form>

              <div className="field--margin">
                <div className="login-user">
                  <hr />
                  <p>Have an account?</p>
                  <Link id="create-href" to="/login">
                    Login here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
