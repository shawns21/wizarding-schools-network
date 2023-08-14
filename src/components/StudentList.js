import React from "react";
import { useStudentContext } from "./StudentContext";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";
import axios from "axios";
import './styles/StudentList.css';
import StudentOrderForm from './StudentOrderForm';

const StudentList = () => {
  const { students, addStudent, removeStudent, orderStudents} = useStudentContext();
  
  if (!students) {
    return <p>Loading students...</p>;
  }

  const handleStudentAdded = (newStudent) => {
    addStudent(newStudent);
  }

  const handleStudentRemoved = async (id) => {
    await axios.delete(`/api/students/${id}`);
    removeStudent(id);
  }

  const handleStudentOrdered = (orderedStudents) => {
    orderStudents(orderedStudents);
  }

  return (
  <div className="main-container">
    <div className="side-panel">
      <StudentOrderForm students={students} handleStudentOrdered={handleStudentOrdered} />
    </div>
    
    <div className="student-list-container">
      <h1 className="page-title">Student List</h1>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-item">
            <Link to={`/students/${student.id}`} className="student-link">
              <img src={student.imageUrl} alt={`${student.firstName} ${student.lastName}`} className="student-image" />
              <p className="student-name">{student.firstName} {student.lastName}</p>
            </Link>
            <button className="delete-button" onClick={() => handleStudentRemoved(student.id)}>Delete User</button>
          </div>
        ))}
      </div>
      <br/>
      <StudentForm onStudentAdded={handleStudentAdded} />
    </div>
  </div>
);
};

export default StudentList;