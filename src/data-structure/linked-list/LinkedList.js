import LinkedListNode from './LinkedListNode';

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  get length() {
    return this.size;
  }

  prepend(value) {
    const node = new LinkedListNode(value, this.head);
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    this.size += 1;

    return this;
  }

  append(value) {
    const node = new LinkedListNode(value, null);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size += 1;

    return this;
  }

  get(index) {
    if (index < 0 || index >= this.size) return null;

    let i = 0;
    let node = this.head;
    while (node) {
      if (i === index) break;
      node = node.next;
      i += 1;
    }

    return node;
  }

  insert(value, index) {
    if (index < 0 || index > this.size) return this;
    if (index === 0) return this.prepend(value);
    if (index === this.size) return this.append(value);

    const prev = this.get(index - 1);
    const node = new LinkedListNode(value, prev.next);
    prev.next = node;

    this.size += 1;

    return this;
  }

  delete(cb) {
    if (typeof cb !== 'function') return null;

    if (!this.head) return null;

    let deletedNode = null;
    while (this.head && cb(this.head.data)) {
      deletedNode = this.head;
      this.head = this.head.next;
      this.size -= 1;
    }

    let node = this.head;
    if (node) {
      while (node.next) {
        if (cb(node.next.data)) {
          deletedNode = node.next;
          node.next = node.next.next;
          this.size -= 1;
        } else {
          node = node.next;
        }
      }
    }

    if (cb(this.tail.data)) {
      this.tail = node;
    }

    return deletedNode;
  }

  deleteIndex(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteTail();

    const prev = this.get(index - 1);
    const deletedNode = prev.next;
    prev.next = prev.next.next;

    this.size -= 1;

    return deletedNode;
  }

  deleteHead() {
    if (!this.head) return null;

    const deletedHead = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.size -= 1;

    return deletedHead;
  }

  deleteTail() {
    if (!this.tail) return null;

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.get(this.size - 2);
      this.tail.next = null;
    }

    this.size -= 1;

    return deletedTail;
  }

  deleteAll() {
    this.head = null;
    this.tail = null;

    this.size = 0;

    return this;
  }

  fromArray(values) {
    if (!Array.isArray(values)) return this;

    values.forEach(v => this.append(v));

    return this;
  }

  toArray() {
    const values = [];

    let node = this.head;
    while (node) {
      values.push(node.data);
      node = node.next;
    }

    return values;
  }

  toNodes() {
    const nodes = [];

    let node = this.head;
    while (node) {
      nodes.push(node);
      node = node.next;
    }

    return nodes;
  }

  toString(cb) {
    return this.toNodes().map(node => node.toString(cb)).toString();
  }

  reverse() {
    let prev = null;
    let curr = this.head;
    let next;

    while (curr) {
      // eslint-disable-next-line prefer-destructuring
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    this.tail = this.head;
    this.head = prev;

    return this;
  }

  find(cb) {
    if (typeof cb !== 'function') return null;

    let node = this.head;
    while (node) {
      if (cb(node.data)) return node;
      node = node.next;
    }

    return null;
  }

  findIndex(cb) {
    if (typeof cb !== 'function') return -1;

    let i = 0;
    let node = this.head;
    while (node) {
      if (cb(node.data)) return i;
      node = node.next;
      i += 1;
    }

    return -1;
  }
}
