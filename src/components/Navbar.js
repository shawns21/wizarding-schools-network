import React from "react";
import { Link } from 'react-router-dom';

function Navbar () {
    return (
        <nav>
            <Link to="/" className="navLink">Home</Link>
            <Link to="/schools" className="navLink">All Schools</Link>
            <Link to="/students" className="navLink">All Students</Link>
        </nav>
    );
};

export default Navbar;