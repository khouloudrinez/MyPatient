import {  Routes, Route, Link} from 'react-router-dom';
import PatientsList from './PatientsList';
import AddPatient from './AddPatient';

import './style.css' 

function App() {
    return (
     
        <div className="container">
          <nav className="nav-bar">
            <Link to="/" className="navbar-brand">MyPatient</Link>
            <ul className="navbar">
              <li className="nav-item">
                <Link to="/patients" className="nav-link">Patients List</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-patient" className="nav-link">Add Patient</Link>
              </li>
             
            </ul>
          </nav>
  
          <Routes>
            <Route  path="/patients" element={<PatientsList/>} />
            <Route  path="/add-patient" element={<AddPatient/>} /> 
          
          </Routes>
        
        </div>
    );
  }

export default App;
