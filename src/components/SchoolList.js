import React from "react";
import { useSchoolContext } from "./SchoolContext";
import { Link } from "react-router-dom";

const SchoolList = () => {

  const { schools } = useSchoolContext();
  
  if (!schools) {
    return <p>Loading students....</p>;
  }

  return (
    <div id="main">
      <h1>School List</h1>
        {schools.map((school) => (
            <Link to={`/schools/${school.id}`}>
              <div>
                <img src={school.imageUrl} />
                <p>{school.name}</p>
              </div>
            </Link>
        ))}
    </div>
  );
};

export default SchoolList;