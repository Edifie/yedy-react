import React, { Component } from "react";

export class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { area, type, name, tema },
    } = this.props;

    return (
      <div>
        <h1>Confirm details</h1>
        <h3>Tema : {tema}</h3>
        <h3>Area : {area}</h3>
        <h3>Name: {name}</h3>
        <h3>Type: {type}</h3>

        <br />

        <button onClick={this.back}>
          Back
        </button>

        <button onClick={this.continue}>
          Confirm & Continue
        </button>
      </div>
    );
  }
}

export default Confirm;
