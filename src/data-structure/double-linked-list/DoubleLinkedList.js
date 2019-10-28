import DoubleLinkedListNode from './DoubleLinkedListNode';

export default class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  get length() {
    return this.size;
  }

  prepend(value) {
    const node = new DoubleLinkedListNode(value, null, this.head);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      this.head = node;
    }

    this.size += 1;

    return this;
  }

  append(value) {
    const node = new DoubleLinkedListNode(value, this.tail, null);

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

  insert(value, index) {
    if (index < 0 || index > this.size) return this;
    if (index === 0) return this.prepend(value);
    if (index === this.size) return this.append(value);

    const curr = this.get(index);
    const node = new DoubleLinkedListNode(value, curr.prev, curr);
    curr.prev.next = node;
    curr.prev = node;

    this.size += 1;

    return this;
  }

  get(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.head;
    if (index === this.size - 1) return this.tail;

    let node = this.head;
    let move = 'next';
    let id = index;
    let i = 0;
    if (index > this.size / 2) {
      node = this.tail;
      move = 'prev';
      id = this.size - index - 1;
    }

    while (node) {
      if (i === id) break;
      node = node[move];
      i += 1;
    }

    return node;
  }

  deleteHead() {
    if (!this.head) return null;

    const deletedNode = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.size -= 1;

    return deletedNode;
  }

  deleteTail() {
    if (!this.tail) return null;

    const deletedNode = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.size -= 1;

    return deletedNode;
  }

  deleteIndex(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteTail();

    const deletedNode = this.get(index);
    deletedNode.prev.next = deletedNode.next;

    this.size -= 1;

    return deletedNode;
  }

  delete(cb) {
    if (typeof cb !== 'function') return null;

    if (!this.head) return null;

    let deletedNode = null;

    while (this.head && cb(this.head.data)) {
      deletedNode = this.head;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      }
      this.size -= 1;
    }

    let node = this.head;

    if (node) {
      while (node.next) {
        if (cb(node.next.data)) {
          deletedNode = node.next;
          node.next = node.next.next;
          if (node.next) {
            node.next.prev = node;
          }
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

  deleteAll() {
    this.head = null;
    this.tail = null;

    this.size = 0;

    return this;
  }

  findIndex(cb) {
    if (typeof cb !== 'function') return -1;

    let node = this.head;
    let i = 0;

    while (node) {
      if (cb(node.data)) return i;
      i += 1;
      node = node.next;
    }

    return -1;
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

  reverse() {
    if (this.head === this.tail) return this;

    let node = this.head;
    let prev = null;

    while (node) {
      // eslint-disable-next-line prefer-destructuring
      prev = node.prev;
      node.prev = node.next;
      node.next = prev;
      node = node.prev;
    }

    this.tail = this.head;
    this.head = prev.prev;

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
}
