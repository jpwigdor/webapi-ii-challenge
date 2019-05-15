const express = require("express");

const PostRouter = require("./data/postRouter.js");
const server = express();

server.use(express.json());
server.use("/api/posts", PostRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda API Challenge II</h2>
    <p>good luck!</p>
  `);
});

module.exports = server;
