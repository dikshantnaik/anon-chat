const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const path = require("path");
const body_parser = require("body-parser");
const { api } = require("./api/api");
const {} = require("./utils/users");

app.use("/api", api);
app.use(express.static(path.join(__dirname, "/public")));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.post("/organization_login", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send(req.body);
});
io.on("connection", (socket) => {
    socket.on("new_message", (data) => {
        io.emit("new_message", [data, Date.now()]);
    });
});
let PORT = 3000;
http.listen(PORT, () => {
    console.log(`serving on http://127.0.0.1:${PORT}`);
});