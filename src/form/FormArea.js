import React, { Component } from "react";
import "./MainForm.css";
import area from "./area.jpg";

export class FormArea extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { handleRadioChange } = this.props;
    return (
        <div className="wrapper">
          <div className="box item1">
            <label>What kind of website are you creating?</label>
            <hr />
          </div>

          <div className="box item2">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="area"
                  value="real estate"
                  onChange={handleRadioChange}
                />
                Real Estate
              </label>
            </div>

            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="area"
                  value="sell clothes"
                  onChange={handleRadioChange}
                />
                Sell Clothes
              </label>
            </div>

            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="area"
                  value="hardware store"
                  onChange={handleRadioChange}
                />
                Hardware Store
              </label>
            </div>
          </div>

          <div className="box item3">
            <img src={area} alt="tema" />
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

export default FormArea;
