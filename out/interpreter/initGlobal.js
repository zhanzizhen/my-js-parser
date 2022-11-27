"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initGlobal(symbolTable) {
    Object.keys(globalThis).forEach((key) => {
        symbolTable.set(key, globalThis[key]);
    });
}
exports.default = initGlobal;
//# sourceMappingURL=initGlobal.js.map