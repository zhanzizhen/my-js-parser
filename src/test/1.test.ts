import Interpreter from "../interpreter";

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
    const interpreter = new Interpreter();
    const result = interpreter.evalString(program);
    expect(result).toEqual(2);
  });
});
