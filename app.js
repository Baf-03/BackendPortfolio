const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
require('dotenv').config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000



const DB_URI = "mongodb+srv://bilal:bilal@cluster0.gjc8r6r.mongodb.net/mydatabase?retryWrites=true&w=majority";
mongoose.connect(DB_URI);
mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", () => console.log("MongoDB Not Connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.post("/", (req, res) => {
    res.json({
        status: false,
        data: null,
        message: "server is running"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
    