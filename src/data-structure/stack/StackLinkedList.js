import DoubleLinkedList from '../double-linked-list/DoubleLinkedList';

export default class StackLinkedList {
  constructor() {
    this.values = new DoubleLinkedList();
  }

  get length() {
    return this.values.length;
  }

  push(value) {
    this.values.append(value);

    return this;
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.values.tail.data;
  }

  pop() {
    if (this.isEmpty()) return null;

    return this.values.deleteTail().data;
  }

  clear() {
    this.values.deleteAll();

    return this;
  }

  isEmpty() {
    return this.values.length === 0;
  }

  toArray() {
    return this.values.toArray();
  }

  toString(cb) {
    return this.values.toString(cb);
  }
}
