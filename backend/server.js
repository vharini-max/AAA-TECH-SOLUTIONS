const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bhavani',
  database: 'aaa_tech_db'
});

db.connect((err) => {
  if (err) {
    console.log('MySQL Error:', err);
  } else {
    console.log('MySQL Connected! aaa_tech_db');
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  db.query('INSERT INTO contact_messages (name, email, message) VALUES (?,?,?)', 
  [name, email, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true, msg: 'Message saved!' });
  });
});

// === ADMIN PANEL ===
app.get('/api/messages', (req,res)=>{
  db.query('SELECT * FROM contact_messages', (err, result)=>{
    if(err) return res.status(500).send(err);
    res.send(result);
  })
})

// === AUTHENTICATION ===
app.post('/api/login', (req,res)=>{
  const {username, password} = req.body;
  if(username==='admin' && password==='admin123'){
    res.send({success:true, message: 'Login success'})
  } else {
    res.send({success:false, message: 'Invalid login'})
  }
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});