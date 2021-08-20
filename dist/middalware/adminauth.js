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
const jwt = require("jsonwebtoken");
const adminModal_1 = require("../modals/adminModal");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let barearToken = req.headers['authorization'];
        let token = barearToken.split(' ')[1];
        console.log(token);
        let isAdmin = yield jwt.verify(token, process.env.JWT_KEY);
        if (isAdmin) {
            let admin = yield adminModal_1.default.findOne({ token });
            if (typeof admin != undefined) {
                next();
            }
            else {
                res.status(400).send({ error: 'Admin not found' });
            }
        }
        else {
            res.status(400).send({ error: 'admin token is incorrect' });
        }
    }
    catch (err) {
        res.send({ error: 'Only admin Can access this api.....' });
    }
});
