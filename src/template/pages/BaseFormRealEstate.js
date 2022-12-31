import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import FileInput from "../../shared/components/UIElements/FileInput";

import "./BaseFormRealEstate.css";

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

    formData.append("price", values.price);
    formData.append("location", values.location);
    formData.append("category", values.category);
    formData.append("numberOfRooms", values.numberOfRooms);
    formData.append("adStatus", values.adStatus);
    formData.append("metreSquare", values.metreSquare);
    formData.append("description", values.description);
    formData.append("adTitle", values.adTitle);
    formData.append("pageId", pageId);

    for (const image of values.images) {
      formData.append("images", image);
    }

    const token = localStorage.getItem("token");
    console.log("token: ", token);

    await Axios({
      method: "POST",
      url: "http://localhost:8080/api/RE/template",
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
            <div className="base-form-real-estate__main">
              <table className="base-form-real-estate__table">
                <tr>
                  <th>Category</th>
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
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
                  </td>
                </tr>

                <tr>
                  <th>Advertisement Title</th>
                  <td>
                    <Field type="text" name="adTitle" />
                    {errors.adTitle && touched.adTitle ? (
                      <div className="error--form">{errors.adTitle}</div>
                    ) : null}
                  </td>
                </tr>

               

                <tr>
                  <th>Price</th>
                  <td>
                    <Field type="number" name="price" />
                    {errors.price && touched.price ? (
                      <div className="error--form">{errors.price}</div>
                    ) : null}
                  </td>
                </tr>

                <tr>
                  <th>Number of rooms</th>
                  <td>
                    <Field type="number" name="numberOfRooms" />
                    {errors.numberOfRooms && touched.numberOfRooms ? (
                      <div className="error--form">{errors.numberOfRooms}</div>
                    ) : null}
                  </td>
                </tr>

                <tr>
                  <th>Net M2</th>
                  <td>
                    <Field type="number" name="metreSquare" />
                    {errors.metreSquare && touched.metreSquare ? (
                      <div className="error--form">{errors.metreSquare}</div>
                    ) : null}
                  </td>
                </tr>

                <tr>
                  <th>Address</th>
                  <td>
                    <Field type="text" name="location" />
                    {errors.location && touched.location ? (
                      <div className="error--form">{errors.location}</div>
                    ) : null}
                  </td>
                </tr>

                <tr>
                  <th>Description</th>
                  <td>
                    <Field className="base-form-real-estate__textarea" component="textarea" name="description" />
                    {errors.description && touched.description ? (
                      <div className="error--form">{errors.description}</div>
                    ) : null}
                  </td>
                </tr>

                <tr>
                  <th>Upload photos</th>
                  <td>
                    <FileInput
                      name="images"
                      multiple
                      type="file"
                      value={undefined}
                    />
                  </td>
                </tr>
                <div className="base-form-real-estate__button" type="submit">
                <button>Submit</button>
              </div>
              </table>
              
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BaseFormRealEstate;
