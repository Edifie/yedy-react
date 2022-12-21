import { useField, useFormikContext } from 'formik';
import React, { useRef } from 'react';

const FileInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const formik = useFormikContext();
  const fileInputRef = useRef();

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input type="file" ref={fileInputRef} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div>{meta.error}</div>
      ) : null}
      <button
        type="button"
        onClick={() => {
          formik.setFieldValue(
            props.name,
            fileInputRef.current.files,
            true
          );
        }}
      >
        Set File
      </button>
    </>
  );
};

export default FileInput;