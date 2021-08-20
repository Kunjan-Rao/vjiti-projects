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
const joi = require("joi");
const setPassword_1 = require("../common/setPassword");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, email, mobileno, password } = req.body;
        //createting a joi validation for our data sent by post request
        let Schema = joi.object({
            name: joi.string().required(),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            mobileno: joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
            password: joi.string().required()
        });
        //apply data to our data
        let result = Schema.validate(req.body);
        if (result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        }
        //add password class for  Hashing a password
        let setpassword = new setPassword_1.Password(password);
        password = yield setpassword.getPassword();
        //adding new user to the modal
        let user = new userModal_1.default({
            name, email, mobileno, password
        });
        let token = yield user.genrateToken();
        yield user.save();
        res.status(200).send({ success: "Registration done  successfully" });
    }
    catch (err) {
        res.send({ error: "Data not Inserted.." });
    }
});
