import React, { useState } from "react";
import axios from "axios";
import './styles/SchoolForm.css';

function SchoolForm({ onSchoolAdded, setFieldsFilled }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [inputError, setInputError] = useState("");

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name){
      setInputError("Name cannot be empty");
      return;
    }
    else if (!address){
      setInputError("Address cannot be empty");
      return;
    }
    else if (!description){
      setInputError("Description cannot be empty");
      return;
    }
    else{
      const response = await axios.post("/api/schools", {
          name,
          address,
          description,
      });

      onSchoolAdded(response.data);
      console.log(response.data);
    }
  };

  return (
  <div className="student-form-container">
    <p className="form-title">Add a new school:</p>
    <form className="student-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Name:
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setInputError("");
          }}
        />
        {inputError && <p className="error-message">{inputError}</p>}
      </label>
      <label className="form-label">
        Address:
        <input
          className="form-input"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label className="form-label">
        Description:
        <input
          className="form-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button className="submit-button" type="submit">Submit</button>
    </form>
  </div>
  );
}

export default SchoolForm;