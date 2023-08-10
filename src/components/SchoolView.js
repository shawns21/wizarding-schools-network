import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSchoolContext } from "./SchoolContext";
import SchoolUpdateForm from "./SchoolUpdateForm";

const SchoolView = () => {
  
  const { schoolId } = useParams();
  const { schools, setSchools } = useSchoolContext();
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSchoolDetails((prevSchoolDetails) => ({
      ...prevSchoolDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/api/schools/${schoolId}`, schoolDetails);
      console.log("School updated successfully!");

      setSchools((prevSchools) =>
        prevSchools.map((school) =>
          school.id === schoolId ? schoolDetails : school
        )
      );
    } catch (error) {
      console.error("Error updating school:", error);
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
                <Link to={`/students/${student.id}`}>
                  <div>
                    <img src={student.imageUrl} />
                    <p>{student.firstName} {student.lastName}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No Students</p>
            )}
            <SchoolUpdateForm school={schoolDetails} handleInputChange={handleInputChange} handleSubmit={handleSubmit}></SchoolUpdateForm>
       </div>
      ) : (
        <p>School doesnt exist</p>
      )}
    </div>
  );
};

export default SchoolView;
