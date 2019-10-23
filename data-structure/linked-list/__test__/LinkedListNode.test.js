import { LinkedListNode } from "../LinkedListNode"

describe('LinkedListNode', () => {
  it('should create list node with value', () => {
    const node = new LinkedListNode(1)

    expect(node.data).toBe(1)
    expect(node.next).toBeNull()
  })

  it('should create list node with object', () => {
    const data = { value: 1, key: 'test' }
    const node = new LinkedListNode(data)

    expect(node.data.value).toBe(1)
    expect(node.data.key).toBe('test')
    expect(node.next).toBeNull()
  })

  it('should link nodes together', () => {
    const node1 = new LinkedListNode(1)
    const node2 = new LinkedListNode(2, node1)

    expect(node1.data).toBe(1)
    expect(node1.next).toBeNull()
    expect(node2.data).toBe(2)
    expect(node2.next.data).toBe(1)
    expect(node2.next.next).toBeNull()
    expect(node2.next).toEqual(node1)
  })
})
