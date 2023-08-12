import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSchoolContext } from "./SchoolContext";
import SchoolUpdateForm from "./SchoolUpdateForm";

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
    <div id="main">
      <h1>School Details</h1>
      {schoolDetails ? (
        <div>
            <img src={schoolDetails.imageUrl}/>
            <p>{schoolDetails.name}</p>
            <p>{schoolDetails.address}</p>
            <p>{schoolDetails.description}</p>
            <p>Students</p>

            {schoolDetails.students.length > 0 ? (
              schoolDetails.students.map((student) => (
                <div>
                  <button onClick={() => {UnenrollStudent(student)}}>Unenroll Student</button>
                  <Link to={`/students/${student.id}`}>
                    <div>
                      <img src={student.imageUrl} />
                      <p>{student.firstName} {student.lastName}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No Students</p>
            )}
            <SchoolUpdateForm school={schoolDetails} handleUpdate={handleUpdate}></SchoolUpdateForm>
       </div>
      ) : (
        <p>School doesnt exist</p>
      )}
    </div>
  );
};

export default SchoolView;
