import React, { useEffect, useReducer } from "react";
import { validate } from "../../util/Validator";
//useReducer: allows you to manage state in a component and it also it gives you a function you can call which updates the state and re-renders the component
//useEffect: allows us to run some logic when some dependencies change (in this case, whenever the input value or validity changes)

import "./Input.css";

//we always have to return a new state
//define outside of component because it is not depend on any component
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        //no need to add isTouched fieald, becasue ...state will copy the fields as well
        ...state, //copy of the old state to don't loose any data
        value: action.val,
        isValid: validate(action.val, action.validators), // (user input in our field, and validators)
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default: //existing unchanged state
      return state;
  }
};

const Input = (props) => {
  // we have to pass in at least one argument and thats a so called reducer. A reducer is really just a function which receives an action which we can dispatch and it receives the current state. Then we update the current state based on the action we received, return the new state and useReducer will take that new state and give it back to us in the component and re-render everything
  //second argument {} -> is to initial state which we want to initialize
  // inputState -> current state
  // dispatch --> dispatch actions to the reducer function (inputReducer) which will run thorugh the function and return a new state which will then update inputState and re-render the component in the end
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });
  
  // object destructing
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  // useEffect(() => {function that needs to be executed}, [array of dependencies])
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, onInput, isValid]); //whenever these dependencies changes, it will trigger

  //trigger whenever the user enter something (every key stroke)
  //when you have two kind of connected state, we can use useReducer
  // in dispatch we pass and object such a action
  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value, // event is an object we get automatically on the onChange event and event.target is the input element on which this event was triggered and value then simply is the value the user entered
      validators: props.validators,
    });
  };

  //onBlur function
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  //where we can define outside which kind of element we want
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type} // input type => text, password, email etc
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value} //bind the value of input back to inputState.value so that we have this two-way binding going
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler} // Execute a JavaScript when a user leaves an input field
        value={inputState.value}
      />
    );

  return (
    /* if inputState.isValid is false, render the custom css class  */
    <div
      className={`form-control 
      ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element} {/* value of element afterall */}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
      {/* check if it is valid is false, then render the errorText */}
    </div>
  );
};

export default Input;
