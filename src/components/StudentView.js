import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useStudentContext } from "./StudentContext";
import StudentUpdateForm from "./StudentUpdateForm";

const StudentView = () => {
  
  const { studentId } = useParams();
  const { handleStudentUpdate, setStudents } = useStudentContext();
  const [studentDetails, setStudentDetails] = useState(null);

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
    <div id="main">
      <h1>Student Details</h1>
      {studentDetails ? (
        <div>
            <img src={studentDetails.imageUrl}/>
            <p>{studentDetails.firstName}, {studentDetails.lastName}</p>
            <p>{studentDetails.email}</p>
            <p>Score: {studentDetails.magicalAbilityScore}</p> 
            {studentDetails.wizardingschool ? (
              <Link to={`/schools/${studentDetails.wizardingschool.id}`}>
                <div>
                  <img src={studentDetails.wizardingschool.imageUrl} />
                  <p>{studentDetails.wizardingschool.name}</p>
                </div>
              </Link>
            ) : (
              <p>Not in a school</p>
            )
            }
            <StudentUpdateForm student={studentDetails} handleUpdate={handleUpdate}></StudentUpdateForm>
        </div>
      ) : (
        <p>Student doesnt exist</p>
      )}
    </div>
  );
};

export default StudentView;
