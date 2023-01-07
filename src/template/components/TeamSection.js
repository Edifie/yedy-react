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
          </div>
        );
      })}
    </div>
  );
};

export default TeamSection;
