import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useStudentContext } from "./StudentContext";
import StudentUpdateForm from "./StudentUpdateForm";
import { useSchoolContext } from "./SchoolContext";
import './styles/StudentView.css';

const StudentView = () => {

   
  const { studentId } = useParams();
  const { handleStudentUpdate, setStudents } = useStudentContext();
  const [studentDetails, setStudentDetails] = useState(null);
  const { schools } = useSchoolContext();

  useEffect(() => {

    async function fetchStudent() {
      try {
        const response = await axios.get(`/api/students/${studentId}`)
        setStudentDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchStudent();

  }, [studentId]);

  const handleUpdate = async (updatedStudentDetails) => {
    try {
      await axios.put(`/api/students/${studentId}`, updatedStudentDetails);
      console.log("Student updated successfully!");

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId ? updatedStudentDetails : student
        )
      );
      
      setStudentDetails(updatedStudentDetails);
      handleStudentUpdate(updatedStudentDetails);
    
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
  <div className="student-details-container">
    <h1 className="page-title">Student Details</h1>
    {studentDetails ? (
      <div className="details-content">
        <img src={studentDetails.imageUrl} alt={`${studentDetails.firstName} ${studentDetails.lastName}`} className="student-image" />
        <p className="student-name">{studentDetails.firstName}, {studentDetails.lastName}</p>
        <p className="student-email">{studentDetails.email}</p>
        <p className="student-score">Score: {studentDetails.magicalAbilityScore}</p>
        {studentDetails.wizardingschoolId ? (
          <div className="student-school">
            {schools.map((school) =>
              school.id === parseInt(studentDetails.wizardingschoolId) ? (
                <Link to={`/schools/${school.id}`} className="school-link">
                  <div className="school-info">
                    <img src={school.imageUrl} alt={school.name} className="school-image" />
                    <p className="school-name">{school.name}</p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : (
          <p className="no-school">Not in a school</p>
        )}
        <StudentUpdateForm student={studentDetails} handleUpdate={handleUpdate} />
      </div>
    ) : (
      <p className="no-student">Student doesn't exist</p>
    )}
  </div>
);
};

export default StudentView;
