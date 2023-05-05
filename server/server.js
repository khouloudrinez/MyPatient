const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'doctors_app'
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');
  });
  
  
  

app.get('/', (req, res) => {
    res.send('Hello from the server!');
  })

  app.get('/patients', (req, res) => {
    const sql = 'SELECT * FROM patients';
  
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post('/patients', (req, res) => {
    const { name, age, gender,number,description } = req.body;
    const sql = "INSERT INTO patients (name, age, gender, number, description) VALUES (?,?,?,?,?)" 
  
    db.query(sql, [name, age, gender, number, description], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error adding');
        }
    
        console.log(result);
        res.send(result);
      });
    });

  app.put('/patients/:id', (req, res) => {
    const { name, age, gender,number,description} = req.body;
    const idpatients= req.params.id;
    const sql="UPDATE patients SET name=?, age=?, gender=?,number=?,description=? WHERE idpatients=?" ;
    db.query(sql,[name, age, gender,number,description,idpatients],(err, result) => {
        if(err){
          res.status(500).send(err) ;
        } else {
          res.send(result) }
    })

  }) 

  app.delete('/patients/:id', (req, res) => {
    const idpatients= req.params.id;
    const sql="DELETE FROM patients WHERE idpatients=?" ;
    db.query(sql,[idpatients],(err, result) => {
        if(err){
           return res.status(500).send(err) ;
        } else {
           return res.send(result) }
  }) 
})

  
  

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

