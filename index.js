const express = require("express");
const app = express();
const port = 3000;
const { Pool } = require("pg");
const connectionString = "postgressql://postgres:docker@127.0.01:5432/cars";

const pool = new Pool({
  connectionString: connectionString,
});
pool.connect();

app.get("/api/cars/:id", (req, res) => {
  async function getCars() {
    try {
      let queryString = `SELECT * FROM cars WHERE id = $1`;
      const result = await pool.query(queryString, [req.params.id]);
      console.log(result);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  getCars();
});

app.get("/", (req, res) => {
  pool.query("SELECT * FROM users", (err, data) => {
    console.log(data);
    res.json(data.rows);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
