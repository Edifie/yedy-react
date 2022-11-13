import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./home/components/Welcome";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  // We wrap this aroung everthing that is part of the app that should be able to use the router.
  // See Notion - React/Router-dom-v6 for Router usage in version 6
  return (
    <BrowserRouter>
      <MainNavigation></MainNavigation>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
