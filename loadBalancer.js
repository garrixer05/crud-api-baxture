import axios from "axios";
import express from "express";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT;

const servers = [
  "http://localhost:4001",
  "http://localhost:4002",
  "http://localhost:4003",
  "http://localhost:4004",
];

let current = 0,
  server;
const handler = async (req, res) => {
  const { method, url, headers, body: data } = req;
  server = servers[current];
  current === servers.length - 1 ? (current = 0) : current++;
  try {
    const response = await axios({
      url: `${server}${url}`,
      method,
      headers,
      data,
    });
    console.log(`proxy to ${server} succeded`);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    handler(req, res);
  }
};

app.use((req, res) => {
  handler(req, res);
});

app.listen(port, () => {
  console.log(
    `   Load balancer is up with process ID : ${process.pid} | Port : ${port}`
  );
  console.log(
    "< ============================================================ >\n"
  );
});
