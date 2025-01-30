const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Niranji@1997",
    database: "sales_db",
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});

// API Endpoint
app.get("/sales", (req, res) => {
    db.query("SELECT product, quantity FROM sales", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database query failed" });
            return;
        }
        res.json(result);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
