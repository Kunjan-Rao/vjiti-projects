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
const userModal_1 = require("../modals/userModal");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barearHeader = req.headers['authorization'];
        if (barearHeader !== undefined) {
            const barearToken = barearHeader.split(' ')[1];
            let isVarified = yield jwt.verify(barearToken, process.env.JWT_KEY);
            if (isVarified) {
                let user = yield userModal_1.default.findOne({ token: barearToken });
                if (typeof user != undefined) {
                    next();
                }
                else {
                    res.status(400).send({ error: 'User not found' });
                }
            }
            else {
                res.status(400).send({ error: 'incorrect token please provide valid token' });
                return;
            }
        }
        else {
            res.status(404).send({ token: 'Token Must  be provided' });
        }
    }
    catch (err) {
        res.status(400).send({ error: 'Please login or signup. you have not authorized' });
    }
});
