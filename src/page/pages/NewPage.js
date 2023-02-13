import React from "react";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import area from "./area.jpg";
import responsive from "./responsive.jpg";

import name from "./name.jpg";
import url from "./url.jpg";

import "./NewPage.css";
import { useNavigate } from "react-router-dom";

const NewPage = () => {
  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Company name should be at least two characters.")
      .max(50, "Company name cannot pass to 50 characters.")
      .required("Cannot leave blank this field."),
    url: Yup.string()
      .min(2, "URL should be at least two characters.")
      .max(35, "URL name cannot pass to 35 characters.")
      .required("Cannot leave blank this field."),
    area: Yup.string().required("This field is required"),
  });

  const token = localStorage.getItem("token");
  console.log(token);

  const submitHandler = async (values) => {
    await Axios({
      method: "POST",
      url: "http://localhost:8080/api/pages/",
      data: values,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res);

        setTimeout(async () => {
          navigate(`/pages/${res.data.pageId}/aditional-section`);
        }, 2000);

        // setPageId(res.data.pageId);
        // console.log("res.data.pageId", res.data.pageId);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  let userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  // const redirectToUsersPage = () => {
  //   setTimeout(async () => {
  //     navigate(`pages/${pageId}/aditional-section`);
  //   }, 2000);
  // };

  return (
    <div>
      <Formik
        initialValues={{
          area: "",
          name: "",
          tema: "Boho",
          url: "",
          creator: userId,
        }}
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
                    <div className="textarea--form">
                      <Field as="select" name="area">
                        <option
                          value=""
                          disabled
                          label="Select an area"
                        ></option>
                        <option value="Book Store">Book Store</option>
                        <option value="Jewellery Store">Jewellery Store</option>
                        <option value="Music Store">Music Store</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Sell Clothes">Sell Clothes</option>
                      </Field>
                      {errors.area && touched.area ? (
                        <div className="error--form">{errors.area}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* <div className="box item2">
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
                      <Field type="radio" name="area" value="Music Store" />
                      Music Store
                    </label>
                  </div>

                  <div className="radio">
                    <label>
                      <Field type="radio" name="area" value="Sell Clothes" />{" "}
                      Sell Clothes
                    </label>
                  </div>

                  <div className="radio">
                    <label>
                      <Field type="radio" name="area" value="Book Store" />{" "}
                      Book Store
                    </label>
                  </div>
                </div>
                 */}

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
                    <Field type="radio" name="tema" value="Autumnal" /> Autumnal
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
                  // onClick={redirectToUsersPage}
                  className="btn--form"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPage;
