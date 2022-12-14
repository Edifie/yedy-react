import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const BaseTemplate = () => {
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

  const submitImgHandler = (values) => {
    console.log(values.photo);
  };

  const submitHandler = (values) => {
    // await Axios({
    //   method: "POST",
    //   url: "http://localhost:8080/api/pages/",
    //   data: values,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     alert("Succesffuly created the form!");
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });
    console.log(values);
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
          photo: "",
        }}
        validationSchema={FormSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, touched }) => (
          <Form>
            {/* Ilan kategorisi */}
            <div>
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
                <Field type="file" name="photo" accept="image/*" />
                <button type="submit" onSubmit={submitImgHandler}>
                  Submit image
                </button>
              </div>

              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BaseTemplate;
