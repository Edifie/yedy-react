import React, { Component } from "react";

import FormType from "./FormType";
import FormTema from "./FormTema";
import FormName from "./FormName";
import FormArea from "./FormArea";
import Confirm from "./Confirm";


export class UserForm extends Component {



  state = {
    step: 1,
    tema: "",
    area: "",
    type: "",
    name: "",
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // Handle fields change (text)
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
    console.log(e.target.value)
  };

  // Handle fields change (radio)
  handleRadioChange = (e) =>{
    const target = e.target;
    this.setState({ [target.name] : target.value})
    console.log(target.value)
  }

  

  render() {
    const { step } = this.state;
    const { area, name, type, tema } = this.state;
    const values = { area, name, type, tema };

    switch (step) {
      case 1:
        return (
          <FormArea
            nextStep={this.nextStep}
            handleChange={this.handleRadioChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormTema
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleRadioChange}
            values={values}
          />
        );
      case 3:
        return (
          <FormName
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 4:
        return (
          <FormType
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleRadioChange}
            values={values}
          />
        );
      case 5:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      default:
          <FormArea />
    }
  }
}

export default UserForm;
