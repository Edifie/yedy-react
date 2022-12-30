import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import FormItemDetail from "./FormItemDetail";

import "./SideDrawerTemplate.css";

const SideDrawerTemplate = (props) => {
  const content = (
    //A react lib for animation when adding item to DOM.
    /* Expect to get a show props on SideDrawer, when it is true it is visible vice versa*/
    <CSSTransition
      in={props.show}
      timeout={100}
      mountOnEnter //add to DOM
      unmountOnExit //remove from DOM
    >
      <div className="side-drawer__template" >
        <button className="side-drawer__template-button" onClick={props.onClick}> Back</button>
        {props.children}
      </div>
    </CSSTransition>
  );

  /* To render the Side drawer in above the root in index.html */
  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook-template")
  );
};

export default SideDrawerTemplate;
