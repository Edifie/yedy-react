import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

import "./Template.css";
const Template = () => {
  const [addText, setAddText] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [addRow, setAddRow] = useState(false);
  const [addColumn, setAddColumn] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleClick = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  return (
    <div className="template-container">
      <Sidebar
        addText={addText}
        setAddText={setAddText}
        addImage={addImage}
        setAddImage={setAddImage}
        addRow={addRow}
        setAddRow={setAddRow}
        addColumn={addColumn}
        setAddColumn={setAddColumn}
      />
      <div className="template" onClick={handleClick}>
        {addText && (
          <input
            type="text"
            placeholder="Enter text"
            style={{ position: "absolute", left: x, top: y }}
          />
        )}
        {addImage && (
          <input
            type="file"
            accept="image/*"
            style={{ position: "absolute", left: x, top: y }}
          />
        )}
        {addRow && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              left: x,
              top: y,
            }}
          >
            <div style={{ width: "50%" }} />
            <div style={{ width: "50%" }} />
          </div>
        )}
        {addColumn && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: x,
              top: y,
            }}
          >
            <div style={{ height: "50%" }} />
            <div style={{ height: "50%" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
