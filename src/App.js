import React from "react";
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
import ProtectedRoutes from "./ProtectedRoute";
import Profile from "./user/pages/Profile";
import ProfileEdit from "./user/pages/ProfileEdit";
import EditPage from "./page/pages/EditPage"

const App = () => {
  // See Notion - React/Router-dom-v6 for Router usage in version 6

  return (
    <BrowserRouter>
      <MainNavigation></MainNavigation>
      <main className="main">
        <Routes>
          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoutes />}>
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
          </Route>

          <Route path="/home" element={<Welcome />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
