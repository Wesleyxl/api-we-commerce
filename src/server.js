require("dotenv").config({ path: ".env" });
require("module-alias/register");

const express = require("express");

// init app
const app = express();

// imports
require("@database");
const appConfig = require("@config/app");
const routes = require("./routes");

// start routes
app.use(express.json());
app.use(routes);

// port
app.listen(appConfig.port, (err) => {
  if (err) {
    console.error("erro");
  }
  console.log(`server started on port ${appConfig.port}`);
});
