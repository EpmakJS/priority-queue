const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		this.heap.push(data, priority);
		if(this.heap.heapSize > this.maxSize) throw new Error ('Heap is full')
	}

	shift() {
		if(!this.heap.isEmpty()) {
			let nodeValue = this.heap.pop();
			return nodeValue;
		} else throw new Error ('This queue is empty');
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		if (this.heap.isEmpty()) {
			return true;
		} else return false;
	}
}

module.exports = PriorityQueue;
