import React, { useState } from "react";
import axios from "axios";

function SchoolForm({ onSchoolAdded }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/schools", {
        name,
        address,
        description,
    });

    onSchoolAdded(response.data);
    console.log(response.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => {setName(e.target.value)
                            console.log(e.target.value)}}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SchoolForm;