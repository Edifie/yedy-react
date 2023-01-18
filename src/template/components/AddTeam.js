import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../../shared/components/UIElements/FileInput";

const AddTeam = () => {
  const pageId = useParams().pageId;

  const navigate = useNavigate();

  const sectionId = useParams().sectionId;

  const submitHandler = async (values) => {
    const formData = new FormData();

    values.team = values.team || [{}];

    values.team.forEach((item, index) => {
      formData.append(`team[${index}][memberName]`, item.memberName || "");
      formData.append(
        `team[${index}][memberJobTitle]`,
        item.memberJobTitle || ""
      );
      formData.append(
        `team[${index}][memberDescription]`,
        item.memberDescription || ""
      );

      formData.append(`team[${index}][images][0]`, item.images[0][0]);

      console.log("append image: ", item.images[0]);
    });

    formData.append("pageId", pageId);
    formData.append("sectionId", sectionId);
    const token = localStorage.getItem("token");
    console.log("token: ", token);

    await axios({
      method: "POST",
      url: `http://localhost:8080/api/pages/${pageId}/aditional-section`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(values);
    navigate(`/pages/${pageId}`);
  };

  return (
    <Formik
      initialValues={{
        team: [
          {
            memberName: "",
            memberJobTitle: "",
            memberDescription: "",
            images: [
              {
                filename: "",
                contentType: "",
                imageBase64: "",
              },
            ],
          },
        ],
      }}
      onSubmit={(values) => submitHandler(values)}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="additional-form__overall_add-team">
            {/* TEAM SECTION */}

            <div>
              <h1>Team</h1>

              <FieldArray name="team">
                {({ insert, remove, push }) => (
                  <div>
                    {values.team.length > 0 &&
                      values.team.map((item, index) => (
                        <div
                          className="existing-team-member__card-column"
                          key={index}
                        >
                          <Field name="sectionId" value={sectionId} />

                          <div className="existing-team-member__card-column">
                            <label htmlFor={`team.${index}.memberName`}>
                              Name
                            </label>

                            <Field
                              name={`team.${index}.memberName`}
                              placeholder="Jane Doe"
                              type="text"
                              className="text--form__additional"
                            />
                            <ErrorMessage
                              name={`team.${index}.memberName`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="existing-team-member__card-column">
                            <label htmlFor={`team.${index}.memberJobTitle`}>
                              Job Title
                            </label>
                            <Field
                              name={`team.${index}.memberJobTitle`}
                              placeholder="Marketing"
                              type="text"
                              className="text--form__additional"
                            />
                            <ErrorMessage
                              name={`team.${index}.memberJobTitle`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="existing-team-member__card-column">
                            <label htmlFor={`team.${index}.memberDescription`}>
                              Description
                            </label>
                            <Field
                              name={`team.${index}.memberDescription`}
                              placeholder="About team member"
                              as="textarea"
                              className="text--form__additional-textarea"
                            />
                            <ErrorMessage
                              name={`team.${index}.memberDescription`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="existing-team-member__card-column">
                            <label htmlFor={`team.${index}.images[0]`}>
                              Upload image
                            </label>

                            {/* <Field
                              name={`team.${index}.images`}
                              type="file"
                            /> */}

                            <FileInput
                              name={`team.${index}.images[0]`}
                              type="file"
                              value={undefined}
                            />

                            <ErrorMessage
                              name={`team.${index}.images[0]`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="existing-team-member__delete-member">
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              ❌ Delete Member
                            </button>
                          </div>
                        </div>
                      ))}
                    <div className="existing-team-member__add-member">
                      <button
                        type="button"
                        className="secondary"
                        onClick={() =>
                          push({
                            memberName: "",
                            memberJobTitle: "",
                            memberDescription: "",
                            images: "",
                          })
                        }
                      >
                        ➕ Add Member
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="form-additional__save-button">
              <button type="submit">Save</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTeam;
