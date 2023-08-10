import React from "react";
import { useStudentContext } from "./StudentContext";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";

const StudentList = () => {
  const { students, addStudent } = useStudentContext();

  if (!students) {
    return <p>Loading students...</p>;
  }

  const handleStudentAdded = (newStudent) => {
    addStudent(newStudent);
  }

  return (
    <div id="main">
      <h1>Student List</h1>
        {students.map((student) => (
            <Link to={`/students/${student.id}`}>
              <div>
                <img src={student.imageUrl} />
                <p>{student.firstName} {student.lastName}</p>
              </div>
            </Link>
        ))}
        <StudentForm onStudentAdded={handleStudentAdded}></StudentForm>
    </div>
  );
};

export default StudentList;