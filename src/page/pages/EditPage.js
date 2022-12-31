import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import area from "./area.jpg";
import responsive from "./responsive.jpg";
import tema from "./tema.jpg";
import name from "./name.jpg";
import url from "./url.jpg";

import "./NewPage.css";


const EditPage = () => {
  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Company name should be at least two characters.")
      .max(50, "Company name cannot pass to 50 characters.")
      .required("Cannot leave blank this field."),
    url: Yup.string()
      .min(2, "URL should be at least two characters.")
      .max(20, "URL name cannot pass to 20 characters.")
      .required("Cannot leave blank this field."),
  });

  const [initialValues, setInitialValues] = useState({});

  const {pageId} = useParams();

  const token = localStorage.getItem("token");
  console.log(token);

  const submitHandler = async (values) => {
    await Axios({
      method: "PATCH",
      url: `http://localhost:8080/api/pages/${pageId}`,
      data: values,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(values);
  };

  const getPageById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/pages/${pageId}`,
      header: "Content Type: application/json",
    })
      .then((res) => {
        console.log(res);
        setInitialValues(res.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("initial values from EditPage -> ",initialValues)

  useEffect(() => {
    getPageById();
  }, []);

  let userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const redirectToUsersPage = () => {
    setTimeout(() => {
      navigate(`/profile/${userId}`);
    }, 2000);
  };

  if (!Object.keys(initialValues).length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="overall--form">
              {/* AREA */}
              <div className="wrapper">
                <div className="box item1">
                  <label>1. What kind of website are you creating?</label>
                  <hr />
                </div>

                <div className="box item2">
                  <div className="radio">
                    <label>
                      <Field
                        type="radio"
                        name="area"
                        value="Real Estate"
                        checked={true}
                      />
                      Real Estate
                    </label>
                  </div>

                  <div className="radio">
                    <label>
                      <Field type="radio" name="area" value="Hardware Store" />
                      Hardware Store
                    </label>
                  </div>

                  <div className="radio">
                    <label>
                      <Field type="radio" name="area" value="Sell Clothes" />{" "}
                      Sell Clothes
                    </label>
                  </div>
                </div>

                <div className="box item3">
                  <img src={area} alt="tema" />
                </div>
              </div>
            </div>

            {/* TEMA */}
            <div className="wrapper">
              <div className="box item1">
                <label>2. What is your tema of choice?</label>
                <hr />
              </div>

              <div className="box item2">
                <div className="radio">
                  <label>
                    <Field
                      checked={true}
                      type="radio"
                      name="tema"
                      value="Boho"
                    />{" "}
                    Boho
                  </label>
                </div>

                <div className="radio">
                  <label>
                    <Field type="radio" name="tema" value="Minimalist" />{" "}
                    Minimalist
                  </label>
                </div>

                <div className="radio">
                  <label>
                    <Field type="radio" name="tema" value="Basic" /> Basic
                  </label>
                </div>
              </div>

              <div className="box item3">
                <img src={responsive} alt="responsive" />
              </div>
            </div>

            {/* NAME */}

            <div className="wrapper">
              <div className="box item1">
                <label htmlFor="Name">3. Give a name to your company</label>
                <hr />
              </div>

              <div className="box item2">
                <div className="textarea--form">
                  <Field
                    id="name"
                    name="name"
                    className="text--form"
                    placeholder="Enter your company name"
                  />
                  {errors.name && touched.name ? (
                    <div className="error--form">{errors.name}</div>
                  ) : null}
                </div>

                <div className="textarea--form hidden">
                  <Field
                    id="creator"
                    value={userId}
                    onChange={setFieldValue}
                    className="text--form"
                    name="creator"
                    placeholder="Creator"
                  />
                </div>
              </div>

              <div className="box item3 page-name__img">
                <img src={name} alt="name" />
              </div>
            </div>

            {/* URL */}

            <div className="wrapper">
              <div className="box item1">
                <label htmlFor="URL">
                  4. Give customised URL to your company
                </label>
                <hr />
              </div>

              <div className="box item2">
                <div className="textarea--form">
                  <Field
                    id="url"
                    name="url"
                    className="text--form"
                    placeholder="Enter your customised URL"
                  />
                  {errors.url && touched.url ? (
                    <div className="error--form">{errors.url}</div>
                  ) : null}
                </div>
              </div>

              <div className="box item3">
                <img src={url} alt="url" />
              </div>
            </div>

            <div className="wrapper">
              <div className="box item4">
                <button
                  onClick={redirectToUsersPage}
                  className="btn--form"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPage;
