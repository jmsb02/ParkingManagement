import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import ReservationManagement from './components/ReservationManagement';
import ParkingSpaceManagement from './components/ParkingSpaceManagement';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Parking Management System</h1>
                <nav>
                    <ul>
                        <li><Link to="/users">User Management</Link></li>
                        <li><Link to="/reservations">Reservation Management</Link></li>
                        <li><Link to="/parking-spaces">Parking Space Management</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/users" component={UserManagement} />
                    <Route path="/reservations" component={ReservationManagement} />
                    <Route path="/parking-spaces" component={ParkingSpaceManagement} />
                    <Route path="/" exact>
                        <h2>Welcome to the Parking Management System</h2>
                        <p>Please select a management option from the menu.</p>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
