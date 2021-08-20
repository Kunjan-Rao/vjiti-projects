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
const userModal_1 = require("../modals/userModal");
const bcrypt = require("bcryptjs");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        let user = yield userModal_1.default.findOne({ email });
        if (user) {
            let isValid = yield bcrypt.compare(password, user.password);
            if (isValid) {
                let token = yield user.genrateToken();
                res.status(200).send({ success: 'Login Successfully ... now you can access our api', token });
            }
            else {
                res.status(400).send('password incorrect... please enter correct password');
            }
        }
        else {
            res.status(400).send('incorret email..please enter valid email address');
        }
    }
    catch (err) {
        console.log({ error: "email and password are incorrect" });
    }
});
