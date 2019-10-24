export default class LinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }

  toString(cb) {
    return cb ? cb(this.data) : `${this.data}`;
  }
}
