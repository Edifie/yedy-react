import React, { Component } from "react";
import "./MainForm.css";
import name from "./name.jpg";

export class FormName extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { handleChange } = this.props;
    return (
      <div className="wrapper">
        <div className="box item1">
          <label>Give a name to your company</label>
          <hr />
        </div>

        <div className="box item2">
          <input
            type="text"
            placeholder="Company name"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="box item3">
          <img src={name} alt="responsive" />
        </div>

        <div className="box item4">
          <button onClick={this.continue}>Continue</button>
        </div>

        <div className="box item5">
          <button onClick={this.back}>Back</button>
        </div>
      </div>
    );
  }
}

export default FormName;
