import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./Main";
import SchoolList from "./SchoolList";

const Root = () => {
  return (
    <div className="navigation">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/schools" element={<SchoolList />} />
      </Routes>
    </div>
  );
};

export default Root;
