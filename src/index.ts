import * as fs from "fs";
import Interpreter from "./interpreter";
import * as assert from "node:assert";
import * as path from "path";

const interpreter = new Interpreter();

// fs.readFile(path.resolve("src/demo/sum.js2"), (err, res) => {
//   if (err) {
//     throw err;
//   }
//   const result = interpreter.evalString(res.toString());
//   assert.equal(result, 2);
// });

const code = `
const arr = [1, 2, 3];

arr.map((item) => item * 2);
`;

const result = interpreter.evalString(code);
assert.deepEqual(result, [2, 4, 6]);
