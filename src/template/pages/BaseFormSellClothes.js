import { Formik, Field, Form } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

import * as Yup from "yup";
import FileInput from "../../shared/components/UIElements/FileInput";
import SizeField from "../components/SizeField";

const BaseTemplateSellClothes = () => {
  const pageId = useParams().pageId;
  const navigate = useNavigate();
  const FormSchema = Yup.object().shape({
    price: Yup.number().required("Cannot leave blank this field."),
    size: Yup.string().required("Cannot leave blank this field."),
    category: Yup.string().required("Cannot leave blank this field."),
    details: Yup.string()
      .min(3, "Details should contain at least 3 characters.")
      .required("Cannot leave blank this field."),
    material: Yup.string()
      .min(3, "Material should contain at least 3 characters.")
      .required("Cannot leave blank this field."),
    adTitle: Yup.string()
      .min(3, "Title should contain at least 3 characters.")
      .required("Cannot leave blank this field."),
  });

  const submitHandler = async (values) => {
    const formData = new FormData();

    formData.append("price", values.price);

    formData.append("category", values.category);
    formData.append("size", values.size);
    formData.append("color", values.color);
    formData.append("details", values.details);
    formData.append("material", values.material);
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
      url: "http://localhost:8080/api/SC/template",
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
          category: "Clothes",
          size: "",
          color: "",
          details: "",
          material: "",
          adTitle: "",
          brand: "",
          images: [],
        }}
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
                    <Field type="checkbox" name="color" value="red" />
                    <span className="dot red"></span>

                    <Field type="checkbox" name="color" value="orange" />
                    <span className="dot orange"></span>

                    <Field type="checkbox" name="color" value="yellow" />
                    <span className="dot yellow"></span>

                    <Field type="checkbox" name="color" value="green" />
                    <span className="dot green"></span>

                    <Field type="checkbox" name="color" value="blue" />
                    <span className="dot blue"></span>

                    <Field type="checkbox" name="color" value="purple" />
                    <span className="dot purple"></span>

                    <Field type="checkbox" name="color" value="pink" />
                    <span className="dot pink"></span>

                    <Field type="checkbox" name="color" value="brown" />
                    <span className="dot brown"></span>

                    <Field type="checkbox" name="color" value="grey" />
                    <span className="dot grey"></span>

                    <Field type="checkbox" name="color" value="black" />
                    <span className="dot black"></span>

                    <Field type="checkbox" name="color" value="white" />
                    <span className="dot white"></span>
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

export default BaseTemplateSellClothes;
