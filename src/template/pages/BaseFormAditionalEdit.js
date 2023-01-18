import React, { useEffect, useState } from "react";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../../shared/components/UIElements/FileInput";

import "./BaseFormAditional.css";

const BaseFormAditionalEdit = () => {
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showWelcomeForm, setShowWelcomeForm] = useState(false);
  const [showAboutUsForm, setShowAboutUsForm] = useState(false);
  const [initialValuesData, setInitialValuesData] = useState({});
  const [sectionId, setSectionId] = useState();

  const getSectionByPageId = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/pages/${pageId}/aditional-section`,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        "Content-Type": "multipart/form-data",
      });
      setInitialValuesData(res.data.sections[0]);
      setSectionId(res.data.sections[0]._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSectionByPageId();
  }, []);

  if (initialValuesData) {
    console.log(initialValuesData);
  }

  const resetWelcomeSection = (setFieldValue) => {
    setFieldValue("welcomeTitle", " ");
    setFieldValue("welcomeDescription", " ");
  };

  const resetTeamSection = (setFieldValue) => {
    setFieldValue("team", "");
    setFieldValue("teamTitle", "");
  };

  const resetAboutUsSection = (setFieldValue) => {
    setFieldValue("aboutUsTitle", " ");
    setFieldValue("aboutUsDescription", " ");
  };
  const pageId = useParams().pageId;
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    const formData = new FormData();

    if (
      values.welcomeTitle !== undefined &&
      values.welcomeTitle !== initialValuesData.welcomeTitle
    ) {
      formData.append("welcomeTitle", values.welcomeTitle);
    }

    if (
      values.welcomeDescription !== undefined &&
      values.welcomeDescription !== initialValuesData.welcomeDescription
    ) {
      formData.append("welcomeDescription", values.welcomeDescription);
    }

    if (
      values.aboutUsTitle !== undefined &&
      values.aboutUsTitle !== initialValuesData.aboutUsTitle
    ) {
      formData.append("aboutUsTitle", values.aboutUsTitle);
    }

    if (
      values.aboutUsDescription !== undefined &&
      values.aboutUsDescription !== initialValuesData.aboutUsDescription
    ) {
      formData.append("aboutUsDescription", values.aboutUsDescription);
    }

    if (
      values.teamTitle !== undefined &&
      values.teamTitle !== initialValuesData.teamTitle
    ) {
      formData.append("teamTitle", values.teamTitle);
    }

    // if (values.team && values.team.length > 0) {
    if (values.team !== undefined && values.team !== initialValuesData.team) {
      values.team.forEach((item, index) => {
        // update existing team member

        formData.append(
          `team[${index}][_id]`,
          initialValuesData.team[index]._id
        );
        formData.append(
          `team[${index}][memberName]`,
          values.team[index].memberName
        );
        formData.append(
          `team[${index}][memberJobTitle]`,
          values.team[index].memberJobTitle
        );
        formData.append(
          `team[${index}][memberDescription]`,
          values.team[index].memberDescription
        );
        if (
          values.team[index].images[0][0] !==
            initialValuesData.team[index].images[0] &&
          (values.team[index].images[0][0]
            ? values.team[index].images[0][0].size !== 0
            : true)
        ) {
          formData.append(
            `team[${index}][images][0]`,
            values.team[index].images[0][0]
          );
        }
        console.log(item._id);
      });
    }

    formData.append("pageId", pageId);

    const token = localStorage.getItem("token");
    console.log("token: ", token);

    await axios({
      method: "PATCH",
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
    console.log(formData);
    navigate(`/pages/${pageId}`);
  };

  const navigateToAddTeam = () => {
    navigate(`/pages/${pageId}/aditional-section/add-team/${sectionId}`);
  };

  const deleteTeamMember = async (teamMemberId) => {
    await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/pages/${sectionId}/team/${teamMemberId}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        sectionId: sectionId,
        teamMemberId: teamMemberId,
      },
    })
      .then((res) => {
        console.log("Respond from the request -->", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValuesData}
        enableReinitialize={true}
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

                {initialValuesData && showTeamForm && (
                  <div className="animated-div">
                    <h1>Team</h1>

                    <div className="additional-edit__button-add-member">
                      <button onClick={navigateToAddTeam}>
                        ➕ Add team member
                      </button>
                    </div>
                    <div>
                      <label htmlFor="contact-title">Team Title</label>
                      <br />
                      <Field
                        id="team-title"
                        name="teamTitle"
                        className="text--form__additional"
                      />

                      <div>
                        <h2>Team members</h2>
                      </div>
                      <div className="existing-team-members">
                        {initialValuesData &&
                          initialValuesData.team.map((item, index) => (
                            <>
                              <div className="existing-team-member__card-column">
                                <div className="existing-team-member__delete-member">
                                  <button
                                    type="button"
                                    onClick={() => deleteTeamMember(item._id)}
                                  >
                                    ❌ Delete member
                                  </button>
                                </div>
                                <div className="existing-team-member__card-column">
                                  <div className="member-image">
                                    {item
                                      ? item.images &&
                                        item.images
                                          .slice(0, 1)
                                          .map((image, index) => (
                                            <img
                                              key={image.id || index}
                                              src={`data:${image.contentType};base64,${image.imageBase64}`}
                                              alt={image.filename}
                                            />
                                          ))
                                      : "Loading.."}
                                  </div>
                                  <div className="existing-team-member__card-row">
                                    <div className="hidden-team-member-id">
                                      <Field
                                        name={`team.${index}._id`}
                                        value={item._id}
                                      />
                                    </div>

                                    <div className="additional-form_centered">
                                      <label>Name</label>
                                      <Field
                                        key={item._id}
                                        type="text"
                                        name={`team.${index}.memberName`}
                                        className="text--form__additional"
                                        // defaultValue={item.memberName}
                                      />
                                    </div>

                                    <div className="additional-form_centered">
                                      <label>Job Title</label>
                                      <Field
                                        key={item._id}
                                        type="text"
                                        name={`team.${index}.memberJobTitle`}
                                        className="text--form__additional"
                                        // defaultValue={item.memberJobTitle}
                                      />
                                    </div>
                                  </div>

                                  <div className="existing-team-member__card-column">
                                    <div className="additional-form_centered">
                                      <label>Description</label>
                                      <Field
                                        as="textarea"
                                        key={item._id}
                                        name={`team.${index}.memberDescription`}
                                        className="text--form__additional-textarea"
                                        // defaultValue={item.memberDescription}
                                      />
                                    </div>
                                  </div>
                                  <div className="existing-team-member__card-column">
                                    <div className="additional-form_centered">
                                      <label>Upload</label>
                                      <FileInput
                                        name={`team.${index}.images[0]`}
                                        type="file"
                                        value={undefined}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <hr className="additional-form__hr"></hr> */}
                            </>
                          ))}
                      </div>
                    </div>
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
                    // if (!showWelcomeForm) {
                    //   resetWelcomeSection(setFieldValue);
                    // }
                  }}
                >
                  ➕ Welcome
                </button>
                <hr></hr>

                {initialValuesData && showWelcomeForm && (
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
                        <label htmlFor="welcome-title">Welcome Title</label>
                        <br />
                        <Field
                          id="welcome-title"
                          className="text--form__additional"
                          name="welcomeTitle"
                          // defaultValue={initialValuesData.welcomeTitle}
                        />
                        <br />
                      </div>
                      <div className="existing-team-member__card-column">
                        <label htmlFor="welcome-description">
                          Welcome Description
                        </label>
                        <br />
                        <Field
                          className="text--form__additional-textarea"
                          id="welcome-description"
                          name="welcomeDescription"
                          as="textarea"
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
                {initialValuesData && showAboutUsForm && (
                  <div>
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
                          <label htmlFor="aboutUs-title">About Us Title</label>
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
                            className="text--form__additional-textarea"
                            id="aboutUs-description"
                            name="aboutUsDescription"
                            as="textarea"
                            // defaultValue={
                            //   initialValuesData &&
                            //   initialValuesData.aboutUsDescription !== ""
                            //     ? initialValuesData.aboutUsDescription
                            //     : " "
                            // }
                          />
                        </div>
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

export default BaseFormAditionalEdit;
