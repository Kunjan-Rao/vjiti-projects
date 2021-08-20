"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router_1 = require("./router");
const dotenv = require("dotenv");
dotenv.config();
require("./db/db");
class App {
    constructor() {
        this.router = new router_1.Router();
        this.app = express();
        this.config();
        this.router.route(this.app);
    }
    config() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
