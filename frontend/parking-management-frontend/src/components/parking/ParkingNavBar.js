import React from 'react';
import { Link } from 'react-router-dom';

const ParkingNavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/parking-spaces">Parking Spaces Management</Link></li>
            </ul>
        </nav>
    );
};

export default ParkingNavBar;
