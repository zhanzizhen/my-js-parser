export default class Env {
  parent: Env | null;
  record: Map<string, any>;

  constructor(parent: Env | null) {
    this.parent = parent;
    this.record = new Map();
  }

  has(name: string) {
    return this.record.has(name);
  }

  lookup(name: string): any {
    if (this.has(name)) {
      return this.record.get(name);
    }
    if (this.parent === null) {
      throw Error(`idetifier ${name} is not defined`);
    }
    return this.parent.lookup(name);
  }

  set<T = any>(name: string, value: T): T {
    this.record.set(name, value);
    return value;
  }

  assign<T = any>(name: string, value: T): T {
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
