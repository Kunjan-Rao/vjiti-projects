"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const port = 3000;
config_1.default.listen(port, () => {
    console.log(`server runnig at ${port}`);
});
