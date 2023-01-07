import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WelcomeSection from "../components/WelcomeSection";
import AboutUsSection from "../components/AboutUsSection";
import TeamSection from "../components/TeamSection";

const Sections = () => {
  const [sectionData, setSectionData] = useState(null);

  const pageId = useParams().pageId;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8080/api/pages/${pageId}/aditional-section`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setSectionData(result.data.sections[0]);
      console.log(result.data.sections[0].welcomeTitle);
    };
    fetchData();
  }, []);

  if (!sectionData) {
    return null;
  }

  return (
    <>
      <div>
        {sectionData.welcomeTitle && sectionData.welcomeDescription && (
          <WelcomeSection
            welcomeTitle={sectionData.welcomeTitle}
            welcomeDescription={sectionData.welcomeDescription}
          />
        )}
      </div>

      <div>
        {sectionData.aboutUsTitle && sectionData.aboutUsDescription && (
          <AboutUsSection
            aboutUsTitle={sectionData.aboutUsTitle}
            aboutUsDescription={sectionData.aboutUsDescription}
          />
        )}
      </div>
      <div>
        {sectionData.team && sectionData.team.length > 0 && (
          <TeamSection
            team={sectionData.team}
            teamTitle={sectionData.teamTitle}
          />
        )}
      </div>  
    </>
  );
};

export default Sections;
