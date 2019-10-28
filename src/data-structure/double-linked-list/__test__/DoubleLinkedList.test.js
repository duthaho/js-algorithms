import DoubleLinkedList from '../DoubleLinkedList';

const verify = (list, head, next, prev, tail, size, str) => {
  expect(list.head.data).toBe(head);
  if (next) {
    expect(list.head.next.data).toBe(next);
  } else {
    expect(list.head.next).toBeNull();
  }
  expect(list.tail.data).toBe(tail);
  if (prev) {
    expect(list.tail.prev.data).toBe(prev);
  } else {
    expect(list.tail.prev).toBeNull();
  }
  expect(list.tail.next).toBeNull();
  expect(list.length).toBe(size);
  expect(list.toString()).toBe(str);
};

const verifyEmpty = (list) => {
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
  expect(list.length).toBe(0);
  expect(list.toString()).toBe('');
};

describe('DoubleLinkedList', () => {
  it('should create empty linked list', () => {
    const linkedList = new DoubleLinkedList();

    verifyEmpty(linkedList);
  });

  it('should append node to linked list', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.append(1);
    linkedList.append(2);

    verify(linkedList, 1, 2, 1, 2, 2, '1,2');
  });

  it('should prepend node to linked list', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.prepend(2);
    verify(linkedList, 2, null, null, 2, 1, '2');

    linkedList.append(1);
    linkedList.prepend(3);
    verify(linkedList, 3, 2, 2, 1, 3, '3,2,1');
  });

  it('should get node by index', () => {
    const linkedList = new DoubleLinkedList();

    expect(linkedList.get(0)).toBeNull();

    linkedList.fromArray([1, 2, 3, 4, 5]);
    verify(linkedList, 1, 2, 4, 5, 5, '1,2,3,4,5');

    expect(linkedList.get(0).data).toBe(1);
    expect(linkedList.get(1).data).toBe(2);
    expect(linkedList.get(2).data).toBe(3);
    expect(linkedList.get(3).data).toBe(4);
    expect(linkedList.get(4).data).toBe(5);
    expect(linkedList.get(5)).toBeNull();
    verify(linkedList, 1, 2, 4, 5, 5, '1,2,3,4,5');
  });

  it('should insert node by index', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.fromArray([1, 2, 3]);
    verify(linkedList, 1, 2, 2, 3, 3, '1,2,3');

    linkedList.insert(5, 0);
    linkedList.insert(4, 2);
    linkedList.insert(3, 4);
    linkedList.insert(1, 6);
    linkedList.insert(5, 100);
    verify(linkedList, 5, 1, 3, 1, 7, '5,1,4,2,3,3,1');
  });

  it('should delete node by callback', () => {
    const linkedList = new DoubleLinkedList();

    expect(linkedList.delete(v => v === 5)).toBeNull();

    linkedList.append(1);
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);

    verify(linkedList, 1, 1, 4, 5, 8, '1,1,2,3,3,3,4,5');

    expect(linkedList.delete('notFunction')).toBeNull();

    const deletedNode = linkedList.delete(v => v === 3);
    expect(deletedNode.data).toBe(3);
    verify(linkedList, 1, 1, 4, 5, 5, '1,1,2,4,5');

    expect(linkedList.delete(v => v === 3)).toBeNull();
    verify(linkedList, 1, 1, 4, 5, 5, '1,1,2,4,5');

    linkedList.delete(v => v === 1);
    verify(linkedList, 2, 4, 4, 5, 3, '2,4,5');

    linkedList.delete(v => v === 5);
    verify(linkedList, 2, 4, 2, 4, 2, '2,4');

    linkedList.delete(v => v === 4);
    verify(linkedList, 2, null, null, 2, 1, '2');

    linkedList.delete(v => v === 2);
    expect(linkedList.toString()).toBe('');
  });

  it('should delete node by index', () => {
    const linkedList = new DoubleLinkedList();

    expect(linkedList.deleteIndex(5)).toBeNull();

    linkedList.append(1);
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);
    verify(linkedList, 1, 1, 4, 5, 8, '1,1,2,3,3,3,4,5');

    const deletedNode = linkedList.deleteIndex(0);
    expect(deletedNode.data).toBe(1);
    verify(linkedList, 1, 2, 4, 5, 7, '1,2,3,3,3,4,5');

    linkedList.deleteIndex(7);
    verify(linkedList, 1, 2, 4, 5, 7, '1,2,3,3,3,4,5');

    linkedList.deleteIndex(6);
    verify(linkedList, 1, 2, 3, 4, 6, '1,2,3,3,3,4');

    linkedList.deleteIndex(2);
    verify(linkedList, 1, 2, 3, 4, 5, '1,2,3,3,4');
  });

  it('should delete linked list tail', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    verify(linkedList, 1, 2, 2, 3, 3, '1,2,3');

    const deletedNode1 = linkedList.deleteTail();
    expect(deletedNode1.data).toBe(3);
    verify(linkedList, 1, 2, 1, 2, 2, '1,2');

    const deletedNode2 = linkedList.deleteTail();
    expect(deletedNode2.data).toBe(2);
    verify(linkedList, 1, null, null, 1, 1, '1');

    const deletedNode3 = linkedList.deleteTail();
    expect(deletedNode3.data).toBe(1);
    verifyEmpty(linkedList);

    expect(linkedList.deleteTail()).toBeNull();
  });

  it('should delete linked list head', () => {
    const linkedList = new DoubleLinkedList();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    verify(linkedList, 1, 2, 1, 2, 2, '1,2');

    const deletedNode1 = linkedList.deleteHead();
    expect(deletedNode1.data).toBe(1);
    verify(linkedList, 2, null, null, 2, 1, '2');

    const deletedNode2 = linkedList.deleteHead();
    expect(deletedNode2.data).toBe(2);
    verifyEmpty(linkedList);
  });

  it('should delete all nodes', () => {
    const linkedList = new DoubleLinkedList();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);
    verify(linkedList, 1, 2, 1, 2, 2, '1,2');

    linkedList.deleteAll();
    verifyEmpty(linkedList);
  });

  it('to string should work', () => {
    const linkedList = new DoubleLinkedList();

    const nodeValue1 = { value: 1, key: 'key1' };
    const nodeValue2 = { value: 2, key: 'key2' };

    linkedList
      .append(nodeValue1)
      .prepend(nodeValue2);

    const cb = value => `${value.key}:${value.value}`;

    expect(linkedList.toString(cb)).toBe('key2:2,key1:1');
  });

  it('should find node by callback', () => {
    const linkedList = new DoubleLinkedList();

    expect(linkedList.find('notFunction')).toBe(null);
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

  it('should find index by callback', () => {
    const linkedList = new DoubleLinkedList();

    expect(linkedList.findIndex('notFunction')).toBe(-1);
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
    const linkedList = new DoubleLinkedList();
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

    verify(linkedList, 1, 1, 4, 5, 8, '1,1,2,3,3,3,4,5');
  });

  it('should reverse linked list', () => {
    const linkedList = new DoubleLinkedList();

    linkedList
      .append(1)
      .append(2)
      .append(3);

    verify(linkedList, 1, 2, 2, 3, 3, '1,2,3');

    linkedList.reverse();
    verify(linkedList, 3, 2, 2, 1, 3, '3,2,1');

    linkedList.reverse();
    verify(linkedList, 1, 2, 2, 3, 3, '1,2,3');

    linkedList.deleteIndex(0);
    linkedList.deleteIndex(0);
    linkedList.reverse();
    verify(linkedList, 3, null, null, 3, 1, '3');
  });

  it('to array should returns array', () => {
    const linkedList = new DoubleLinkedList();

    linkedList
      .prepend(1)
      .append(2)
      .insert(0, 0);

    expect(linkedList.toArray().join(',')).toEqual('0,1,2');
  });

  it('should import from array', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.fromArray(1);
    verifyEmpty(linkedList);

    linkedList.fromArray([1]);
    verify(linkedList, 1, null, null, 1, 1, '1');
  });
});
