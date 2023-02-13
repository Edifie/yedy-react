import React, { useEffect, useState } from "react";
import axios from "axios";

import SharedFormList from "../components/SharedFormList";
import { useParams } from "react-router-dom";
import ProfileDetails from "../../template/components/ProfileDetails";

import "./SharedTemplate.css";
import WelcomeSection from "../../template/components/WelcomeSection";
import TeamSection from "../../template/components/TeamSection";
import AboutUsSection from "../../template/components/AboutUsSection";

const SharedRealEstate = () => {
  const [loadedSharePages, setLoadedSharePages] = useState(null);
  const [loadedTemplatesRE, setLoadedTemplatesRE] = useState([]);
  const [loadedTemplatesSC, setLoadedTemplatesSC] = useState([]);
  const [loadedTemplatesMS, setLoadedTemplatesMS] = useState([]);
  const [loadedTemplatesBS, setLoadedTemplatesBS] = useState([]);
  const [loadedTemplatesJS, setLoadedTemplatesJS] = useState([]);
  const [tema, setTema] = useState(null);
  const [loadedUser, setLoadedUser] = useState(null);
  const [pageId, setPageId] = useState(null);
  const [area, setArea] = useState(null);
  const [sectionData, setSectionData] = useState(null);

  const userId = localStorage.getItem("userId");

  const url = useParams().url;

  const getCustomUrl = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/pages/DT/${url}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setLoadedSharePages(res.data.page);
      setPageId(res.data.page.id);
      setTema(res.data.page.tema);
      setArea(res.data.page.area);

      return res.data.page.id;
    } catch (err) {
      console.log(err);
    }
  };

  const getTemplatesRE = async () => {
    try {
      const pageId = await getCustomUrl();
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/RE/template/${pageId}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setLoadedTemplatesRE(res.data.templates);
      console.log("Res.data.templatesRE -->", res.data.templates);
    } catch (err) {
      console.log(err);
    }
  };

  const getTemplatesBS = async () => {
    try {
      const pageId = await getCustomUrl();
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/BS/template/${pageId}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setLoadedTemplatesBS(res.data.templates);
      console.log("Res.data.templatesRE -->", res.data.templates);
    } catch (err) {
      console.log(err);
    }
  };

  const getTemplatesSC = async () => {
    try {
      const pageId = await getCustomUrl();
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/SC/template/${pageId}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setLoadedTemplatesSC(res.data.templates);
      console.log("Res.data.templatesSC -->", res.data.templates);
    } catch (err) {
      console.log(err);
    }
  };

  const getTemplatesMS = async () => {
    try {
      const pageId = await getCustomUrl();
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/MS/template/${pageId}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setLoadedTemplatesMS(res.data.templates);
      console.log("Res.data.templatesSC -->", res.data.templates);
    } catch (err) {
      console.log(err);
    }
  };

  const getTemplatesJS = async () => {
    try {
      const pageId = await getCustomUrl();
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/JS/template/${pageId}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setLoadedTemplatesJS(res.data.templates);
      console.log("Res.data.templatesRE -->", res.data.templates);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserById = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/users/${userId}`,
      header: "Content Type: application/json",
    })
      .then((res) => {
        console.log("Respond from getUserByID", res);
        setLoadedUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("User -> ", loadedUser);
  };

  const getSectionByPageId = async () => {
    try {
      const pageId = await getCustomUrl();
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/pages/${pageId}/aditional-section`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setSectionData(res.data.sections[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTemplatesRE();
    getUserById();
    getSectionByPageId();
    getCustomUrl();
    getTemplatesBS();
    getTemplatesSC();
    getTemplatesMS();
    getTemplatesJS();
  }, []);

  if (!sectionData) {
    return null;
  }

  return (
    <div className={`template-overall-${tema}`}>
      <div className={`template-background-${tema}`}>
        <div className="container-shared">
          <div className={`container-${tema}`}>
            {loadedUser && loadedSharePages ? (
              <ProfileDetails
                name={loadedUser.name}
                email={loadedUser.email}
                images={loadedSharePages.images}
                namePage={loadedSharePages.name}
                location={loadedUser.location}
                phoneNumber={loadedUser.phoneNumber}
                profilePic={loadedUser.images}
                tema={tema}
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
                  tema={tema}
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
              <SharedFormList
                items={loadedTemplatesRE}
                tema={tema}
                area={area}
              />
            ) : (
              "Loading"
            )
          ) : area === "Sell Clothes" ? (
            loadedTemplatesSC ? (
              <SharedFormList
                items={loadedTemplatesSC}
                tema={tema}
                area={area}
              />
            ) : (
              "Loading"
            )
          ) : area === "Music Store" ? (
            loadedTemplatesMS ? (
              <SharedFormList
                items={loadedTemplatesMS}
                tema={tema}
                area={area}
              />
            ) : (
              "Loading"
            )
          ) : area === "Book Store" ? (
            loadedTemplatesBS ? (
              <SharedFormList
                items={loadedTemplatesBS}
                tema={tema}
                area={area}
              />
            ) : (
              "Loading"
            )
          ) : area === "Jewellery Store" ? (
            loadedTemplatesJS ? (
              <SharedFormList
                items={loadedTemplatesJS}
                tema={tema}
                area={area}
              />
            ) : (
              "Loading"
            )
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedRealEstate;
