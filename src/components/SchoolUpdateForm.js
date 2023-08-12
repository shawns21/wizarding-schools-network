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
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <label>Address:</label>
      <input
        type="text"
        name="address"
        value={address} 
        onChange={handleChange}
      />
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={description} 
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default SchoolUpdateForm;
