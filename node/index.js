const http = require('http');
const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        PRIMARY KEY (id)
    )
  `;
  
  const insertDataQuery = `
    INSERT INTO people (name) VALUES ('Renan'), ('Wesley')
  `;
  
  connection.query(createTableQuery, (err) => {
    if (err) throw err;

    connection.query("SELECT COUNT(*) AS count FROM people", (err, result) => {
      if (err) throw err;

      const rowCount = result[0].count;

      if (rowCount === 0) {
        connection.query(insertDataQuery, (err) => {
          if (err) throw err;
        });
      }
    });
  });
});

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    
    connection.query("SELECT name FROM people", (err, results) => {
      if (err) throw err;

      const names = results.map((row) => row.name).join(', ');
      
      res.end(`<h1>Full Cycle Rocks!</h1><h2>Lista de nomes cadastrada no banco de dados:</h2> <h3>${names}</h3>`);
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Magic happens on ${PORT}`);
});
