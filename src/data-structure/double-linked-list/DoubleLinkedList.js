import DoubleLinkedListNode from './DoubleLinkedListNode';

export default class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    const node = new DoubleLinkedListNode(value, null, this.head);

    this.head = node;
    if (!this.head.next) {
      this.tail = node;
    }
    return this;
  }

  append(value) {
    const node = new DoubleLinkedListNode(value, this.tail, null);

    this.tail = node;
    if (!this.tail.prev) {
      this.head = node;
    }
    return this;
  }
}
