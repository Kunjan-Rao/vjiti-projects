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
const setPassword_1 = require("../common/setPassword");
const adminModal_1 = require("../modals/adminModal");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, password } = req.body;
        let setPassword = new setPassword_1.Password(password);
        password = yield setPassword.getPassword();
        let admin = new adminModal_1.default({
            username, password
        });
        let token = yield admin.genrateToken();
        yield admin.save();
        res.status(200).send({ ok: 'admin registered succesfully',
            token });
    }
    catch (err) {
        res.status(400).send('Somthing went to wrong with admin');
    }
});
