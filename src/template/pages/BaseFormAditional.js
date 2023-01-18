import React, { useEffect, useRef, useState } from "react";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../../shared/components/UIElements/FileInput";

import "./BaseFormAditional.css";

const BaseFormAditional = () => {
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showWelcomeForm, setShowWelcomeForm] = useState(false);
  const [showAboutUsForm, setShowAboutUsForm] = useState(false);

  const initialValues = {
    // Welcome section
    welcomeTitle: "",
    welcomeDescription: "",

    // About us section
    aboutUsTitle: "",
    aboutUsDescription: "",

    // Team section
    teamTitle: "",
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
  };

  const resetWelcomeSection = (setFieldValue) => {
    setFieldValue("welcomeTitle", "");
    setFieldValue("welcomeDescription", "");
  };

  const resetTeamSection = (setFieldValue) => {
    setFieldValue("team", "");
    setFieldValue("teamTitle", "");
  };

  const resetAboutUsSection = (setFieldValue) => {
    setFieldValue("aboutUsTitle", "");
    setFieldValue("aboutUsDescription", "");
  };
  const pageId = useParams().pageId;
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    const formData = new FormData();

    formData.append("welcomeTitle", values.welcomeTitle);
    formData.append("welcomeDescription", values.welcomeDescription);
    formData.append("aboutUsTitle", values.aboutUsTitle);
    formData.append("aboutUsDescription", values.aboutUsDescription);

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
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="additional-form__overall">
              {/* TEAM SECTION */}
              <div>
                <button
                  className="additional-form__toggle-button"
                  type="button"
                  onClick={() => {
                    setShowTeamForm(!showTeamForm);
                  }}
                >
                  ➕ Team
                </button>
                <hr></hr>
                {showTeamForm && (
                  <div className="animated-div">
                    <h1>Team</h1>
                    <div className="existing-team-member__card-column">
                      <div className="existing-team-member__card-column">
                        <label htmlFor="team-title">Team Title</label>
                        <br />
                        <Field
                          id="team-title"
                          name="teamTitle"
                          className="text--form__additional"
                        />
                      </div>
                    </div>
                    <hr></hr>
                    <FieldArray name="team">
                      {({ insert, remove, push }) => (
                        <div>
                          {values.team.length > 0 &&
                            values.team.map((item, index) => (
                              <div
                                className="existing-team-member__card-column"
                                key={index}
                              >
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
                                  <label
                                    htmlFor={`team.${index}.memberJobTitle`}
                                  >
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
                                  <label
                                    htmlFor={`team.${index}.memberDescription`}
                                  >
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
                )}
              </div>

              {/* WELCOME SECTION */}
              <div>
                <button
                  type="button"
                  className="additional-form__toggle-button"
                  onClick={() => {
                    setShowWelcomeForm(!showWelcomeForm);
                  }}
                >
                  ➕ Welcome
                </button>
                <hr></hr>
                {showWelcomeForm && (
                  <div className="animated-div">
                    <h1>Welcome</h1>
                    <div className="existing-team-member__card-column">
                      <div className="existing-team-member__delete-member">
                        <button
                          type="button"
                          onClick={() => {
                            resetWelcomeSection(setFieldValue);
                          }}
                        >
                          ❌ Delete this section
                        </button>
                      </div>
                      <div className="existing-team-member__card-column">
                        <label htmlFor="welcome-title">Welcome Title:</label>
                        <br />
                        <Field
                          id="welcome-title"
                          name="welcomeTitle"
                          className="text--form__additional"
                        />
                        <br />
                      </div>
                      <div className="existing-team-member__card-column">
                        <label htmlFor="welcome-description">
                          Welcome Description:
                        </label>
                        <br />
                        <Field
                          id="welcome-description"
                          name="welcomeDescription"
                          as="textarea"
                          className="text--form__additional-textarea"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ABOUT US SECTION */}
              <div>
                <button
                  type="button"
                  className="additional-form__toggle-button"
                  onClick={() => {
                    setShowAboutUsForm(!showAboutUsForm);
                  }}
                >
                  ➕ About Us
                </button>
                <hr></hr>
                {showAboutUsForm && (
                  <div className="animated-div">
                    <h1>About Us</h1>
                    <div className="existing-team-member__card-column">
                      <div className="existing-team-member__delete-member">
                        <button
                          type="button"
                          onClick={() => {
                            resetAboutUsSection(setFieldValue);
                          }}
                        >
                          ❌ Delete this section
                        </button>
                      </div>
                      <div className="existing-team-member__card-column">
                        <label htmlFor="aboutUs-title">About Us Title:</label>
                        <br />
                        <Field
                          id="aboutUs-title"
                          name="aboutUsTitle"
                          className="text--form__additional"
                        />
                        <br />
                      </div>
                      <div className="existing-team-member__card-column">
                        <label htmlFor="aboutUs-description">
                          About Us Description:
                        </label>
                        <br />

                        <Field
                          id="aboutUs-description"
                          name="aboutUsDescription"
                          as="textarea"
                          className="text--form__additional-textarea"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-additional__save-button">
                <button type="submit">Save</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BaseFormAditional;
