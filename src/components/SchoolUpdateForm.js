import React, { useState } from "react";

const SchoolUpdateForm = ({ school, handleUpdate }) => {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "description") {
      setDescription(value);
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault(); 

    const updatedSchool = {
      ...school,
      name: name,
      address: address,
      description: description,
    };

    handleUpdate(updatedSchool);
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <label className="form-label">Name:</label>
    <input
      className="form-input"
      type="text"
      name="name"
      value={name}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label className="form-label">Address:</label>
    <input
      className="form-input"
      type="text"
      name="address"
      value={address}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label className="form-label">Description:</label>
    <input
      className="form-input"
      type="text"
      name="description"
      value={description}
      onChange={handleChange}
    />
  </div>
  <button className="submit-button" type="submit">Save</button>
  </form>
  );
};

export default SchoolUpdateForm;
