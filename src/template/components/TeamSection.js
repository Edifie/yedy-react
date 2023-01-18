import React from "react";

import "./TeamSection.css";

const TeamSection = (props) => {
  const { tema } = props;
  return (
    <div className={`card-team-overall-${tema}`}>
      <div>
        <h1 className={`card-team-title-${tema}`}>{props.teamTitle}</h1>
      </div>
      <ul className="cards">
        {props.team.map((member) => {
          return (
            <li className="card-team-listed">
              <div className="card-team" key={member._id}>
                {member
                  ? member.images &&
                    member.images
                      .slice(0, 1)
                      .map((image, index) => (
                        <img
                          key={image.id || index}
                          className="card__image"
                          src={`data:${image.contentType};base64,${image.imageBase64}`}
                          alt={image.filename}
                        />
                      ))
                  : "Loading.."}

                <div className="card__overlay">
                  <div className="card__header">
                    <div className="card__header-text">
                      <h3 className={`card__title-${tema}`}>
                        {member.memberName}
                      </h3>
                      <span className={`card__status-${tema}`}>
                        {member.memberJobTitle}
                      </span>
                    </div>
                  </div>
                  <p className={`card__description-${tema}`}>
                    {member.memberDescription}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TeamSection;
