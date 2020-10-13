import express, { NextFunction } from "express";
import bodyParser from "body-parser";
import { error, setDefaultLevel, levels } from "loglevel";

import { initialize } from "./utils/discordUtil";

// Create Express server
const app = express();

// loglevel configuration
setDefaultLevel(levels.INFO);

// Discord bot initialization
initialize().catch((err) => {
    error(err);
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", function (req, res) {
    res.send("GET request to the homepage");
});

export default app;