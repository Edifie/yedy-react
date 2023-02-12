import { Formik, Field, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

import FileInput from "../../shared/components/UIElements/FileInput";
import SubCategoryFieldBook from "../components/SubCategoryFieldBook";

const BaseFormBookStore = () => {
  const pageId = useParams().pageId;
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({});
  const { templateId } = useParams();

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
    writer: Yup.string().required("Cannot leave blank this field."),
    language: Yup.string().required("Cannot leave blank this field."),
    publisher: Yup.string().required("Cannot leave blank this field."),
    numberOfPage: Yup.number()
      .integer()
      .positive()
      .required("Cannot leave blank this field."),
    printYear: Yup.number()
      .integer()
      .positive()
      .moreThan(1899, "Publish year must be greater than 1899")
      .lessThan(2024, "Publish year must be less than 2024"),
  });

  const getTemplateById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/BS/template/templates/${templateId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("Respond from the request templateID -->", res);
        setInitialValues(res.data.template);
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
    if (values.subCategory !== initialValues.subCategory) {
      formData.append("subCategory", values.subCategory);
    }
    if (values.description !== initialValues.description) {
      formData.append("description", values.description);
    }

    if (values.writer !== initialValues.writer) {
      formData.append("writer", values.writer);
    }

    if (values.language !== initialValues.language) {
      formData.append("language", values.language);
    }

    if (values.publisher !== initialValues.publisher) {
      formData.append("publisher", values.publisher);
    }

    if (values.numberOfPage !== initialValues.numberOfPage) {
      formData.append("numberOfPage", values.numberOfPage);
    }

    if (values.printYear !== initialValues.printYear) {
      formData.append("printYear", values.printYear);
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
      url: `http://localhost:8080/api/BS/template/${templateId}`,
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

  if (!Object.keys(initialValues).length) {
    return <p>Loading...</p>;
  }

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
                    <Field type="radio" name="category" value="Book" />
                    <label>Book</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="radio"
                      name="category"
                      value="Course / Exam Books"
                    />
                    <label>Course / Exam Books</label>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field type="radio" name="category" value="Magazine" />
                    <label>Magazine</label>
                  </div>
                </div>

                <SubCategoryFieldBook />
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
                    <h2>Author</h2>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="writer"
                      className="base-form-real-estate__text"
                    />
                    {errors.writer && touched.writer ? (
                      <div className="error--form">{errors.writer}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field white">
                  <div className="base-form-real-estate__header">
                    <h2>Publisher</h2>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="publisher"
                      className="base-form-real-estate__text"
                    />
                    {errors.publisher && touched.publisher ? (
                      <div className="error--form">{errors.publisher}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field white">
                  <div className="base-form-real-estate__header">
                    <h2>Language</h2>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="text"
                      name="language"
                      className="base-form-real-estate__text"
                    />
                    {errors.language && touched.language ? (
                      <div className="error--form">{errors.language}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field white">
                  <div className="base-form-real-estate__header">
                    <h2>Publish Year</h2>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="number"
                      name="printYear"
                      className="base-form-real-estate__text"
                    />
                    {errors.printYear && touched.printYear ? (
                      <div className="error--form">{errors.printYear}</div>
                    ) : null}
                  </div>
                </div>

                <div className="base-form-real-estate__field white">
                  <div className="base-form-real-estate__header">
                    <h2>Number of pages</h2>
                  </div>
                  <div className="base-form-real-estate__input">
                    <Field
                      type="number"
                      name="numberOfPage"
                      className="base-form-real-estate__text"
                    />
                    {errors.numberOfPage && touched.numberOfPage ? (
                      <div className="error--form">{errors.numberOfPage}</div>
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

export default BaseFormBookStore;
