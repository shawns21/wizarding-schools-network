import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./Main";
import SchoolList from "./SchoolList";
import StudentList from "./StudentList";
import Navbar from "./Navbar";
import StudentView from "./StudentView";
import { StudentProvider } from "./StudentContext";
import { SchoolProvider } from "./SchoolContext";
import SchoolView from "./SchoolView";

const Root = () => {
  return (
    <div className="navigation">
      <SchoolProvider>
        <StudentProvider>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/schools" element={<SchoolList />} />
            <Route path="/schools/:schoolId" element={<SchoolView />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:studentId" element={<StudentView />} />
          </Routes>
        </StudentProvider>
      </SchoolProvider>
    </div>
  );
};

export default Root;
