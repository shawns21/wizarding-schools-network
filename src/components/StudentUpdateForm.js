import React, { useState } from "react";
import { useSchoolContext } from "./SchoolContext";
import './styles/StudentUpdateForm.css';

const StudentUpdateForm = ({student, handleUpdate }) => {
    
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [wizardingschoolId, setWizardingSchoolId] = useState(null);
    const [inputError, setInputError] = useState("");
    const { schools } = useSchoolContext();
   
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "firstName") {
            setfirstName(value);
        } else if (name === "lastName") {
            setlastName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "school"){
            setWizardingSchoolId(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let updatedStudent;

        if (!firstName){
            setInputError("First name cannot be empty");
            return;
        }
        else if (!lastName){
            setInputError("Last name cannot be empty");
            return;
        }
        else if (!email){
            setInputError("Email cannot be empty");
            return;
        }
        else if (!wizardingschoolId){
            setInputError("You must pick a school");
            return;
        }
        else { 
            updatedStudent = {
                ...student,
                firstName: firstName,
                lastName: lastName,
                email: email,
                wizardingschoolId: wizardingschoolId,
            };
        }

        handleUpdate(updatedStudent);
        setInputError("");
    };

    return (
        <form onSubmit={handleSubmit}>
            {inputError && <p>{inputError}</p>}
            <label>First Name:</label>
            <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
            />
            <label>Last Name:</label>
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
            <label>
            <select onChange={(e) => {
                setWizardingSchoolId(e.target.value);
                console.log(e.target.value);
            }}>
                <option value="">Change School</option> 
                {schools.map((school) => (
                    <option value={school.id}>{school.name}</option>
                ))}
            </select>
            </label>
            <button type="submit">Save</button>
        </form>
    );
};

export default StudentUpdateForm;
