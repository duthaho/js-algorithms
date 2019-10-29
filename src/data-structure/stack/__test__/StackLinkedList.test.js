import StackLinkedList from '../StackLinkedList';

describe('StackLinkedList', () => {
  it('should create empty stack', () => {
    const stack = new StackLinkedList();
    expect(stack).not.toBeNull();
    expect(stack.length).toBe(0);
    expect(stack.toString()).toBe('');
  });

  it('should stack data to stack', () => {
    const stack = new StackLinkedList();

    stack.push(1);
    stack.push(2);

    expect(stack.toString()).toBe('1,2');
  });

  it('should peek data from stack', () => {
    const stack = new StackLinkedList();

    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  it('should clear data from stack', () => {
    const stack = new StackLinkedList();

    stack.push(1);
    stack.push(2);

    stack.clear();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.toString()).toBe('');
  });

  it('should check if stack is empty', () => {
    const stack = new StackLinkedList();

    expect(stack.isEmpty()).toBe(true);

    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it('should pop data from stack', () => {
    const stack = new StackLinkedList();

    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeNull();
    expect(stack.isEmpty()).toBe(true);
  });

  it('should be possible to push/pop objects', () => {
    const stack = new StackLinkedList();

    stack.push({ value: 'test1', key: 'key1' });
    stack.push({ value: 'test2', key: 'key2' });

    const stringifier = value => `${value.key}:${value.value}`;

    expect(stack.toString(stringifier)).toBe('key1:test1,key2:test2');
    expect(stack.pop().value).toBe('test2');
    expect(stack.pop().value).toBe('test1');
  });

  it('should be possible to convert stack to array', () => {
    const stack = new StackLinkedList();

    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.toArray()).toEqual([1, 2, 3]);
  });
});
