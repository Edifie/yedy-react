import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./Template.css";
import FormList from "../components/FormList";
import ProfileDetails from "../components/ProfileDetails";
import WelcomeSection from "../components/WelcomeSection";

import TeamSection from "../components/TeamSection";
import AboutUsSection from "../components/AboutUsSection";

const TemplateRealEstate = () => {
  const [loadedTemplates, setLoadedTemplates] = useState([]);
  const [loadedPages, setLoadedPages] = useState([]);
  const [loadedUser, setLoadedUser] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [tema, setTema] = useState(null);
  const [area, setArea] = useState(null);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const pageId = useParams().pageId;

  if (sectionData) {
    const containerClass = sectionData.teamTitle
      ? "parent-container"
      : "parent-container-no-team";
  }

  const getTemplates = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/RE/template/${pageId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoadedTemplates(res.data.templates);
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
    getTemplates();
    getPageById();
    getUserById();
    getSectionByPageId();
  }, []);

  if (!sectionData) {
    return null;
  }

  const redirectToForm = () => {
    window.location = `/pages/${pageId}/formRE`;
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
              <button onClick={handleEdit}>Edit</button>
            </li>

            <li>
              <button onClick={handleSection}>Edit section</button>
            </li>

            <li>
              <button title="Share" onClick={handleShare}>
                Share
              </button>
            </li>

            <li>
              <button onClick={redirectToForm}>Add new</button>
            </li>
          </ul>
          <hr></hr>
        </div>
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
          {sectionData.welcomeTitle && sectionData.welcomeDescription ? (
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
          className={`parent-container ${
            sectionData.team && sectionData.team.length > 0
              ? ""
              : "parent-container-no-team"
          }`}
        >
          <div className="AboutUsSection" style={{flex:sectionData.team && sectionData.team.length > 0 ? "1" : "2"}}>
            {sectionData.aboutUsTitle && sectionData.aboutUsDescription ? (
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
              />
            ) : (
              ""
            )}
          </div>
        </div>

        <div>
          <FormList area={area} tema={tema} items={loadedTemplates} />
        </div>
      </div>
    </>
  );
};

export default TemplateRealEstate;
