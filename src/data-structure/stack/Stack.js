export default class Stack {
  constructor() {
    this.size = 0;
    this.values = {};
  }

  get length() {
    return this.size;
  }

  push(value) {
    this.size += 1;
    this.values[this.size] = value;

    return this;
  }

  pop() {
    if (this.isEmpty()) return null;

    const value = this.values[this.size];
    delete this.values[this.size];
    this.size -= 1;

    return value;
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.values[this.size];
  }

  clear() {
    this.values = {};
    this.size = 0;

    return this;
  }

  isEmpty() {
    return this.size === 0;
  }

  toArray() {
    const values = [];

    for (let i = 1, len = this.size; i <= len; i++) {
      values.push(this.values[i]);
    }

    return values;
  }

  toString(cb) {
    return this.toArray().map(v => (cb ? cb(v) : `${v}`)).toString();
  }
}
