import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    //A react lib for animation when adding item to DOM.
    /* Expect to get a show props on SideDrawer, when it is true it is visible vice versa*/
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter   //add to DOM
      unmountOnExit  //remove from DOM
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  /* To render the Side drawer in above the root in index.html */
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
