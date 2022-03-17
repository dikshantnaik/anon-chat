const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const path = require("path");

app.use(express.static(path.join(__dirname, "/public")));

io.on("connection", (socket) => {
    socket.on("new_message", (data) => {
        io.emit("new_message", [data, socket.id]);
    });
});
let PORT = 3000;
http.listen(PORT, () => {
    console.log(`serving on ::${PORT}`);
});