import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStudents();
  }, []);

  const addStudent = (newStudent) => {
      setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const removeStudent = (studentId) => {
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
  }

  const handleStudentUpdate = (updatedStudent) => {
      console.log(updatedStudent);
      setStudents((prevStudents) => 
          prevStudents.map((student) => 
              student.id == updatedStudent.id ? updatedStudent : student
          )
      );
  };

  const orderStudents = (students) => {
    setStudents([...students]);
  };

  return (
    <StudentContext.Provider value={{students, setStudents, addStudent, removeStudent, handleStudentUpdate, orderStudents}}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => useContext(StudentContext);
