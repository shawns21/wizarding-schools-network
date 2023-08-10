import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./Main";
import SchoolList from "./SchoolList";
import StudentList from "./StudentList";
import Navbar from "./Navbar";
import StudentView from "./StudentView";
import { StudentProvider } from "./StudentContext";

const Root = () => {
  return (
    <div className="navigation">
      <StudentProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/wizarding-schools" element={<SchoolList />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/:studentId" element={<StudentView />} />
        </Routes>
      </StudentProvider>
    </div>
  );
};

export default Root;
