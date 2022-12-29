import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import "./Auth.css";
import register from "./register.png";
import axios from "axios";
import FileInput from "../../shared/components/UIElements/FileInput";

const ProfileEdit = () => {
  const [initialValues, setInitialValues] = useState({});

  const userId = localStorage.getItem("userId");
  console.log("userID from Profile Edit ->", userId);

  const navigate = useNavigate();

  const getUserDetails = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/users/${userId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("Respond from the request getUserDetails -->", res);
        setInitialValues(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Loaded UserDetails --> ", initialValues);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(6, "Password should contain minimum 6 characters.")
      .required("Password required."),
    name: Yup.string().required("Name required."),
  });

  const submitHandler = async (values) => {
    const formData = new FormData();

    if (values.email !== initialValues.email) {
      formData.append("email", values.email);
    }

    if (values.password !== initialValues.password) {
      formData.append("password", values.password);
    }

    if (values.name !== initialValues.name) {
      formData.append("name", values.name);
    }

    if (values.images !== initialValues.images) {
      for (const image of values.images) {
        formData.append("images", image);
      }
    }

    await Axios({
      method: "PATCH",
      url: `http://localhost:8080/api/users/${userId}/profile-picture`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
    setTimeout(() => {
      navigate(`/profile/${userId}`);
    }, 1000);
  };

  if (!Object.keys(initialValues).length) {
    return <p>Loading...</p>;
  }

  // after submitting the form redirect to user's page

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, touched }) => (
          <div className="grid-container__auth-edit">
            {/* <div className="grid-left__auth" id="login">
              <img src={register} alt="register" />
            </div> */}

            <div className="grid-right__auth-edit ">
              <br />

              <div className="form__auth-flex">
                <Form className="form__auth-edit">
                  <h1>Edit your account</h1>

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

                  <label>Upload photos</label>
                  <FileInput name="images" type="file" value={undefined} />

                  <div className="field--margin">
                    <button className="btn--auth" id="register" type="submit">
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ProfileEdit;
