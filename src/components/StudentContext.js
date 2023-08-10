import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]); // Initialize with an empty array

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data); // Set the students data
      } catch (error) {
        console.error(error);
      }
    }

    fetchStudents();
  }, []);

  const addStudent = (newStudent) => {
        setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <StudentContext.Provider value={{students, setStudents, addStudent}}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => useContext(StudentContext);
