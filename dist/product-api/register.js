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
const joi = require("joi");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, email, mobileno, password } = req.body;
        let Schema = joi.object({
            name: joi.string().required(),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            mobileno: joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
            password: joi.string().required()
        });
        let result = Schema.validate(req.body);
        if (result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        }
        password = yield bcrypt.hash(password, 10);
        let user = new userModal_1.default({
            name, email, mobileno, password,
        });
        yield user.save();
        res.status(200).send({ success: "Registration done  successfully" });
    }
    catch (err) {
        res.send({ error: "Data not Inserted.." });
    }
});
