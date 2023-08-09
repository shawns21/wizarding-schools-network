import React, { useEffect } from "react";
/* 
    This is you entry point for your routes
*/

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

const Main = () => {
  return (
    <div>
      <h1>Welcome to the Wizarding Schools Network!</h1>
    </div>
  );
};

export default Main;
