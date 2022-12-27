import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import FileInput from "../components/FileInput";

import "./Template.css";
import axios from "axios";

const UpdateRealEstate = (props) => {
  const pageId = useParams().pageId;
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({});

  const { templateId } = useParams();

  const FormSchema = Yup.object().shape({
    price: Yup.number().required("Cannot leave blank this field."),
    location: Yup.string()
      .min(3, "Location should contain at least 3 characters.")
      .required("Cannot leave blank this field."),
    category: Yup.string().required("Cannot leave blank this field."),
    numberOfRooms: Yup.string().required("Cannot leave blank this field."),
    adStatus: Yup.string().required("Cannot leave blank this field."),
    metreSquare: Yup.string().required("Cannot leave blank this field."),
    description: Yup.string().required("Cannot leave blank this field."),
    adTitle: Yup.string()
      .min(3, "Title should contain at least 3 characters.")
      .required("Cannot leave blank this field."),
  });

  const getTemplateById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/RE/template/templates/${templateId}`,
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
    if (values.location !== initialValues.location) {
      formData.append("location", values.location);
    }
    if (values.category !== initialValues.category) {
      formData.append("category", values.category);
    }
    if (values.numberOfRooms !== initialValues.numberOfRooms) {
      formData.append("numberOfRooms", values.numberOfRooms);
    }
    if (values.adStatus !== initialValues.adStatus) {
      formData.append("adStatus", values.adStatus);
    }
    if (values.metreSquare !== initialValues.metreSquare) {
      formData.append("metreSquare", values.metreSquare);
    }
    if (values.description !== initialValues.description) {
      formData.append("description", values.description);
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
      url: `http://localhost:8080/api/RE/template/${templateId}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        alert("Succesffuly updated the form!");
      })
      .catch((res) => {
        console.log(res);
      });

    console.log(values);

    setTimeout(() => {
      navigate(`/pages/${pageId}`);
    }, 1000);
  };

  // wait to get data
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
        {({ errors, touched }) => (
          <Form>
            <div className="main">
              <div>
                <label>Category</label>
                <div>
                  <Field
                    type="radio"
                    name="category"
                    value="House"
                    checked={true}
                  />
                  House
                </div>
                <div>
                  <Field type="radio" name="category" value="Workplace" />
                  Workplace
                </div>
              </div>

              <div>
                <label>Status</label>
                <div>
                  <Field
                    type="radio"
                    name="adStatus"
                    value="Rent"
                    checked={true}
                  />
                  Rent
                </div>
                <div>
                  <Field type="radio" name="adStatus" value="Sell" />
                  Sell
                </div>
              </div>

              <div>
                <label>Advertisement Title</label>
                <Field type="text" name="adTitle" />
                {errors.adTitle && touched.adTitle ? (
                  <div className="error--form">{errors.adTitle}</div>
                ) : null}
              </div>

              <div>
                <label>Description</label>
                <Field type="textarea" name="description" />
                {errors.description && touched.description ? (
                  <div className="error--form">{errors.description}</div>
                ) : null}
              </div>

              <div>
                <label>Price</label>
                <Field type="number" name="price" />
                {errors.price && touched.price ? (
                  <div className="error--form">{errors.price}</div>
                ) : null}
              </div>

              <div>
                <label>Number of rooms</label>
                <Field type="number" name="numberOfRooms" />
                {errors.numberOfRooms && touched.numberOfRooms ? (
                  <div className="error--form">{errors.numberOfRooms}</div>
                ) : null}
              </div>

              <div>
                <label>Net M2</label>
                <Field type="number" name="metreSquare" />
                {errors.metreSquare && touched.metreSquare ? (
                  <div className="error--form">{errors.metreSquare}</div>
                ) : null}
              </div>

              <div>
                <label>Address</label>
                <Field type="text" name="location" />
                {errors.location && touched.location ? (
                  <div className="error--form">{errors.location}</div>
                ) : null}
              </div>

              <div>
                <label>Upload photos</label>
                <FileInput
                  name="images"
                  multiple
                  type="file"
                  value={undefined}
                />
              </div>

              <button className="btn--form" type="submit">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateRealEstate;
