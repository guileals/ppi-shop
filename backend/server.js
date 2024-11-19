const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/products', async (req, res) => {
  const products = await pool.query('SELECT * FROM products');
  res.json(products.rows);
});

app.post('/products', async (req, res) => {
  const { product } = req.body;
  const newProduct = await pool.query('INSERT INTO products (product) VALUES ($1) RETURNING *', [product]);
  res.json(newProduct.rows[0]);
});

// app.put('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const { completed } = req.body;
//   const updatedTodo = await pool.query('UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *', [completed, id]);
//   res.json(updatedTodo.rows[0]);
// });

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  res.sendStatus(204);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
