"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminModal_1 = require("../modals/adminModal");
const bcryptjs = require("bcryptjs");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, password } = req.body;
        let admin = yield adminModal_1.default.find({ username });
        let isAdmin = yield bcryptjs.verify(admin.password, process.env.JWT_KEY);
        if (isAdmin) {
            res.status(200).send({ success: `welcome  ${admin.username}` });
        }
        else {
            res.status(400).send({ error: "password incorrect" });
        }
    }
    catch (err) {
    }
});
