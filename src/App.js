import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "./home/pages/Welcome";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPages from "./page/pages/UserPages";
import UpdatePage from "./page/pages/UpdatePage";
import Register from "./user/pages/Register";
import Login from "./user/pages/Login";
import NewPage from "./page/pages/NewPage";
import BaseFormRealEstate from "./template/pages/BaseFormRealEstate";
import BaseFormMusicStore from "./template/pages/BaseFormMusicStore";
import UpdateRealEstate from "./template/pages/UpdateRealEstate";
import UpdateMusicStore from "./template/pages/UpdateMusicStore";
import SharedTemplate from "./shared template/pages/SharedTemplate.js";

import "./App.css";

import Profile from "./user/pages/Profile";
import ProfileEdit from "./user/pages/ProfileEdit";
import EditPage from "./page/pages/EditPage";
import BaseFormAditional from "./template/pages/BaseFormAditional";
import BaseFormAditionalEdit from "./template/pages/BaseFormAditionalEdit";
import AddTeam from "./template/components/AddTeam";
import BaseFormSellClothes from "./template/pages/BaseFormSellClothes";
import SessionExpiredCheck from "./shared/components/Session/SessionExpiredCheck";
import UpdateSellClothes from "./template/pages/UpdateSellClothes";
import BaseFormBookStore from "./template/pages/BaseFormBookStore";
import UpdateBookStore from "./template/pages/UpdateBookStore";

const App = () => {
  // See Notion - React/Router-dom-v6 for Router usage in version 6

  return (
    <BrowserRouter>
      <MainNavigation></MainNavigation>
      <main className="main">
        <Routes>
          {/* Protected routes */}

          {/* PAGES */}
          <Route path="/pages/:pageId" element={<UpdatePage />} />
          <Route path="/pages/new" exact="true" element={<NewPage />} />
          <Route path="/:userId/pages" element={<UserPages />} />
          <Route path="pages/edit/:pageId" element={<EditPage />} />
          {/**************************************************************************************/}

          {/* REAL ESTATE */}
          <Route
            path="/pages/:pageId/formRE"
            element={<BaseFormRealEstate />}
          />
          <Route
            path="/pages/:pageId/RE/:templateId"
            element={<UpdateRealEstate />}
          />
          {/**************************************************************************************/}

          {/* SELL CLOTHES */}
          <Route
            path="/pages/:pageId/formSC"
            element={<BaseFormSellClothes />}
          />
          <Route
            path="/pages/:pageId/SC/:templateId"
            element={<UpdateSellClothes />}
          />
          {/**************************************************************************************/}

          {/* MUSIC STORE */}
          <Route
            path="/pages/:pageId/formMS"
            element={<BaseFormMusicStore />}
          />

          <Route
            path="/pages/:pageId/MS/:templateId"
            element={<UpdateMusicStore />}
          />

          {/**************************************************************************************/}

          {/* BOOK STORE */}
          <Route path="/pages/:pageId/formBS" element={<BaseFormBookStore />} />
          <Route
            path="/pages/:pageId/BS/:templateId"
            element={<UpdateBookStore />}
          />

          {/**************************************************************************************/}

          {/* SHARED TEMPLATES */}
          <Route path="/DT/:url" element={<SharedTemplate />} />
          {/**************************************************************************************/}

          {/* PROFILE */}
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/:userId/edit-profile" element={<ProfileEdit />} />
          {/**************************************************************************************/}

          {/* SECTIONS */}
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
          {/**************************************************************************************/}

          {/* OTHER ROUTES */}
          <Route path="/home" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/*" element={<SessionExpiredCheck />} />
          {/**************************************************************************************/}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
