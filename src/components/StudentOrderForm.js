import React from "react";
import './styles/StudentOrderForm.css';


function StudentOrderForm({ students, handleStudentOrdered }) {

    const orderPicked = (event) => {
        const { value } = event.target;
        let newStudents;

        if (value === "lastname-top") {
            newStudents = students.sort((a, b) => a.lastName.localeCompare(b.lastName));
        }

        else if (value === "lastname-bot"){
            newStudents = students.sort((a, b) => b.lastName.localeCompare(a.lastName));
        }
        
        else if (value === "magic-lowest") {
            newStudents = students.sort((a, b) => a.magicalAbilityScore - b.magicalAbilityScore);
        }

        else if (value === "magic-highest") {
            newStudents = students.sort((a, b) => b.magicalAbilityScore - a.magicalAbilityScore);
        } 

        else {
            newStudents = students;
        }
        
        handleStudentOrdered(newStudents);
    };

    return (
        <div className="order-form">
            <form>
                <label>
                    <input type="radio" name="option" value="lastname-top" onChange={orderPicked} />
                    Last Name (A-Z)
                </label><br />
                <label>
                    <input type="radio" name="option" value="lastname-bot" onChange={orderPicked} />
                    Last Name (Z-A)
                </label><br />
                <label>
                    <input type="radio" name="option" value="magic-highest" onChange={orderPicked} />
                    Most Magic Power
                </label><br />
                <label>
                    <input type="radio" name="option" value="magic-lowest" onChange={orderPicked} />
                    Least Magic Power
                </label><br />
            </form>
        </div>
    );
}

export default StudentOrderForm;