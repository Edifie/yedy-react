import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./Template.css";
import FormList from "../components/FormList";
import ProfileDetails from "../components/ProfileDetails";
import WelcomeSection from "../components/WelcomeSection";

import TeamSection from "../components/TeamSection";
import "../components/TeamSection.css";
import AboutUsSection from "../components/AboutUsSection";

const TemplateRealEstate = () => {
  const [loadedTemplatesRE, setLoadedTemplatesRE] = useState([]);
  const [loadedTemplatesSC, setLoadedTemplatesSC] = useState([]);
  const [loadedTemplatesMS, setLoadedTemplatesMS] = useState([]);
  const [loadedTemplatesBS, setLoadedTemplatesBS] = useState([]);
  const [loadedTemplatesJS, setLoadedTemplatesJS] = useState([]);
  const [loadedPages, setLoadedPages] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [tema, setTema] = useState(null);
  const [area, setArea] = useState(null);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const pageId = useParams().pageId;

  const getTemplatesRE = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/RE/template/${pageId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoadedTemplatesRE(res.data.templates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTemplatesSC = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/SC/template/${pageId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoadedTemplatesSC(res.data.templates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTemplatesMS = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/MS/template/${pageId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoadedTemplatesMS(res.data.templates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTemplatesBS = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/BS/template/${pageId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoadedTemplatesBS(res.data.templates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTemplatesJS = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/JS/template/${pageId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoadedTemplatesJS(res.data.templates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPageById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/pages/${pageId}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoadedPages(res.data.page);
        setTema(res.data.page.tema);
        setArea(res.data.page.area);
        localStorage.setItem("url", res.data.page.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/users/${userId}`,
      header: "Content Type: application/json",
    })
      .then((res) => {
        setLoadedUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSectionByPageId = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/pages/${pageId}/aditional-section`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setSectionData(res.data.sections[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTemplatesRE();
    getTemplatesMS();
    getTemplatesBS();
    getTemplatesJS();
    getPageById();
    getUserById();
    getTemplatesSC();
    getSectionByPageId();
  }, []);

  if (!sectionData) {
    return null;
  }

  const redirectToForm = () => {
    if (area === "Real Estate") {
      window.location = `/pages/${pageId}/formRE`;
    } else if (area === "Sell Clothes") {
      window.location = `/pages/${pageId}/formSC`;
    } else if (area === "Book Store") {
      window.location = `/pages/${pageId}/formBS`;
    } else if (area === "Music Store") {
      window.location = `/pages/${pageId}/formMS`;
    } else if (area === "Jewellery Store") {
      window.location = `/pages/${pageId}/formJS`;
    }else {
      <div>
        <h1>Wrong form navigation.</h1>
      </div>;
    }
  };

  const handleShare = async () => {
    window.open(`http://localhost:3000/DT/${localStorage.getItem("url")}`);
  };

  const handleSection = async () => {
    navigate(`/pages/${pageId}/aditional-section-edit`);
  };

  const handleEdit = async () => {
    navigate(`/pages/edit/${pageId}`);
  };

  return (
    <>
      <div className={`template-overall-${tema}`}>
        <div className="template__buttons">
          <hr></hr>
          <ul>
            <li>
              <button onClick={handleEdit}>Edit Page</button>
            </li>

            <li>
              <button onClick={handleSection}>Edit section</button>
            </li>

            <li>
              <button onClick={redirectToForm}>Add new</button>
            </li>

            <li>
              <button title="Share" onClick={handleShare}>
                Share
              </button>
            </li>
          </ul>
          <hr></hr>
        </div>
        <div className={`template-background-${tema}`}>
          <div className={`container-${tema}`}>
            {loadedUser && loadedPages ? (
              <ProfileDetails
                name={loadedUser.name}
                email={loadedUser.email}
                location={loadedUser.location}
                phoneNumber={loadedUser.phoneNumber}
                profilePic={loadedUser.images}
                images={loadedPages.images}
                namePage={loadedPages.name}
                tema={loadedPages.tema}
              />
            ) : (
              "loading"
            )}
          </div>
          <div className="WelcomeSection">
            {sectionData.welcomeTitle !== " " &&
            sectionData.welcomeTitle !== "" &&
            sectionData.welcomeDescription !== "" &&
            sectionData.welcomeDescription !== " " ? (
              <WelcomeSection
                welcomeTitle={sectionData.welcomeTitle}
                welcomeDescription={sectionData.welcomeDescription}
                tema={tema}
              />
            ) : (
              ""
            )}
          </div>

          <div
            className={`parent-container-${tema} ${
              sectionData.team &&
              sectionData.team.length > 0 &&
              sectionData.aboutUsTitle !== " " &&
              sectionData.aboutUsDescription !== " " &&
              sectionData.aboutUsTitle !== "" &&
              sectionData.aboutUsDescription !== ""
                ? ""
                : "parent-container-no-team"
            }`}
          >
            <div
              className="AboutUsSection"
              style={{
                flex:
                  sectionData.team && sectionData.team.length > 0 ? "1" : "2",
              }}
            >
              {sectionData.aboutUsTitle !== " " &&
              sectionData.aboutUsTitle !== "" &&
              sectionData.aboutUsDescription !== "" &&
              sectionData.aboutUsDescription !== " " ? (
                <AboutUsSection
                  aboutUsTitle={sectionData.aboutUsTitle}
                  aboutUsDescription={sectionData.aboutUsDescription}
                  tema={tema}
                />
              ) : (
                ""
              )}
            </div>

            <div className="TeamSection">
              {sectionData.team && sectionData.team.length > 0 ? (
                <TeamSection
                  team={sectionData.team}
                  teamTitle={sectionData.teamTitle}
                  tema={loadedPages.tema}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={`template-adverts-${tema}`}>
            <h1>Adverts</h1>
          </div>

          {area === "Real Estate" ? (
            loadedTemplatesRE ? (
              <FormList items={loadedTemplatesRE} tema={tema} area={area} />
            ) : (
              "Loading"
            )
          ) : area === "Sell Clothes" ? (
            loadedTemplatesSC ? (
              <FormList items={loadedTemplatesSC} tema={tema} area={area} />
            ) : (
              "Loading"
            )
          ) : area === "Music Store" ? (
            loadedTemplatesMS ? (
              <FormList items={loadedTemplatesMS} tema={tema} area={area} />
            ) : (
              "Loading"
            )
          ) : area === "Book Store" ? (
            loadedTemplatesBS ? (
              <FormList items={loadedTemplatesBS} tema={tema} area={area} />
            ) : (
              "Loading"
            )
          ) : area === "Jewellery Store" ? (
            loadedTemplatesBS ? (
              <FormList items={loadedTemplatesJS} tema={tema} area={area} />
            ) : (
              "Loading"
            )
          ) : (
            <div>Error loading area</div>
          )}
        </div>
      </div>
    </>
  );
};

export default TemplateRealEstate;
