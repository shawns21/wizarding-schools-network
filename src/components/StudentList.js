import React from "react";
import { useStudentContext } from "./StudentContext";
import { Link } from "react-router-dom";

const StudentList = () => {
  const { students } = useStudentContext();

  if (!students) {
    return <p>Loading students...</p>;
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
    </div>
  );
};

export default StudentList;