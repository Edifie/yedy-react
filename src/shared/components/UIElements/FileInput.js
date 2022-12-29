import { useField, useFormikContext } from "formik";
import React, { useRef } from "react";

import "./FileInput.css";

const FileInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const formik = useFormikContext();
  const fileInputRef = useRef();

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="edit-button">
        <input
          className="input__auth-upload"
          type="file"
          ref={fileInputRef}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}

        <button
          className="btn--auth-edit"
          type="button"
          onClick={() => {
            formik.setFieldValue(props.name, fileInputRef.current.files, true);
          }}
        >
          Set File
        </button>
      </div>
    </>
  );
};

export default FileInput;
