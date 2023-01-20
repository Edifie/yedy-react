import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Welcome from "./home/pages/Welcome";
import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPages from "./page/pages/UserPages";
import UpdatePage from "./page/pages/UpdatePage";
import Register from "./user/pages/Register";
import Login from "./user/pages/Login";
import NewPage from "./page/pages/NewPage";
import BaseFormRealEstate from "./template/pages/BaseFormRealEstate";
import UpdateTemplate from "./template/pages/UpdateRealEstate";
import SharedRealEstate from "./shared template/pages/SharedRealEstate.js";
import FormItemDetail from "./template/components/FormItemDetail";

import "./App.css";

import Profile from "./user/pages/Profile";
import ProfileEdit from "./user/pages/ProfileEdit";
import EditPage from "./page/pages/EditPage";
import BaseFormAditional from "./template/pages/BaseFormAditional";
import BaseFormAditionalEdit from "./template/pages/BaseFormAditionalEdit";
import AddTeam from "./template/components/AddTeam";
import BaseFormSellClothes from "./template/pages/BaseFormSellClothes";
import SessionExpiredCheck from "./shared/components/Session/SessionExpiredCheck";

const App = () => {
  // See Notion - React/Router-dom-v6 for Router usage in version 6

  return (
    <BrowserRouter>
      <MainNavigation></MainNavigation>
      <main className="main">
        <Routes>
          {/* Protected routes */}

          <Route path="/users" component={<Users />} />
          <Route path="/pages/:pageId" element={<UpdatePage />} />
          <Route path="/pages/new" exact="true" element={<NewPage />} />
          <Route path="/:userId/pages" element={<UserPages />} />
          <Route
            path="/pages/:pageId/formRE"
            element={<BaseFormRealEstate />}
          />
          <Route
            path="/pages/:pageId/:templateId"
            element={<UpdateTemplate />}
          />
          <Route path="/DT/:url" element={<SharedRealEstate />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/:userId/edit-profile" element={<ProfileEdit />} />
          <Route
            path="/pages/details/:templateId"
            element={<FormItemDetail />}
          />
          <Route path="pages/edit/:pageId" element={<EditPage />} />
          <Route
            path="pages/:pageId/aditional-section"
            element={<BaseFormAditional />}
          />
          <Route
            path="pages/:pageId/aditional-section-edit"
            element={<BaseFormAditionalEdit />}
          />

          <Route
            path="pages/:pageId/aditional-section/add-team/:sectionId"
            element={<AddTeam />}
          />

          <Route
            path="/pages/:pageId/formSC"
            element={<BaseFormSellClothes />}
          />

          <Route path="/home" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/*" element={<SessionExpiredCheck />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
