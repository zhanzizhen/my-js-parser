"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("../interpreter");
const program = `
let sum = 1;

function add(a){
  sum = sum + a;
}

add(1);
sum // 2
`;
describe("test function", () => {
    it("test function 1", () => {
        const interpreter = new interpreter_1.default();
        const result = interpreter.evalString(program);
        expect(result).toEqual(2);
    });
});
//# sourceMappingURL=1.test.js.map