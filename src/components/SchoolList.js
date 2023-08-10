import React from "react";
import { useSchoolContext } from "./SchoolContext";
import { Link } from "react-router-dom";
import SchoolForm from "./SchoolForm";

const SchoolList = () => {

  const { schools, addSchool } = useSchoolContext();
  
  if (!schools) {
    return <p>Loading students....</p>;
  }

  const handleSchoolAdded = (newSchool) => {
    addSchool(newSchool);
  }

  return (
    <div id="main">
      <h1>School List</h1>
        {schools.map((school) => (
            <Link to={`/schools/${school.id}`} key={school.id}>
              <div>
                <img src={school.imageUrl} />
                <p>{school.name}</p>
              </div>
            </Link>
        ))}
        <SchoolForm onSchoolAdded={handleSchoolAdded}></SchoolForm>
    </div>
  );
};

export default SchoolList;