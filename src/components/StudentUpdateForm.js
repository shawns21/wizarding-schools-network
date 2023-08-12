import React, { useState } from "react";

const StudentUpdateForm = ({student, handleUpdate }) => {
    
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
   
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "firstName") {
            setfirstName(value);
        } else if (name === "lastName") {
            setlastName(value);
        } else if (name === "email") {
            setEmail(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 

        const updatedStudent = {
            ...student,
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        handleUpdate(updatedStudent);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>firstName:</label>
            <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
            />
            <label>lastName:</label>
            <input
                type="text"
                name="lastName"
                value={lastName} 
                onChange={handleChange}
            />
            <label>Email:</label>
            <input
                type="text"
                name="email"
                value={email} 
                onChange={handleChange}
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default StudentUpdateForm;
