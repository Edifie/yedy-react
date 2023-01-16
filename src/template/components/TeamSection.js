import React from "react";

const TeamSection = (props) => {
  return (
    <div>
      <h1>{props.teamTitle}</h1>
      {props.team.map((member) => {
        return (
          <div key={member._id}>
            <h2>{member.memberName}</h2>
            <p>{member.memberJobTitle}</p>
            <p>{member.memberDescription}</p>
            <div>
              {member
                ? member.images &&
                  member.images
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
          </div>
        );
      })}
    </div>
  );
};

export default TeamSection;
