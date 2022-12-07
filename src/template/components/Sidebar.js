import React, { useState } from "react";

const Sidebar = ({
  addText,
  setAddText,
  addImage,
  setAddImage,
  addRow,
  setAddRow,
  addColumn,
  setAddColumn,
}) => {
  const handleAddTextClick = () => {
    setAddText(true);
  };

  const handleAddImageClick = () => {
    setAddImage(true);
  };

  const handleAddRowClick = () => {
    setAddRow(true);
  };

  const handleAddColumnClick = () => {
    setAddColumn(true);
  };

  return (
    <div className="sidebar">
      <button onClick={handleAddTextClick}>Add text</button>
      <button onClick={handleAddImageClick}>Add image</button>
      <button onClick={handleAddRowClick}>Add row</button>
      <button onClick={handleAddColumnClick}>Add column</button>
    </div>
  );
};

export default Sidebar;
