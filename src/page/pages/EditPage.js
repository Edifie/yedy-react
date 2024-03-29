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
import images from "./images.jpg";

import "./NewPage.css";
import FileInput from "../../shared/components/UIElements/FileInput";

const EditPage = () => {
  // const FormSchema = Yup.object().shape({
  //   name: Yup.string()
  //     .min(2, "Company name should be at least two characters.")
  //     .max(50, "Company name cannot pass to 50 characters.")
  //     .required("Cannot leave blank this field."),
  //   url: Yup.string()
  //     .min(2, "URL should be at least two characters.")
  //     .max(20, "URL name cannot pass to 20 characters.")
  //     .required("Cannot leave blank this field."),
  // });

  const [initialValues, setInitialValues] = useState({});
  const { pageId } = useParams();

  let userId = localStorage.getItem("userId");

  const token = localStorage.getItem("token");
  console.log(token);

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

  useEffect(() => {
    getPageById();
  }, []);

  const submitHandler = async (values) => {
    const formData = new FormData();

    if (values.name !== initialValues.name) {
      formData.append("name", values.name);
    }

    if (values.tema !== initialValues.tema) {
      formData.append("tema", values.tema);
    }

    if (values.area !== initialValues.area) {
      formData.append("area", values.area);
    }

    if (values.url !== initialValues.url) {
      formData.append("url", values.url);
    }

    if (values.images !== initialValues.images) {
      for (const image of values.images) {
        formData.append("images", image);
      }
    }

    await Axios({
      method: "PATCH",
      url: `http://localhost:8080/api/pages/${pageId}`,
      data: formData,
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

  const navigate = useNavigate();
  const navigateToPage = () => {
    setTimeout(() => {
      navigate(`/pages/${pageId}`);
    }, 1000);
  };

  if (!Object.keys(initialValues).length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="overall--form">
              {/* TEMA */}
              <div className="wrapper">
                <div className="box item1">
                  <label>1. Tema</label>
                  <hr />
                </div>

                <div className="box item2">
                  <div className="radio">
                    <label>
                      <Field type="radio" name="tema" value="Boho" /> Boho
                    </label>
                    <span className="dotPage dark-green"></span>
                    <span className="dotPage middle-green"></span>
                    <span className="dotPage light-green"></span>
                  </div>

                  <div className="radio">
                    <label>
                      <Field type="radio" name="tema" value="Minimalist" />{" "}
                      Minimalist
                    </label>
                    <span className="dotPage dark-black"></span>
                    <span className="dotPage middle-black"></span>
                    <span className="dotPage light-black"></span>
                  </div>

                  <div className="radio">
                    <label>
                      <Field type="radio" name="tema" value="Autumnal" />
                      Autumnal
                    </label>
                    <span className="dotPage dark-blue"></span>
                    <span className="dotPage middle-orange"></span>
                    <span className="dotPage light-orange"></span>
                  </div>
                </div>

                <div className="box item3">
                  <img src={responsive} alt="responsive" />
                </div>
              </div>

              {/* NAME */}

              <div className="wrapper">
                <div className="box item1">
                  <label htmlFor="Name">2. Name of company</label>
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
                  <label htmlFor="URL">3. Customised URL</label>
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
                <div className="box item1">
                  <label htmlFor="URL">4. Upload photo of your business</label>
                  <hr />
                </div>

                <div className="box item2">
                  <div className="textarea--form">
                    <FileInput name="images" type="file" value={undefined} />
                  </div>
                </div>

                <div className="box item3 images">
                  <img src={images} alt="images" />
                </div>
              </div>

              <div className="wrapper">
                <div className="box item4">
                  <button
                    onClick={navigateToPage}
                    className="btn--form"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPage;
