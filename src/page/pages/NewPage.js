
import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/Validator";

import "./PageForm.css";

const NewPage = () => {
  // first argument is initialInputs and second argument is initialFormValidity from form-hook.js
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs); //send back to backend
  };

  return (
    <div className="main">
      <form className="place-form" onSubmit={submitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Name of the company"
          validators={[VALIDATOR_REQUIRE()]} // check what user entered is not empty
          errortext="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input 
            id='description'

        />
      </form>
    </div>
  );
};

export default NewPage;
