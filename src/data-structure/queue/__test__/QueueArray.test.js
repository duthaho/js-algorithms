import QueueArray from '../QueueArray';

describe('QueueArray', () => {
  it('should create empty queue', () => {
    const queue = new QueueArray();
    expect(queue).not.toBeNull();
    expect(queue.length).toBe(0);
  });

  it('should enqueue data to queue', () => {
    const queue = new QueueArray();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.toString()).toBe('1,2');
  });

  it('should be possible to enqueue/dequeue objects', () => {
    const queue = new QueueArray();

    queue.enqueue({ value: 'test1', key: 'key1' });
    queue.enqueue({ value: 'test2', key: 'key2' });

    const stringifier = value => `${value.key}:${value.value}`;

    expect(queue.toString(stringifier)).toBe('key1:test1,key2:test2');
    expect(queue.dequeue().value).toBe('test1');
    expect(queue.dequeue().value).toBe('test2');
  });

  it('should peek data from queue', () => {
    const queue = new QueueArray();

    expect(queue.peek()).toBeNull();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);
  });

  it('should clear data from queue', () => {
    const queue = new QueueArray();

    queue.enqueue(1);
    queue.enqueue(2);

    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.toString()).toBe('');
  });

  it('should check if queue is empty', () => {
    const queue = new QueueArray();

    expect(queue.isEmpty()).toBe(true);

    queue.enqueue(1);

    expect(queue.isEmpty()).toBe(false);
  });

  it('should dequeue from queue in FIFO order', () => {
    const queue = new QueueArray();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBeNull();
    expect(queue.isEmpty()).toBe(true);
  });

  it('should be possible to convert queue to array', () => {
    const queue = new QueueArray();

    expect(queue.peek()).toBeNull();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.toArray()).toEqual([1, 2, 3]);
  });
});
