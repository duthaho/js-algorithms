export default class StackArray {
  constructor() {
    this.values = [];
  }

  get length() {
    return this.values.length;
  }

  push(value) {
    this.values.push(value);

    return this;
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.values[this.values.length - 1];
  }

  pop() {
    if (this.isEmpty()) return null;

    return this.values.pop();
  }

  clear() {
    this.values = [];

    return this;
  }

  isEmpty() {
    return this.values.length === 0;
  }

  toArray() {
    return this.values;
  }

  toString(cb) {
    return this.values.map(v => (cb ? cb(v) : `${v}`)).toString();
  }
}
