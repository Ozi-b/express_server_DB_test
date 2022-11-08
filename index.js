const express = require("express");
const app = express();
const port = 3000;
const { Pool } = require("pg");
const connectionString = "postgressql://postgres:docker@127.0.01:5432/cars";

const pool = new Pool({
  connectionString: connectionString,
});
pool.connect();
app.use(express.json());

// shows all car rows
app.get("/api/cars", (req, res) => {
  async function getAll() {
    try {
      let queryString = "SELECT * FROM cars";
      const result = await pool.query(queryString, function (err, results) {
        console.log(results);
        res.send(results.rows);
      });
    } catch (e) {
      console.error(e.stack);
    }
  }
  getAll();
});

// shows car based off of the car id
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

// inputs a new car
app.post("/api/cars/", (req, res) => {
  async function insertCars() {
    try {
      let queryString = `INSERT INTO cars (manufacture, model, color, year, MSRP) VALUES ('${req.body.manufacture}','${req.body.model}', '${req.body.color}', '${req.body.year}', '${req.body.MSRP}') RETURNING *`;
      const result = await pool.query(queryString, function (err, results) {
        console.log(results.rows);
        res.send(results.rows);
      });
    } catch (e) {
      console.error(e.stack);
    }
  }
  insertCars();
});

// changes the MSRP of the car becuase prices change over time you dummy
app.patch("/api/cars/:id", (req, res) => {
  async function updateMSRP() {
    try {
      let queryString = `UPDATE cars SET msrp='${req.body.MSRP}' WHERE id=${req.params.id} RETURNING *`;
      const result = await pool.query(queryString, function (err, results) {
        console.log(results.rows);
        res.send(results.rows);
      });
    } catch (e) {
      console.error(e.stack);
    }
  }
  updateMSRP();
});

// deletes a car from the DB because it was sold or stolen (please dont tell my boss)
app.delete("/api/cars/:id", (req, res) => {
  async function deleteCar() {
    try {
      let queryString = `DELETE FROM cars WHERE id = '${req.params.id}' RETURNING *`;
      const result = await pool.query(queryString, function (err, results) {
        console.log(results.rows);
        res.send(results.rows);
      });
    } catch (e) {
      console.error(e.stack);
    }
  }
  deleteCar();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
