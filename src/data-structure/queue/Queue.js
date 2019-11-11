export default class Queue {
  constructor() {
    this.values = [];
    this.output = [];
  }

  get length() {
    return this.values.length + this.output.length;
  }

  enqueue(value) {
    this.values.push(value);

    return this;
  }

  peek() {
    if (this.isEmpty()) return null;

    if (!this.output.length) {
      while (this.values.length) {
        this.output.push(this.values.pop());
      }
    }
    return this.output[this.output.length - 1];
  }

  dequeue() {
    if (this.isEmpty()) return null;

    if (!this.output.length) {
      while (this.values.length) {
        this.output.push(this.values.pop());
      }
    }
    return this.output.pop();
  }

  clear() {
    this.values = [];
    this.output = [];

    return this;
  }

  isEmpty() {
    return this.length === 0;
  }

  toArray() {
    const values = [...this.values];

    for (let i = this.output.length - 1; i >= 0; i--) {
      values.push(this.output[i]);
    }

    return values;
  }

  toString(cb) {
    return this.toArray().map(v => (cb ? cb(v) : `${v}`)).toString();
  }
}
