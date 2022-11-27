"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const interpreter_1 = require("./interpreter");
const assert = require("node:assert");
const path = require("path");
const interpreter = new interpreter_1.default();
fs.readFile(path.resolve("src/demo/sum.js2"), (err, res) => {
    if (err) {
        throw err;
    }
    const result = interpreter.evalString(res.toString());
    assert.equal(result, 2);
});
//# sourceMappingURL=index.js.map