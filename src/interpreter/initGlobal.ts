import type Env from "./Env";

type Key = keyof typeof globalThis;
export default function initGlobal(symbolTable: Env) {
  Object.keys(globalThis).forEach((key) => {
    symbolTable.set(key, globalThis[key as Key]);
  });
}
