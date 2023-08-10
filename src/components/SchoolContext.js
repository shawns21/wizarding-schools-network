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

    return (
        <SchoolContext.Provider value={{schools, setSchools}}>
            {children}
        </SchoolContext.Provider>
    );
};

export const useSchoolContext = () => useContext(SchoolContext);

