"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Env {
    constructor(parent) {
        this.parent = parent;
        this.record = new Map();
    }
    has(name) {
        return this.record.has(name);
    }
    lookup(name) {
        if (this.has(name)) {
            return this.record.get(name);
        }
        if (this.parent === null) {
            throw Error(`idetifier ${name} is not defined`);
        }
        return this.parent.lookup(name);
    }
    set(name, value) {
        this.record.set(name, value);
        return value;
    }
    assign(name, value) {
        if (this.has(name)) {
            this.record.set(name, value);
            return value;
        }
        if (this.parent === null) {
            throw Error(`idetifier ${name} is not defined`);
        }
        return this.parent.assign(name, value);
    }
}
exports.default = Env;
//# sourceMappingURL=Env.js.map