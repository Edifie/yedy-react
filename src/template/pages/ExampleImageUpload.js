import React from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik";
import Axios from "axios"
import * as Yup from "yup";

import FileInput from "../components/FileInput";

const BaseFormRealEstate = () => {

    const pageId = useParams().pageId;
    const navigate = useNavigate();

    const submitHandler = async (values) => {

        const formData = new FormData();

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
                    images: [],
                }}
                onSubmit={(values) => submitHandler(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="main">
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

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BaseFormRealEstate;
