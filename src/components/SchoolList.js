import React, { useState } from "react";
import { useSchoolContext } from "./SchoolContext";
import { Link } from "react-router-dom";
import SchoolForm from "./SchoolForm";
import SchoolOrderForm from "./SchoolOrderForm";
import axios from "axios";
import './styles/SchoolList.css';

const SchoolList = () => {

  const { schools, addSchool, removeSchool, orderSchools } = useSchoolContext();
  const [fieldsFilled, setFieldsFilled] = useState(false);
  
  if (!schools) {
    return <p>Loading schools....</p>;
  }

  const handleSchoolAdded = (newSchool) => {
    addSchool(newSchool);
  }

  const handleSchoolRemoved = async (id) => {
    await axios.delete(`/api/schools/${id}`);
    removeSchool(id);
  }

  const handleSchoolOrdered = (orderedSchools) => {
    orderSchools(orderedSchools);
  }

  return (
  <div className="main-container">
    <div className="side-panel">
      <SchoolOrderForm schools={schools} handleSchoolOrdered={handleSchoolOrdered} />
    </div>

    <div className="school-list-container">
      <h1 className="page-title">School List</h1>
      <div className="school-list">
        {schools.map((school, index) => (
          <div key={school.id} className="school-item">
            <div className="school-info">
              <Link to={`/schools/${school.id}`} className="school-link">
                <img src={school.imageUrl} alt={school.name} className="school-image" />
                <p className="school-name">{school.name}</p>
              </Link>
            </div>
            <button className="delete-button" onClick={() => handleSchoolRemoved(school.id)}>Delete School</button>
            {index !== schools.length - 1 && <div className="separator" />}
          </div>
        ))}
        </div>
        <br/>
        <SchoolForm onSchoolAdded={handleSchoolAdded} setFieldsFilled={setFieldsFilled} />
      </div>
    </div>
);

};


export default SchoolList;

