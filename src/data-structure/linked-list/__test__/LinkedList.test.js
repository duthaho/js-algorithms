import LinkedList from '../LinkedList';

const verify = (list, head, tail, size, str) => {
  expect(list.head.data).toBe(head);
  expect(list.tail.data).toBe(tail);
  expect(list.tail.next).toBeNull();
  expect(list.size()).toBe(size);
  expect(list.toString()).toBe(str);
};

describe('LinkedList', () => {
  it('should create empty linked list', () => {
    const linkedList = new LinkedList();

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
    expect(linkedList.toString()).toBe('');
  });

  it('should append node to linked list', () => {
    const linkedList = new LinkedList();

    linkedList.append(1);
    linkedList.append(2);

    verify(linkedList, 1, 2, 2, '1,2');
  });

  it('should prepend node to linked list', () => {
    const linkedList = new LinkedList();

    linkedList.prepend(2);
    verify(linkedList, 2, 2, 1, '2');

    linkedList.append(1);
    linkedList.prepend(3);
    verify(linkedList, 3, 1, 3, '3,2,1');
  });

  it('should get node by index', () => {
    const linkedList = new LinkedList();

    linkedList.fromArray([1, 2, 3]);
    verify(linkedList, 1, 3, 3, '1,2,3');

    expect(linkedList.get(0).data).toBe(1);
    expect(linkedList.get(1).data).toBe(2);
    expect(linkedList.get(2).data).toBe(3);
    expect(linkedList.get(3)).toBeNull();
    verify(linkedList, 1, 3, 3, '1,2,3');
  });

  it('should insert node by index', () => {
    const linkedList = new LinkedList();

    linkedList.fromArray([1, 2, 3]);
    verify(linkedList, 1, 3, 3, '1,2,3');

    linkedList.insert(5, 0);
    linkedList.insert(4, 2);
    linkedList.insert(3, 4);
    linkedList.insert(5, 100);
    verify(linkedList, 5, 3, 6, '5,1,4,2,3,3');
  });

  it('should delete node by index', () => {
    const linkedList = new LinkedList();

    expect(linkedList.deleteIndex(5)).toBeNull();

    linkedList.append(1);
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);
    verify(linkedList, 1, 5, 8, '1,1,2,3,3,3,4,5');

    const deletedNode = linkedList.deleteIndex(0);
    expect(deletedNode.data).toBe(1);
    verify(linkedList, 1, 5, 7, '1,2,3,3,3,4,5');

    linkedList.deleteIndex(7);
    verify(linkedList, 1, 5, 7, '1,2,3,3,3,4,5');

    linkedList.deleteIndex(6);
    verify(linkedList, 1, 4, 6, '1,2,3,3,3,4');

    linkedList.deleteIndex(2);
    verify(linkedList, 1, 4, 5, '1,2,3,3,4');
  });

  it('should delete linked list tail', () => {
    const linkedList = new LinkedList();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    verify(linkedList, 1, 3, 3, '1,2,3');

    const deletedNode1 = linkedList.deleteTail();
    expect(deletedNode1.data).toBe(3);
    verify(linkedList, 1, 2, 2, '1,2');

    const deletedNode2 = linkedList.deleteTail();
    expect(deletedNode2.data).toBe(2);
    verify(linkedList, 1, 1, 1, '1');

    const deletedNode3 = linkedList.deleteTail();
    expect(deletedNode3.data).toBe(1);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
    expect(linkedList.toString()).toBe('');
  });

  it('should delete linked list head', () => {
    const linkedList = new LinkedList();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    verify(linkedList, 1, 2, 2, '1,2');

    const deletedNode1 = linkedList.deleteHead();
    expect(deletedNode1.data).toBe(1);
    verify(linkedList, 2, 2, 1, '2');

    const deletedNode2 = linkedList.deleteHead();
    expect(deletedNode2.data).toBe(2);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
    expect(linkedList.toString()).toBe('');
  });

  it('should delete all nodes', () => {
    const linkedList = new LinkedList();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    verify(linkedList, 1, 2, 2, '1,2');

    linkedList.deleteAll();
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
    expect(linkedList.toString()).toBe('');
  });

  it('should be possible to store objects in the list and to print them out', () => {
    const linkedList = new LinkedList();

    const nodeValue1 = { value: 1, key: 'key1' };
    const nodeValue2 = { value: 2, key: 'key2' };

    linkedList
      .append(nodeValue1)
      .prepend(nodeValue2);

    const cb = value => `${value.key}:${value.value}`;

    expect(linkedList.toString(cb)).toBe('key2:2,key1:1');
  });

  it('should find node by value', () => {
    const linkedList = new LinkedList();

    expect(linkedList.find(v => v === 5)).toBeNull();

    linkedList.append(1);
    expect(linkedList.find(v => v === 1).data).toBe(1);

    linkedList
      .append(2)
      .append(3);

    expect(linkedList.find(v => v === 2).data).toBe(2);
    expect(linkedList.find(v => v === 5)).toBeNull();

    linkedList
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' });

    const node = linkedList.find(v => v.key === 'test2');

    expect(node.data).toBeDefined();
    expect(node.data.value).toBe(2);
    expect(node.data.key).toBe('test2');
    expect(linkedList.find(v => v.key === 'test5')).toBeNull();
  });

  it('should find node by index', () => {
    const linkedList = new LinkedList();

    expect(linkedList.findIndex(v => v === 5)).toBe(-1);

    linkedList.append(1);
    expect(linkedList.findIndex(v => v === 1)).toBe(0);

    linkedList
      .append(2)
      .append(3);

    expect(linkedList.findIndex(v => v === 2)).toBe(1);
    expect(linkedList.findIndex(v => v === 5)).toBe(-1);

    linkedList
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' });

    expect(linkedList.findIndex(v => v.key === 'test2')).toBe(4);
    expect(linkedList.findIndex(v => v.key === 'test5')).toBe(-1);
  });

  it('should create linked list from array', () => {
    const linkedList = new LinkedList();
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

    verify(linkedList, 1, 5, 8, '1,1,2,3,3,3,4,5');
  });

  it('should reverse linked list', () => {
    const linkedList = new LinkedList();

    linkedList
      .append(1)
      .append(2)
      .append(3);

    verify(linkedList, 1, 3, 3, '1,2,3');

    linkedList.reverse();
    verify(linkedList, 3, 1, 3, '3,2,1');

    linkedList.reverse();
    verify(linkedList, 1, 3, 3, '1,2,3');
  });
});
