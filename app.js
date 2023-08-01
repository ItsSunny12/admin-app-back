require("dotenv").config();
const express = require("express");
const dbConect = require("./db");
const cors = require("cors");
const bookRouter = require("./routes/book");

const app = express();

dbConect(app);

app.use(cors({ origin: true }));

app.use(express.json());

app.use("/api/v1/books", bookRouter);
