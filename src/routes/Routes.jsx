import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";

const AppRoutes = () => {
  return (
    <Routes>
      
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Catalog */}
      <Route path="/:category" element={<Catalog />} />

      {/* Search */}
      <Route path="/:category/search/:keyword" element={<Catalog />} />

      {/* Detail */}
      <Route path="/:category/:id" element={<Detail />} />

    </Routes>
  );
};

export default AppRoutes;
