"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@babel/parser");
const Env_1 = require("./Env");
const initGlobal_1 = require("./initGlobal");
class Interpreter {
    constructor() { }
    evalString(jsText) {
        const result = (0, parser_1.parse)(jsText);
        const env = new Env_1.default(null);
        (0, initGlobal_1.default)(env);
        let value;
        for (const item of result.program.body) {
            value = this.eval(item, env);
        }
        return value;
    }
    eval(node, env) {
        switch (node.type) {
            case "VariableDeclaration":
                return this.evalVariableDeclaration(node.declarations, env);
            case "FunctionDeclaration":
                return env.set(node.id.name, node);
            case "ExpressionStatement":
                return this.eval(node.expression, env);
            case "NumericLiteral":
                return node.value;
            case "Identifier":
                return env.lookup(node.name);
            case "CallExpression":
                return this.evalCallExpression(node, env);
            case "BinaryExpression":
                return this.evalBinaryExpression(node, env);
            case "BlockStatement":
                return this.evalBlockStatement(node, env);
            case "AssignmentExpression":
                return this.evalAssignmentExpression(node, env);
            default:
                throw Error("not implement");
        }
    }
    evalAssignmentExpression(node, env) {
        switch (node.operator) {
            case "=":
                switch (node.left.type) {
                    case "Identifier":
                        return env.assign(node.left.name, this.eval(node.right, env));
                    default:
                        throw Error("not implement");
                }
            default:
                throw Error("not implement");
        }
    }
    // evalExpressionStatement(expression: Expression, env: Env) {
    //   switch (expression.type) {
    //     default:
    //       debugger;
    //       throw Error("not implement");
    //   }
    // }
    evalBinaryExpression(expression, env) {
        const left = this.eval(expression.left, env);
        const right = this.eval(expression.right, env);
        switch (expression.operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            default:
                throw Error("not implement");
        }
    }
    evalCallExpression(expression, env) {
        const funcDecl = this.eval(expression.callee, env);
        const envChild = new Env_1.default(env);
        funcDecl.params.forEach((p, index) => {
            envChild.set(p.name, this.eval(expression.arguments[index], envChild));
        });
        return this.evalBlockStatement(funcDecl.body, envChild);
    }
    evalBlockStatement(block, env) {
        const envChild = new Env_1.default(env);
        for (let item of block.body) {
            this.eval(item, envChild);
        }
    }
    evalVariableDeclaration(declarations, env) {
        for (const decl of declarations) {
            switch (decl.type) {
                case "VariableDeclarator":
                    switch (decl.id.type) {
                        case "Identifier":
                            return env.set(decl.id.name, decl.init != undefined ? this.eval(decl.init, env) : decl.init);
                        default:
                            throw Error("not implement");
                    }
                default:
                    throw Error();
            }
        }
    }
}
exports.default = Interpreter;
//# sourceMappingURL=index.js.map