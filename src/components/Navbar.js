import React from "react";
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="navLink">Home</Link>
                <Link to="/schools" className="navLink">All Schools</Link>
                <Link to="/students" className="navLink">All Students</Link>
            </div>
        </nav>
    );
};

export default Navbar;