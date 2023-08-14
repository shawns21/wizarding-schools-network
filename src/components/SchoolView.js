import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSchoolContext } from "./SchoolContext";
import SchoolUpdateForm from "./SchoolUpdateForm";
import './styles/SchoolView.css';

const SchoolView = () => {
  
  const { schoolId } = useParams();
  const { handleSchoolUpdate, setSchools } = useSchoolContext();
  const [schoolDetails, setSchoolDetails] = useState(null);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await axios.get(`/api/schools/${schoolId}`)
        setSchoolDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchSchools();

  }, [schoolId]);

  const handleUpdate = async (updatedSchoolDetails) => {
    try {
      await axios.put(`/api/schools/${schoolId}`, updatedSchoolDetails);
      console.log("School updated successfully!");

      setSchools((prevSchools) =>
        prevSchools.map((school) =>
          school.id === schoolId ? updatedSchoolDetails : school
        )
      );

      setSchoolDetails(updatedSchoolDetails);
      handleSchoolUpdate(updatedSchoolDetails);
    
    } catch (error) {
      console.error("Error updating school:", error);
    }
  };

  const UnenrollStudent = async (student) => {
    try {
      // Make a request to the backend to unenroll the student
      const updatedStudent = { ...student, wizardingschoolId: null };
      const response = await axios.put(`/api/students/${student.id}`, updatedStudent);
      
      const updatedStudentsList = schoolDetails.students.filter((s) => s.id !== student.id);

      // Update the schoolDetails with the updated students list
      setSchoolDetails((prevDetails) => ({
        ...prevDetails,
        students: updatedStudentsList,
      }));

      console.log(`Student ${student.id} unenrolled successfully.`);
    } catch (error) {
      console.error(`Error unenrolling student ${student.id}:`, error);
    }
  };

  return (
    <div className="school-details-container">
      <h1 className="page-title">School Details</h1>
      {schoolDetails ? (
        <div className="details-content">
          <div className="school-info">
            <img src={schoolDetails.imageUrl} alt={schoolDetails.name} className="school-image" />
            <p className="school-name">{schoolDetails.name}</p>
            <p className="school-address">{schoolDetails.address}</p>
            <p className="school-description">{schoolDetails.description}</p>
          </div>
          <div className="students-list">
            <h2 className="students-title">Students</h2>
            {schoolDetails.students.length > 0 ? (
              schoolDetails.students.map((student) => (
                <div key={student.id} className="student-item">
                  <button className="unenroll-button" onClick={() => UnenrollStudent(student)}>Unenroll Student</button>
                  <Link to={`/students/${student.id}`} className="student-link">
                    <div className="student-info">
                      <img src={student.imageUrl} alt={`${student.firstName} ${student.lastName}`} className="student-image" />
                      <p className="student-name">{student.firstName} {student.lastName}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="no-students">No Students</p>
            )}
          </div>
          <SchoolUpdateForm school={schoolDetails} handleUpdate={handleUpdate} />
        </div>
      ) : (
        <p className="no-school">School doesn't exist</p>
      )}
    </div>
  );
};

export default SchoolView;
