import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const SchoolView = () => {
  
  const { schoolId } = useParams();
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

  return (
    <div id="main">
      <h1>School Details</h1>
      {schoolDetails ? (
        <div>
            <img src={schoolDetails.imageUrl}/>
            <p>{schoolDetails.name}</p>
            {schoolDetails.students.map((student) => (
              <Link to={`/students/${student.id}`}>
                <div>
                  <img src={student.imageUrl} />
                  <p>{student.firstName} {student.lastName}</p>
                </div>
              </Link>
            ))}
       </div>
      ) : (
        <p>School doesnt exist</p>
      )}
    </div>
  );
};

export default SchoolView;
