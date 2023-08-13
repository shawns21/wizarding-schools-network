import React, { useState } from "react";
import axios from "axios";
import { useSchoolContext } from "./SchoolContext";

function StudentForm({ onStudentAdded }) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState("");
  const [ schools ] = useSchoolContext();

  
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
    else{
      const response = await axios.post("/api/students", {
          firstName,
          lastName,
          email,
      });

      onStudentAdded(response.data);
      setInputError("");
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => {setfirstName(e.target.value)}}
        />
        {inputError && <p>{inputError}</p>}
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentForm;