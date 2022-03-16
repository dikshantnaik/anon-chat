const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors")

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`serving on ::${server.address().port}`);
});
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(cors({
  origin: "*"
}))
app.use(express.static(path.join(__dirname, "/public")));
console.clear();

io.on("connection", (socket) => {
  socket.on("new_message", (data) => {
    io.emit("new_message", [data, socket.id]);
  });
});

app.get("/", (req, res) => {
  res.status(200).sendFile("index.html");
});

