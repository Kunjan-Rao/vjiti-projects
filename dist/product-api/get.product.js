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
        let limit = req.params.limit || 10;
        console.log(limit);
        // let skip=
        // let product=await productModal.find().limit().skip(1)
        const product = yield productModal_1.default.aggregate([
            { $project: { _id: 0 } },
            { $limit: 10 }
        ]);
        res.status(200).send(product);
    }
    catch (err) {
        console.log('Data can not displayed');
    }
});
