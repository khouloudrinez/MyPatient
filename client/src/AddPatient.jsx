import { useState } from 'react';
import axios from 'axios';


function AddPatient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();

    const newPatient = { 
        name: name,
         age: age,
          gender: gender,
           number:number, 
           description:description};

axios.post('http://localhost:3000/patients', newPatient)

   .then(res => {
        console.log(res.data);
        setName('');
        setAge('');
        setGender('');
        setNumber('');
        setDescription('');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h3>Add Patient</h3>
      <form onSubmit={handleSubmit}>
        <div >
          <label>Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div >
          <label>Age: </label>
          <input value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div >
          <label>Gender: </label>
          <input value={gender} onChange={(e) => setGender(e.target.value)} required />
        </div>
        <div >
          <label>Number: </label>
          <input value={number} onChange={(e) => setNumber(e.target.value)} required />
        </div>
        <div >
          <label>Description: </label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div >
        <button type="submit">Add Patient</button>
        </div>
      </form>
    </div>
  );
}

export default AddPatient;