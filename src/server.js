require("dotenv").config({ path: ".env" });
require("module-alias/register");

const express = require("express");

// init app
const app = express();

// imports
require("@database");
const router = require("@routes");

// start routes
app.use("/", router);

// port
app.listen(8000);
