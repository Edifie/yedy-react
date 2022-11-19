import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Welcome from "./home/pages/Welcome";
import MainForm from "./form/MainForm";
import Users from './user/pages/Users';
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPages from "./page/pages/UserPages";



const App = () => {
  // We wrap this aroung everthing that is part of the app that should be able to use the router.
  // See Notion - React/Router-dom-v6 for Router usage in version 6
  return (
    <BrowserRouter>
      <MainNavigation></MainNavigation>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path='/users' element={<Users/>}/>
          <Route path="/:userId/pages" element={<UserPages />}/>
          <Route path="/forms" element={<MainForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
