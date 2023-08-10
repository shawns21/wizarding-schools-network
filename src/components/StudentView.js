import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentView = () => {
  
  const { studentId } = useParams();
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

  return (
    <div id="main">
      <h1>Student Details</h1>
      {studentDetails ? (
        <div>
            <img src={studentDetails.imageUrl}/>
            <p>{studentDetails.firstName}, {studentDetails.lastName}</p>
            <p>{studentDetails.email}</p>
            <p>{studentDetails.magicAbilityScore}</p>
            {studentDetails.wizardingschool ? (
              <p>{studentDetails.wizardingschool.name}</p>) : (<p>Loading School.....</p>)}
        </div>
      ) : (
        <p>Student doesnt exist</p>
      )}
    </div>
  );
};

export default StudentView;
