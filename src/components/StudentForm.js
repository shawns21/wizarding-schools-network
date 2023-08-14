import React, { useState } from "react";
import axios from "axios";
import { useSchoolContext } from "./SchoolContext";
import './styles/StudentForm.css';

function StudentForm({ onStudentAdded }) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [wizardingschoolId, setWizardingSchoolId] = useState(null);
  const [inputError, setInputError] = useState("");
  const { schools } = useSchoolContext();

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName){
      setInputError("First name cannot be empty");
      return;
    }
    else if (!lastName){
      setInputError("Last name cannot be empty");
      return;
    }
    else if (!email){
      setInputError("Email cannot be empty");
      return;
    }
    else if (!wizardingschoolId){
      setInputError("You must pick a school");
      return;
    }
    else{
      const response = await axios.post("/api/students", {
          firstName,
          lastName,
          email,
          wizardingschoolId,
      });

      onStudentAdded(response.data);
      setInputError("");
    };
  };

  return (
  <div className="student-form-container">
    <p className="form-title">Add a new student:</p>
    <form className="student-form" onSubmit={handleSubmit}>
      <label className="form-label">
        First Name:
        <input
          className="form-input"
          type="text"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
        />
        {inputError && <p className="error-message">{inputError}</p>}
      </label>
      <label className="form-label">
        Last Name:
        <input
          className="form-input"
          type="text"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
      </label>
      <label className="form-label">
        Email:
        <input
          className="form-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="form-label">
        Select a School:
        <select className="form-select" onChange={(e) => setWizardingSchoolId(e.target.value)}>
          <option value="">Select a School</option>
          {schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
      </label>
      <button className="submit-button" type="submit">Submit</button>
    </form>
  </div>
  );

}

export default StudentForm;