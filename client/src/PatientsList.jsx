import { useState, useEffect } from "react";
import axios from "axios";

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedPatient, setUpdatedPatient] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/patients/${id}`)
      .then(() => {
        axios
          .get("http://localhost:3000/patients")
          .then((res) => setPatients(res.data));
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = (id, data) => {
    axios
      .put(`http://localhost:3000/patients/${id}`, data)
      .then(() => {
        axios
          .get("http://localhost:3000/patients")
          .then((res) => setPatients(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateClick = (patient) => {
    setShowUpdateForm(true);
    setUpdatedPatient(patient);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const age = form.age.value;
    const gender = form.gender.value;
    const number = form.number.value;
    const description = form.description.value;
    const data = {
      name,
      age,
      gender,
      number,
      description,
    };
    handleUpdate(updatedPatient.idpatients, data);
    setShowUpdateForm(false);
  };

  return (
    <div>
      <h3>Patients List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Number</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.idpatients}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.number}</td>
              <td>{patient.description}</td>
              <td>
                <button onClick={() => handleDelete(patient.idpatients)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateClick(patient)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUpdateForm && updatedPatient && (
  <form onSubmit={handleUpdateSubmit}>
    <h4>Update Patient Information</h4>
    <label>
      Name:
      <input type="text" name="name" defaultValue={updatedPatient.name} />
    </label>
    <br />
    <label>
      Age:
      <input type="number" name="age" defaultValue={updatedPatient.age} />
    </label>
    <br />
    <label>
      Gender:
      <input type="text" name="gender" defaultValue={updatedPatient.gender} />
    </label>
    <br />
    <label>
      Number:
      <input type="text" name="number" defaultValue={updatedPatient.number} />
    </label> 
    <br />
    <label>
      Description:
      <input type="text" name="description" defaultValue={updatedPatient.description} />
    </label> 
    <br />
    <button type="submit">Update</button>
  </form> 
)} 
            </div> )
            
      }
            
            
    export default PatientsList 