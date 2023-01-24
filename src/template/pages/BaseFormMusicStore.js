import { Formik, Field, Form } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

import * as Yup from "yup";
import FileInput from "../../shared/components/UIElements/FileInput";
import SizeField from "../components/SizeField";
import SubCategoryField from "../components/SubCategoryField";

const BaseTemplateMusicStore = () => {
  const pageId = useParams().pageId;
  const navigate = useNavigate();
  const FormSchema = Yup.object().shape({
    price: Yup.number().required("Cannot leave blank this field."),
    category: Yup.string().required("Cannot leave blank this field."),
    subCategory: Yup.string().required("Cannot leave blank this field."),
    description: Yup.string()
      .min(3, "Details should contain at least 3 characters.")
      .required("Cannot leave blank this field."),
    adTitle: Yup.string()
      .min(3, "Title should contain at least 3 characters.")
      .required("Cannot leave blank this field."),
    brand: Yup.string().required("Cannot leave blank this field."),
  });

  const submitHandler = async (values) => {
    const formData = new FormData();

    formData.append("price", values.price);

    formData.append("category", values.category);
    formData.append("subCategory", values.subCategory);
    formData.append("description", values.description);

    formData.append("brand", values.brand);

    formData.append("adTitle", values.adTitle);
    formData.append("pageId", pageId);

    for (const image of values.images) {
      formData.append("images", image);
    }

    const token = localStorage.getItem("token");
    console.log("token: ", token);

    await Axios({
      method: "POST",
      url: "http://localhost:8080/api/MS/template",
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

  return (
    <div>
      <Formik
        initialValues={{
          price: "",
          category: "Guitar",
          subCategory: "",
          adTitle: "",
          brand: "",
          description: "",
          images: [],
        }}
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
                    <Field type="radio" name="category" value="Guitar" />
                    <label>Guitar</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="Bass" />
                    <label>Bass</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="Drum" />
                    <label>Drum</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="Key" />
                    <label>Key</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="String" />
                    <label>String</label>
                  </div>
                </div>

                <SubCategoryField />
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

export default BaseTemplateMusicStore;
