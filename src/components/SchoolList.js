import React, { useState } from "react";
import { useSchoolContext } from "./SchoolContext";
import { Link } from "react-router-dom";
import SchoolForm from "./SchoolForm";
import axios from "axios";

const SchoolList = () => {

  const { schools, addSchool, removeSchool } = useSchoolContext();
  const [fieldsFilled, setFieldsFilled] = useState(false);
  
  if (!schools) {
    return <p>Loading students....</p>;
  }

  const handleSchoolAdded = (newSchool) => {
    addSchool(newSchool);
  }

  const handleSchoolRemoved = async (id) => {
    await axios.delete(`/api/schools/${id}`);
    removeSchool(id);
  }

  return (
    <div id="main">
      <h1>School List</h1>
        {schools.map((school) => (
          <div>
            <button onClick={() => handleSchoolRemoved(school.id)}>Delete user</button>
            <Link to={`/schools/${school.id}`} key={school.id}>
              <div>
                <img src={school.imageUrl} />
                <p>{school.name}</p>
              </div>
            </Link>
          </div>
        ))}
        <SchoolForm onSchoolAdded={handleSchoolAdded} setFieldsFilled={setFieldsFilled}></SchoolForm>
    </div>
  );
};

export default SchoolList;