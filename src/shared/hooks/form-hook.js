import { useCallback, useReducer } from "react";
//custom hook

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      //go through all the inputs that we have in my form here and check if the all inputs are valid
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }

        if (inputId === action.inputId) {
          //looking at the inputs and checking the input that we are currently looking at, the input which is getting updated in (INPUT_CHANGE) in this current action, if that is the case, we will take the information from the dispatch action on wheter is valid or not
          formIsValid = formIsValid && action.isValid;
        } else {
          //if we are looking at an input in form state which is not currenly getting updated thorugh the currenly runnin action
          formIsValid = formIsValid && state.inputs[inputId].isValid; // take the stored value (stored validity) for this input because it is the input we're not currently updating with this action(INPUT_CHANGE)
        }
      }

      //return a new state
      return {
        ...state, //copy the existing state
        inputs: {
          ...state.inputs, //current inputs state
          //overwrite
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };

      case 'SET_DATA':
        return {
            inputs: action.inputs,
            isValid: action.isValid
        }
        default:
            return state //unchanged state
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
