import DoubleLinkedListNode from '../DoubleLinkedListNode';

describe('DoubleLinkedListNode', () => {
  it('should create list node with value', () => {
    const node = new DoubleLinkedListNode(1);

    expect(node.data).toBe(1);
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
  });

  it('should create list node with object as a value', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new DoubleLinkedListNode(nodeValue);

    expect(node.data.value).toBe(1);
    expect(node.data.key).toBe('test');
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
  });

  it('should link nodes together', () => {
    const node1 = new DoubleLinkedListNode(1);
    const node2 = new DoubleLinkedListNode(2, node1);
    const node3 = new DoubleLinkedListNode(10, node1, node2);

    expect(node1.prev).toBeNull();
    expect(node1.next).toBeNull();

    expect(node2.prev).toBeDefined();
    expect(node2.next).toBeNull();
    expect(node2.data).toBe(2);
    expect(node2.prev.data).toBe(1);

    expect(node3.next).toBeDefined();
    expect(node3.prev).toBeDefined();
    expect(node3.prev.data).toBe(1);
    expect(node3.next.data).toBe(2);
  });

  it('should convert node to string', () => {
    const node = new DoubleLinkedListNode(1);

    expect(node.toString()).toBe('1');

    node.data = 'string value';
    expect(node.toString()).toBe('string value');
  });

  it('should convert node to string with custom stringifier', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new DoubleLinkedListNode(nodeValue);
    const toStringCallback = value => `value: ${value.value}, key: ${value.key}`;

    expect(node.toString(toStringCallback)).toBe('value: 1, key: test');
  });
});
