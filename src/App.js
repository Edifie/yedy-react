import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "./home/pages/Welcome";
import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPages from "./page/pages/UserPages";
import UpdatePage from "./page/pages/UpdatePage";
import Register from "./user/pages/Register";
import Login from "./user/pages/Login";
import NewPage from "./page/pages/NewPage";
import BaseFormRealEstate from "./template/pages/BaseFormRealEstate"
import ExampleImageUpload from "./template/pages/ExampleImageUpload";


const App = () => {
  // We wrap this aroung everthing that is part of the app that should be able to use the router.
  // See Notion - React/Router-dom-v6 for Router usage in version 6

  return (
    <BrowserRouter>
      <MainNavigation></MainNavigation>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/users" element={<Users />} />
          <Route path="/:userId/pages" element={<UserPages />} />
          <Route path="/pages/new" exact="true" element={<NewPage />} />
          <Route path="/pages/:pageId" element={<UpdatePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pages/:pageId/formRE" element={<BaseFormRealEstate />} />


        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
