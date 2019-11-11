export default class QueueArray {
  constructor() {
    this.values = [];
  }

  get length() {
    return this.values.length;
  }

  enqueue(value) {
    this.values.push(value);

    return this;
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.values[0];
  }

  dequeue() {
    if (this.isEmpty()) return null;

    return this.values.shift();
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
