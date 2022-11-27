import * as fs from "fs";
import Interpreter from "./interpreter";
import * as assert from "node:assert";
import * as path from "path";

const interpreter = new Interpreter();

fs.readFile(path.resolve("src/demo/sum.js2"), (err, res) => {
  if (err) {
    throw err;
  }
  const result = interpreter.evalString(res.toString());
  assert.equal(result, 2);
});
