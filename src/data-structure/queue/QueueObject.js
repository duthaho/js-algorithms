export default class QueueObject {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.values = {};
  }

  get length() {
    return this.count - this.lowestCount;
  }

  enqueue(value) {
    this.values[this.count++] = value;

    return this;
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.values[this.lowestCount];
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const value = this.values[this.lowestCount];
    delete this.values[this.lowestCount];
    this.lowestCount++;

    return value;
  }

  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.values = {};

    return this;
  }

  isEmpty() {
    return this.length === 0;
  }

  toArray() {
    return Object.values(this.values);
  }

  toString(cb) {
    return this.toArray().map(v => (cb ? cb(v) : `${v}`)).toString();
  }
}
