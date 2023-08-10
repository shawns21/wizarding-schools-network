import React from "react";

const SchoolUpdateForm = ({ school, handleInputChange, handleSubmit, handleCancel }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={school.name} // Populate initial value from the school prop
        onChange={handleInputChange}
      />
      <label>Address:</label>
      <input
        type="text"
        name="address"
        value={school.address} // Populate initial value from the school prop
        onChange={handleInputChange}
      />
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={school.description} // Populate initial value from the school prop
        onChange={handleInputChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default SchoolUpdateForm;
