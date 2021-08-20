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
        let admin = yield adminModal_1.default.findOne({ username });
        if (admin) {
            let isAdmin = yield bcryptjs.compare(password, admin.password);
            if (isAdmin) {
                let token = yield admin.genrateToken();
                res.status(200).send({ ok: 'Admin login succsesfully',
                    token });
            }
        }
        else {
        }
    }
    catch (err) {
        res.send({ error: 'Something went to wrong' });
    }
});
