import React, { Component } from "react";
import "./MainForm.css";
import tema from "./tema.jpg";

export class FormTema extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { handleRadioChange, values } = this.props;
    return (
      <div className="wrapper">
        <div className="box item1">
          <label>What is your tema of choice?</label>
          <hr />
        </div>

        <div className="box item2">
          <div className="radio">
            <label>
              <input
                type="radio"
                name="tema"
                value="basic"
                onChange={handleRadioChange}
                checked={values.tema === "basic"}
              />
              Basic
            </label>
          </div>

          <div className="radio">
            <label>
              <input
                type="radio"
                name="tema"
                value="boho"
                onChange={handleRadioChange}
                checked={values.tema === "boho"}
              />
              Boho
            </label>
          </div>

          <div className="radio">
            <label>
              <input
                type="radio"
                name="tema"
                value="minimal"
                onChange={handleRadioChange}
                checked={values.tema === "minimal"}
              />
              Minimal
            </label>
          </div>
        </div>

        <div className="box item3">
          <img src={tema} alt="tema" />
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

export default FormTema;
