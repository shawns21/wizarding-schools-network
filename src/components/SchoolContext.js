import React, { createContext, useContext, useState, useEffect} from 'react';
import axios from "axios";

const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        async function fetchSchools() {
            try {
                const response = await axios.get('/api/schools');
                setSchools(response.data);
            } catch (error) {
                console.error(error);
            }
        } 

        fetchSchools();
    }, []);

    

    const addSchool = (newSchool) => {
        setSchools((prevSchools) => [...prevSchools, newSchool]);
    };

    const removeSchool = (schoolId) => {
        setSchools((prevSchools) => prevSchools.filter((school) => school.id !== schoolId));
    };

    return (
        <SchoolContext.Provider value={{schools, setSchools, addSchool, removeSchool}}>
            {children}
        </SchoolContext.Provider>
    );
};

export const useSchoolContext = () => useContext(SchoolContext);

