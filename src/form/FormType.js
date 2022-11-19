import React, { Component } from "react";
import "./MainForm.css";
import responsive from './responsive.jpg'

export class FormType extends Component {

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { handleRadioChange } = this.props;
    return (
      
      <div className="wrapper">
        <div className="box item1">
          <label>What is your design of choice?</label>
          <hr />
        </div>

        <div className="box item2">
          <div className="radio">
            <label>
              <input
                type="radio"
                name="type"
                value='basic'
                onChange={handleRadioChange}
              />
              Basic
            </label>
          </div>

          <div className="radio">
            <label>
              <input
                type="radio"
                name="type"
                value="responsive"
                onChange={handleRadioChange}
              />
              Responsive
            </label>
          </div>
        </div>

        <div className="box item3">
          <img src={responsive} alt="responsive" />
        </div>

        <div className="box item4">
          <button onClick={this.continue}>Confirm</button>
        </div>

        <div className="box item5">
          <button onClick={this.back}>Back</button>
        </div>
      </div>
    );
  }
}

export default FormType;
