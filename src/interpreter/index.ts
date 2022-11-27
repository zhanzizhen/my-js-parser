import { ParseResult } from "@babel/core";
import { parse } from "@babel/parser";
import {
  ArgumentPlaceholder,
  Expression,
  FunctionDeclaration,
  Identifier,
  JSXNamespacedName,
  SpreadElement,
  CallExpression,
  BinaryExpression,
  PrivateName,
  V8IntrinsicIdentifier,
  BlockStatement,
  AssignmentExpression,
} from "@babel/types";

import Env from "./Env";
import initGlobal from "./initGlobal";

type Statement = ParseResult["program"]["body"][0];

export default class Interpreter {
  constructor() {}

  evalString(jsText: string) {
    const result = parse(jsText);
    const env = new Env(null);
    initGlobal(env);
    let value: any;
    for (const item of result.program.body) {
      value = this.eval(item, env);
    }
    return value;
  }

  eval(
    node:
      | Statement
      | PrivateName
      | V8IntrinsicIdentifier
      | Expression
      | SpreadElement
      | JSXNamespacedName
      | ArgumentPlaceholder,
    env: Env
  ): any {
    switch (node.type) {
      case "VariableDeclaration":
        return this.evalVariableDeclaration(node.declarations, env);
      case "FunctionDeclaration":
        return env.set(node.id!.name, node);
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
  evalAssignmentExpression(node: AssignmentExpression, env: Env) {
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
  evalBinaryExpression(expression: BinaryExpression, env: Env) {
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
  private evalCallExpression(expression: CallExpression, env: Env) {
    const funcDecl: FunctionDeclaration = this.eval(expression.callee, env);
    const envChild = new Env(env);
    funcDecl.params.forEach((p, index) => {
      envChild.set(
        (p as Identifier).name,
        this.eval(expression.arguments[index], envChild)
      );
    });
    return this.evalBlockStatement(funcDecl.body, envChild);
  }

  evalBlockStatement(block: BlockStatement, env: Env) {
    const envChild = new Env(env);
    for (let item of block.body) {
      this.eval(item, envChild);
    }
  }

  evalVariableDeclaration(
    declarations: import("@babel/types").VariableDeclarator[],
    env: Env
  ) {
    for (const decl of declarations) {
      switch (decl.type) {
        case "VariableDeclarator":
          switch (decl.id.type) {
            case "Identifier":
              return env.set(
                decl.id.name,
                decl.init != undefined ? this.eval(decl.init, env) : decl.init
              );
            default:
              throw Error("not implement");
          }

        default:
          throw Error();
      }
    }
  }
}
