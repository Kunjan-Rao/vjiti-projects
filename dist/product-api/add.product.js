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
const productModal_1 = require("../modals/productModal");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { item, category, price } = req.body;
        const product = new productModal_1.default({
            item,
            category,
            price
        });
        yield product.save();
        res.status(200).send({ success: "data inserted successfully" });
    }
    catch (err) {
        res.send({ error: "Data not Inserted.." });
    }
});
