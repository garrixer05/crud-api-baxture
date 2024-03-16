import express from "express";
import { config } from "dotenv";
import routes from "./routes/routes.js";
import cluster from "cluster";
import os from "os";
import { connectDb } from "./db/database.js";

config();

const app = express();

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT;

const numCpu = os.availableParallelism();

try {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    let pidToPort = {};
    var worker, port;
    for (let i = 0; i < numCpu; i++) {
      port = Number(PORT) + i + 1;
      worker = cluster.fork({ port: port });
      pidToPort[worker.process.pid] = port;
    }
    console.log(pidToPort);
  } else {
    connectDb();
    app.listen(process.env.port, () => {
      console.log(`Server started on port ${process.env.port}`);
    });
  }
} catch (error) {
  console.log(error);
}
