import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from '../../components/UIElements/Backdrop';

import "./MainNavigation.css";
import logo from "./letter-y.png";



/* What will render here, it will render in {props.children} in MainHeader.js */
const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (

/* Wrap to get one root element (parent) */
<React.Fragment>
     {/* Rendered in index.html */}
     {drawerIsOpen && 
     <Backdrop onClick={closeDrawerHandler}></Backdrop>}

    <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
            <NavLinks></NavLinks>
        </nav>
    </SideDrawer>

    <MainHeader>
      <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
        {/* Hamburger item */}
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <img src={logo} alt="logo"></img>
        <Link to="/">YEDY</Link>
      </h1>
      <nav className="main-navigation__header-nav">
        <NavLinks></NavLinks>
      </nav>
    </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
