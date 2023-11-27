const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "crudgame",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { time } = req.body;
  const { priority } = req.body;

  let mysql = "INSERT INTO tasks ( name, time, priority) VALUES (?, ?, ?)";
  db.query(mysql, [name, time, priority], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { name } = req.body;
  const { time } = req.body;
  const { priority } = req.body;

  let mysql =
    "SELECT * from tasks WHERE name = ? AND time = ? AND priority = ?";
  db.query(mysql, [name, time, priority], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM tasks";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { time } = req.body;
  const { priority } = req.body;
  let mysql = "UPDATE tasks SET name = ?, time = ?, priority = ? WHERE id = ?";
  db.query(mysql, [name, time, priority, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM tasks WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});