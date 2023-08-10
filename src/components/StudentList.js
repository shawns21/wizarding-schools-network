import React from "react";
import { useStudentContext } from "./StudentContext";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";
import axios from "axios";

const StudentList = () => {
  const { students, addStudent, removeStudent } = useStudentContext();

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

  return (
    <div id="main">
      <h1>Student List</h1>
        {students.map((student) => (
          <div>
            <button onClick={() => {handleStudentRemoved(student.id)}}>Delete user</button>
            <Link to={`/students/${student.id}`}>
              <div>
                <img src={student.imageUrl} />
                <p>{student.firstName} {student.lastName}</p>
              </div>
            </Link>
          </div>
        ))}
        <StudentForm onStudentAdded={handleStudentAdded}></StudentForm>
    </div>
  );
};

export default StudentList;