import React from "react";
import './styles/SchoolOrderForm.css';

function SchoolOrderForm({ schools, handleSchoolOrdered }) {

    const orderPicked = (event) => {
        const { value } = event.target;
        let newSchools;

        if (value === "alphabetical-top") {
            newSchools = schools.sort((a, b) => a.name.localeCompare(b.name))
        }

        else if (value === "alphabetical-bot"){
            newSchools = schools.sort((a, b) => b.name.localeCompare(a.name))
        }
        
        else if (value === "students-lowest") {
            newSchools = schools.sort((a, b) => a.students.length - b.students.length)
        }

        else if (value === "students-highest") {
            newSchools = schools.sort((a, b) => b.students.length - a.students.length)
        } 

        else {
            newSchools = schools;
        }
        
        handleSchoolOrdered(newSchools);
    };

   return (
        <div className="order-form">
            <form>
                <label>
                    <input type="radio" name="option" value="alphabetical-top" onChange={orderPicked} />
                    Alphabetical (A-Z)
                </label><br />
                <label>
                    <input type="radio" name="option" value="alphabetical-bot" onChange={orderPicked} />
                    Alphabetical (Z-A)
                </label><br />
                <label>
                    <input type="radio" name="option" value="students-highest" onChange={orderPicked} />
                    Most Students
                </label><br />
                <label>
                    <input type="radio" name="option" value="students-lowest" onChange={orderPicked} />
                    Least Students
                </label><br />
            </form>
        </div>
    ); 
}

export default SchoolOrderForm;