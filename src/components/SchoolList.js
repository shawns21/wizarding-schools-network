import React, { useEffect, useState } from "react";
import axios from "axios";

const SchoolList = () => {

  const [schools, setSchools] = useState([]);
  
  useEffect(() => {
    async function fetchSchool() {
      const { data } = await axios.get("/api/schools");
      console.log(data);
      setSchools(data);
    }

    fetchSchool();
  }, []);

  return (
    <div id="main">
      <h1>School List</h1>
        {schools.map((school) =>
          <div>
            <img src={school.imageUrl}/>
            <p>{school.name}</p>
          </div>
        )}
    </div>
  );
};

export default SchoolList;