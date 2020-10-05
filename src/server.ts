import app from "./app";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import { warn } from "loglevel";

import path from "path";

// Start Express server
let server = http.createServer(app).listen(process.env.PORT, () => {
    warn("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    warn("\tPress CTRL-C to stop\n");
});

export default server;
