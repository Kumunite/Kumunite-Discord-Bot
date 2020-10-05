import app from "./app";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import { warn } from "loglevel";

import path from "path";

// Start Express server
let server: http.Server | https.Server;
if (process.env.NODE_ENV === "production") {
    const certOptions = {
        key: fs.readFileSync(path.resolve("./ssl/kumunite.key")),
        cert: fs.readFileSync(path.resolve("./ssl/kumunite.crt")),
        ca: fs.readFileSync(path.resolve("./ssl/kumunite.ca-bundle")),
    };
    server = https.createServer(certOptions, app).listen(process.env.PORT, () => {
        warn("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
        warn("\tPress CTRL-C to stop\n");
    });
} else {
    server = http.createServer(app).listen(process.env.PORT, () => {
        warn("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
        warn("\tPress CTRL-C to stop\n");
    });
}

export default server;
