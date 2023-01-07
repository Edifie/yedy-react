import React, { useEffect, useState } from "react";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../../shared/components/UIElements/FileInput";

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
      .catch((res) => {
        console.log(res);
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
            {/* TEAM SECTION */}
            <div>
              <button
                type="button"
                onClick={() => {
                  setShowTeamForm(!showTeamForm);
                  if (!showTeamForm) {
                    resetTeamSection(setFieldValue);
                  }
                }}
              >
                + Team
              </button>

              {showTeamForm && (
                <div>
                  <h1>Team</h1>
                  <label htmlFor="contact-title">Team Title:</label>
                  <br />
                  <Field id="team-title" name="teamTitle" />

                  <FieldArray name="team">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.team.length > 0 &&
                          values.team.map((item, index) => (
                            <div className="row" key={index}>
                              <div className="col">
                                <label htmlFor={`team.${index}.memberName`}>
                                  Name
                                </label>
                                <Field
                                  name={`team.${index}.memberName`}
                                  placeholder="Jane Doe"
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`team.${index}.memberName`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="col">
                                <label htmlFor={`team.${index}.memberJobTitle`}>
                                  Job Title
                                </label>
                                <Field
                                  name={`team.${index}.memberJobTitle`}
                                  placeholder="Marketing"
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`team.${index}.memberJobTitle`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="col">
                                <label
                                  htmlFor={`team.${index}.memberDescription`}
                                >
                                  Description
                                </label>
                                <Field
                                  name={`team.${index}.memberDescription`}
                                  placeholder="About team member"
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`team.${index}.memberDescription`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              {/* <div className="col">
                                <label htmlFor={`team.${index}.images[0]`}>
                                  Upload image
                                </label>
             

                                <Field
                                  name={`team.${index}.images[0]`}
                                  type="file"
                                  
                                />

                                <ErrorMessage
                                  name={`team.${index}.images[0]`}
                                  component="div"
                                  className="field-error"
                                />
                              </div> */}

                              <div className="col">
                                <button
                                  type="button"
                                  className="secondary"
                                  onClick={() => remove(index)}
                                >
                                  Delete Member
                                </button>
                              </div>
                            </div>
                          ))}
                        <button
                          type="button"
                          className="secondary"
                          onClick={() =>
                            push({
                              name: "",
                              jobTitle: "",
                              description: "",
                              images: "",
                            })
                          }
                        >
                          Add Member
                        </button>
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
                onClick={() => {
                  setShowWelcomeForm(!showWelcomeForm);
                  if (!showWelcomeForm) {
                    resetWelcomeSection(setFieldValue);
                  }
                }}
              >
                + Welcome
              </button>
              {showWelcomeForm && (
                <div>
                  <h1>Welcome</h1>
                  <label htmlFor="welcome-title">Welcome Title:</label>
                  <br />
                  <Field id="welcome-title" name="welcomeTitle" />
                  <br />
                  <label htmlFor="welcome-description">
                    Welcome Description:
                  </label>
                  <br />
                  <Field id="welcome-description" name="welcomeDescription" />
                </div>
              )}
            </div>

            {/* ABOUT US SECTION */}
            <div>
              <button
                type="button"
                onClick={() => {
                  setShowAboutUsForm(!showAboutUsForm);
                  if (!showAboutUsForm) {
                    resetAboutUsSection(setFieldValue);
                  }
                }}
              >
                + About Us
              </button>
              {showAboutUsForm && (
                <div>
                  <h1>About Us</h1>
                  <label htmlFor="aboutUs-title">About Us Title:</label>
                  <br />
                  <Field id="aboutUs-title" name="aboutUsTitle" />
                  <br />
                  <label htmlFor="aboutUs-description">
                    About Us Description:
                  </label>
                  <br />
                  <Field id="aboutUs-description" name="aboutUsDescription" />
                </div>
              )}
            </div>

            <div>
              <button type="submit">Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BaseFormAditional;
