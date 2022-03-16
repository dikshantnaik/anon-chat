const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const cors = require("cors");
const path = require("path")

app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));
console.clear();

io.on("connection", (socket) => {
  console.log(`User : ${socket.id}`);
  socket.on("new_message", (data) => {
    console.log(`Client Says : ${data.username}`);
    io.emit("new_message", data);
  });
});

app.get("/", (req, res) => {
  res.status(200).sendFile("index.html");
});
app.get("/get-messages", (req, res) => {
  let sql = "SELECT * FROM messages";
  database.query(sql, (err, result) => {
    if (err) throw err;
    res.end(JSON.stringify(result));
  });
});

let PORT = 3000;
http.listen(PORT, () => {
  console.log(`serving on ::${PORT}`);
});
