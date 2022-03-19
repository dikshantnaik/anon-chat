const express = require("express");
const api = express.Router();
const body_parser = require("body-parser");

const { createOrganization } = require("../utils/users");

api.use(body_parser.json());
api.use(body_parser.urlencoded({ extended: true }));
const organization_route = api.route("/organization");
api.get("/", (req, res) => {
    res.send("Hello Api Working");
});
organization_route.post((req, res) => {
    const { username, password } = req.body;
    console.log(username);
    res.send("hehe");
});

module.exports = { api };