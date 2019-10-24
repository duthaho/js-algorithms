export default class DoubleLinkedListNode {
  constructor(data, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }

  toString(cb) {
    return cb ? cb(this.data) : `${this.data}`;
  }
}
