import { LinkedListNode } from "./LinkedListNode"

export class LinkedList {
  constructor(comparator) {
    this.head = null
    this.tail = null
    this.comparator = comparator
  }

  prepend = (value) => {
    const node = new LinkedListNode(value, this.head)
    this.head = node
    if (!this.tail) {
      this.tail = node
    }
    return this;
  }

  append = (value) => {
    const node = new LinkedListNode(value, null)
    if (!this.tail) {
      this.head = this.tail = node
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    return this;
  }

  get = (index) => {
    if (index < 0) throw new Error('err.indexInvalid')
    if (!this.head) {
      return null
    }
    let i = 0
    let node = this.head
    while (node) {
      if (i++ === index) return node
      node = node.next
    }
    return null
  }

  insert = (value, index) => {
    if (index < 0) throw new Error('err.indexInvalid')
    if (!index) return this.prepend(value)
    const prev = this.get(index - 1)
    if (prev) {
      const node = new LinkedListNode(value, prev.next)
      prev.next = node
    }
    return this
  }

  deleteIndex = (index) => {
    if (index < 0) throw new Error('err.indexInvalid')
    if (!index) return this.deleteHead()
    const prev = this.get(index - 1)
    if (prev && prev.next) {
      const deleted = prev.next
      prev.next = prev.next.next
      return deleted
    }
    return null
  }

  deleteHead = () => {
    const deletedHead = this.head
    if (this.head === this.tail) {
      this.head = this.tail = null
      return deletedHead
    }
    this.head = this.head.next
    return deletedHead
  }

  deleteTail = () => {
    const deletedTail = this.tail
    if (this.head === this.tail) {
      this.head = this.tail = null
      return deletedTail
    }
    let node = this.head;
    while (node) {
      if (!node.next.next) {
        node.next = null
      } else {
        node = node.next
      }
    }
    this.tail = node
    return deletedTail
  }

  deleteAll = () => {
    this.head = this.tail = null
    return this
  }

  fromArray = (values) => {
    if (!Array.isArray(values)) throw new Error('err.valuesInvalid')
    values.forEach(v => this.append(v))
    return this
  }

  toArray = () => {
    const values = [];
    let node = this.head
    while (node) {
      values.push(node.data)
      node = node.next
    }
    return values
  }

  size = () => {
    let count = 0
    let node = this.head
    while (node) {
      count++
      node = node.next
    }
    return count
  }

  reverse = () => {
    let prev = null
    let curr = this.head
    let next
    while (curr) {
      next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }
    this.tail = this.head
    this.head = prev
    return this
  }

  find = (cb) => {
    if (typeof cb !== 'function') throw new Error('err.cbInvalid')
    let node = this.head
    while (node) {
      if (cb(node.data)) return node.data
      node = node.next
    }
    return null
  }

  findIndex = (cb) => {
    if (typeof cb !== 'function') throw new Error('err.cbInvalid')
    let i = 0
    let node = this.head
    while (node) {
      if (cb(node.data)) return i
      node = node.next
      i += 1
    }
    return -1
  }
}
