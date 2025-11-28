import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";

import * as Config from "../constants/Config";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home page at root "/" */}
      <Route path="/" element={<Home />} />

      {/* Search page */}
      <Route
        path={`/${Config.HOME_PAGE}/:category/search/:keyword`}
        element={<Catalog />}
      />
      {/* Detail page */}
      <Route
        path={`/${Config.HOME_PAGE}/:category/:id`}
        element={<Detail />}
      />
      {/* Catalog page */}
      <Route
        path={`/${Config.HOME_PAGE}/:category`}
        element={<Catalog />}
      />
    </Routes>
  );
};

export default AppRoutes;
