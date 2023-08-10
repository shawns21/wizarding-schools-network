import React, { useState } from "react";
import axios from "axios";

function StudentForm({ onStudentAdded }) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/students", {
        firstName,
        lastName,
        email,
    });

    onStudentAdded(response.data);
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentForm;