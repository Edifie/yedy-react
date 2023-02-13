import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import FileInput from "../../shared/components/UIElements/FileInput";

import "./Template.css";

const UpdateJewelleryStore = () => {
  const pageId = useParams().pageId;
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({});

  const { templateId } = useParams();

  const FormSchema = Yup.object().shape({
    price: Yup.number().required("Cannot leave blank this field."),
    category: Yup.string().required("Cannot leave blank this field."),
    description: Yup.string()
      .min(3, "Details should contain at least 3 characters.")
      .required("Cannot leave blank this field."),
    adTitle: Yup.string()
      .min(3, "Title should contain at least 3 characters.")
      .required("Cannot leave blank this field."),
  });

  const getTemplateById = async () => {
    await Axios({
      method: "GET",
      url: `http://localhost:8080/api/JS/template/templates/${templateId}`,
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

    if (values.price !== initialValues.price) {
      formData.append("price", values.price);
    }
    if (values.category !== initialValues.category) {
      formData.append("category", values.category);
    }
    if (values.description !== initialValues.description) {
      formData.append("description", values.description);
    }
    if (values.gems !== initialValues.gems) {
      formData.append("gems", values.gems);
    }
    if (values.color !== initialValues.color) {
      formData.append("color", values.color);
    }
    if (values.brand !== initialValues.brand) {
      formData.append("brand", values.brand);
    }
    if (values.metal !== initialValues.metal) {
      formData.append("metal", values.metal);
    }
    if (values.adTitle !== initialValues.adTitle) {
      formData.append("adTitle", values.adTitle);
    }

    if (values.images !== initialValues.images) {
      for (const image of values.images) {
        formData.append("images", image);
      }
    }

    const token = localStorage.getItem("token");
    console.log("token: ", token);

    await Axios({
      method: "PATCH",
      url: `http://localhost:8080/api/JS/template/${templateId}`,
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
    navigate(`/pages/${pageId}`);
  };

  // wait to get data
  if (!Object.keys(initialValues).length) {
    return <p>Loading...</p>;
  }

  const colors = ["silver", "gold", "rosegold"];
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitHandler(values)}
        validationSchema={FormSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="base-form-real-estate__main">
              <div className="base-form-real-estate__category">
                <h1>Category</h1>

                <div className="base-form-real-estate__field gray">
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="bracelets" />
                    <label>Bracelets</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="earings" />
                    <label>Earings</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="necklace" />
                    <label>Necklace</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="rings" />
                    <label>Rings</label>
                  </div>
                </div>
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
                    <h2>Description</h2>
                  </div>

                  <div className="base-form-real-estate__input">
                    <Field
                      className="base-form-real-estate__textarea"
                      component="textarea"
                      name="description"
                    />
                    {errors.description && touched.description ? (
                      <div className="error--form">{errors.description}</div>
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

                <div className="base-form-real-estate__field gray">
                  <div className="base-form-real-estate__header">
                    <h2>Brand</h2>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="brand"
                      className="base-form-real-estate__small-text"
                    />
                    {errors.brand && touched.brand ? (
                      <div className="error--form">{errors.brand}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field white">
                  <div className="base-form-real-estate__header">
                    <h2>Metal</h2>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="radio"
                      name="metal"
                      value="925 sterling silver"
                    />
                    <label>925 Sterling Silver</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="metal" value="14k gold" />
                    <label>14k Gold</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="metal" value="14k gold plated" />
                    <label>14k Gold Plated</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="radio"
                      name="metal"
                      value="14k rose gold plated"
                    />
                    <label>14k Rose Gold Plated</label>
                  </div>

                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="metal" value="stony" />
                    <label>Stony</label>
                  </div>

                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="metal" value="mine" />
                    <label>Mine</label>
                  </div>

                  {/* <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="metal"
                      className="base-form-real-estate__text"
                    />
                    {errors.metal && touched.metal ? (
                      <div className="error--form">{errors.metal}</div>
                    ) : null}
                  </div> */}
                </div>

                <div className="base-form-real-estate__field gray">
                  <div className="base-form-real-estate__header">
                    <h2>Gems</h2>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="gems"
                      className="base-form-real-estate__text"
                    />
                    {errors.gems && touched.gems ? (
                      <div className="error--form">{errors.gems}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field white">
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
                  {/* <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="color"
                      className="base-form-real-estate__small-text"
                    />
                    {errors.color && touched.color ? (
                      <div className="error--form">{errors.color}</div>
                    ) : null}
                  </div> */}
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

export default UpdateJewelleryStore;
