import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";

import SizeField from "../components/SizeField";
import FileInput from "../../shared/components/UIElements/FileInput";

import "./Template.css";

const UpdateSellClothes = () => {
  const pageId = useParams().pageId;
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({});
  const { templateId } = useParams();

  const getTemplateById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/SC/template/templates/${templateId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("Respond from the request templateID -->", res);
        setInitialValues(res.data.template);
        setInitialValues((prevState) => ({
          ...prevState,
          color: res.data.template.color.split(","),
        }));
        console.log("Res.data.templatesID -->", res.data.template);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Loaded templateID --> ", initialValues);
  };

  useEffect(() => {
    getTemplateById();
  }, []);

  const submitHandler = async (values) => {
    const formData = new FormData();

    // only append the fields that have changed
    if (values.price !== initialValues.price) {
      formData.append("price", values.price);
    }
    if (values.category !== initialValues.category) {
      formData.append("category", values.category);
    }
    if (values.adTitle !== initialValues.adTitle) {
      formData.append("adTitle", values.adTitle);
    }

    if (values.size !== initialValues.size) {
      formData.append("size", values.size);
    }

    if (values.color !== initialValues.color) {
      formData.append("color", values.color);
    }

    if (values.details !== initialValues.details) {
      formData.append("details", values.details);
    }

    if (values.material !== initialValues.material) {
      formData.append("material", values.material);
    }

    if (values.brand !== initialValues.brand) {
      formData.append("brand", values.brand);
    }

    if (values.images !== initialValues.images) {
      for (const image of values.images) {
        formData.append("images", image);
      }
    }

    const token = localStorage.getItem("token");
    console.log("token: ", token);

    await axios({
      method: "PATCH",
      url: `http://localhost:8080/api/SC/template/${templateId}`,
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

    console.log(values);

    setTimeout(() => {
      navigate(`/pages/${pageId}`);
    }, 1000);
  };

  if (!Object.keys(initialValues).length) {
    return <p>Loading...</p>;
  }

  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "brown",
    "grey",
    "black",
    "white",
  ];

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="base-form-real-estate__main">
              <div className="base-form-real-estate__category">
                <h1>Category</h1>

                <div className="base-form-real-estate__field gray">
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="Clothes" />
                    <label>Clothes</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="Shoes" />
                    <label>Shoes</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="Accessories" />
                    <label>Accessories</label>
                  </div>
                </div>

                <SizeField />
              </div>

              <div className="base-form-real-estate__category">
                <h1>Informations</h1>

                <div className="base-form-real-estate__field gray">
                  <div className="base-form-real-estate__header">
                    <h2>Title</h2>
                  </div>

                  <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="adTitle"
                      className="base-form-real-estate__text"
                    />
                    {errors.adTitle && touched.adTitle ? (
                      <div className="error--form">{errors.adTitle}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field white">
                  <div className="base-form-real-estate__header">
                    <h2>Details</h2>
                  </div>

                  <div className="base-form-real-estate__input">
                    <Field
                      className="base-form-real-estate__textarea"
                      component="textarea"
                      name="details"
                    />
                    {errors.details && touched.details ? (
                      <div className="error--form">{errors.details}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field gray">
                  <div className="base-form-real-estate__header">
                    <h2>Price</h2>
                  </div>

                  <div className="base-form-real-estate__input">
                    <Field
                      type="number"
                      name="price"
                      className="base-form-real-estate__small-text"
                    />
                    {errors.price && touched.price ? (
                      <div className="error--form">{errors.price}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field white">
                  <div className="base-form-real-estate__header">
                    <h2>Brand</h2>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="brand"
                      className="base-form-real-estate__text"
                    />
                    {errors.brand && touched.brand ? (
                      <div className="error--form">{errors.brand}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field gray">
                  <div className="base-form-real-estate__header">
                    <h2>Color</h2>
                  </div>

                  <div>
                    {colors.map((color, index) => (
                      <>
                        <Field
                          key={index}
                          type="checkbox"
                          name="color"
                          value={color}
                        />
                        <span className={`dot ${color}`}></span>
                      </>
                    ))}
                  </div>
                </div>

                <div className="base-form-real-estate__field white">
                  <div className="base-form-real-estate__header">
                    <h2>Material</h2>
                  </div>

                  <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="material"
                      className="base-form-real-estate__text"
                    />
                    {errors.material && touched.material ? (
                      <div className="error--form">{errors.material}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field gray">
                  <div className="base-form-real-estate__header">
                    <h2>Upload photos </h2>
                  </div>

                  <div className="base-form-real-estate__input">
                    <FileInput
                      name="images"
                      multiple
                      type="file"
                      value={undefined}
                    />
                  </div>
                </div>
                <div className="base-form-real-estate__button" type="submit">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateSellClothes;
