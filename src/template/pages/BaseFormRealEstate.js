import React from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik";
import Axios from "axios"
import * as Yup from "yup";

import FileInput from "../components/FileInput";

const BaseFormRealEstate = () => {

  const pageId = useParams().pageId;
  const navigate = useNavigate();

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

  const submitHandler = async (values) => {


    const formData = new FormData();

    formData.append('price', values.price);
    formData.append('location', values.location);
    formData.append('category', values.category);
    formData.append('numberOfRooms', values.numberOfRooms);
    formData.append('adStatus', values.adStatus);
    formData.append('metreSquare', values.metreSquare);
    formData.append('description', values.description);
    formData.append('adTitle', values.adTitle);
    formData.append('pageId', pageId)

    for (const image of values.images) {
      formData.append('images', image);
  }

    await Axios({
      method: "POST",
      url: "http://localhost:8080/api/RE/template",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log(res);
        alert("Succesffuly created the form!");
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
          price: "", // price of the building/house/room
          location: "",
          category: "House", //house, room, building etc
          numberOfRooms: "", // 3+1, T2 etc
          adStatus: "Rent", // sell or rent
          metreSquare: "", //150m2
          description: "",
          adTitle: "",
          images: [],
        }}
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

export default BaseFormRealEstate;
