import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";

import area from "./area.jpg";
import responsive from "./responsive.jpg";
import tema from "./tema.jpg";
import name from "./name.jpg";

import "./NewPage.css";

const NewPage = () => {
  const submitHandler = (values) => {
    axios({
      method: "POST",
      url: "http://localhost:8080/api/pages/",
      data: values,
    })
      .then((res) => {
        console.log(res);
        alert("Succesffuly created the form!");
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={{
          area: "",
          name: "",
          type: "",
          tema: "",
          creator: "",
        }}
        onSubmit={(values) => submitHandler(values)}
      >
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
                    <Field type="radio" name="area" value="Sell Clothes" /> Sell
                    Clothes
                  </label>
                </div>
              </div>

              <div className="box item3">
                <img src={area} alt="tema" />
              </div>
            </div>
          </div>

          {/* TYPE */}
          <div className="wrapper">
            <div className="box item1">
              <label> 2. What type of website of your choice?</label>
              <hr />
            </div>

            <div className="box item2">
              <div className="radio">
                <label>
                  <Field type="radio" name="type" value="Basic" /> Basic
                </label>
              </div>

              <div className="radio">
                <label>
                  <Field type="radio" name="type" value="Responsive" />{" "}
                  Responsive
                </label>
              </div>
            </div>

            <div className="box item3">
              <img src={tema} alt="tema" />
            </div>
          </div>

          {/* TEMA */}
          <div className="wrapper">
            <div className="box item1">
              <label>3. What is your tema of choice?</label>
              <hr />
            </div>

            <div className="box item2">
              <div className="radio">
                <label>
                  <Field type="radio" name="tema" value="Boho" /> Boho
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
              <label htmlFor="Name">4. Give a name to your company</label>
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
              </div>

              <div className="textarea--form">
                <Field
                  id="creator"
                  className="text--form"
                  name="creator"
                  placeholder="Creator"
                />
              </div>
            </div>

            <div className="box item3">
              <img src={name} alt="name" />
            </div>

          </div>

          <div className="wrapper">
            <div className="box item4">
              <button className="btn--form" type="submit">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewPage;
