const Node = require('./node.js');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		let node = new Node(data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(this.root != null){
			let detached = this.detachRoot();
			if(this.parentNodes.length != 0){
				this.restoreRootFromLastInsertedNode(detached);
				this.shiftNodeDown(this.root);
			}
			this.heapSize--;
			return detached.data;
		}
		return;
	}

	detachRoot() {
		if(this.root === null)
			return;
		let node = this.root;
		this.root = null;
		if(this.parentNodes[0] === node)
			this.parentNodes.shift();
		return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length > 1) {
			let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
			this.parentNodes.pop();
			this.root = lastInsertedNode;
			if (lastInsertedNode.parent === detached) {
				this.parentNodes.unshift(lastInsertedNode);
			}
			if (detached.left !== lastInsertedNode) {
				lastInsertedNode.appendChild(detached.left);
			}
			if (detached.right !== lastInsertedNode) {
				lastInsertedNode.appendChild(detached.right);
			}			
		}
		if (this.parentNodes.length === 1) {
			let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
			this.root = lastInsertedNode;
			this.parentNodes.pop();
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return this.heapSize == 0 ? true : false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		this.heapSize++;
		this.parentNodes.push(node);
		
		if(this.root === null){
			this.root = this.parentNodes[0];
			return;
		}
		this.parentNodes[0].appendChild(node);
		if(this.parentNodes[0].left != null &&
			this.parentNodes[0].right != null)
			this.parentNodes.shift();
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			if (node.parent === this.root) {
				this.root = node;
			}
			let fatherPos = this.parentNodes.indexOf(node.parent);
			let nodePos = this.parentNodes.indexOf(node);
			if (fatherPos != -1) {
				this.parentNodes[fatherPos] = node;
			}
			if (nodePos != -1) {
				this.parentNodes[nodePos] = node.parent;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		} else if (node.parent === null) 
			this.root = node;
	}

	shiftNodeDown(node) {
		if (node) {
			if ((node.left && node.left.priority > node.priority) || (node.right && node.right.priority > node.priority)) {
				let maxChild;
				let maxChildPos;
				let nodePos = this.parentNodes.indexOf(node);			
				if (node.left && node.right) {
					if (node.left.priority > node.right.priority) {
						maxChild = node.left;
					} else if (node.right.priority > node.left.priority) {
						maxChild = node.right;
					}
				} else {			
					if (node.left) {
						maxChild = node.left;
					}
					if (node.right) {
						maxChild = node.right;
					}
				}
				maxChildPos = this.parentNodes.indexOf(maxChild);
				if (maxChildPos != -1) {
					this.parentNodes[maxChildPos] = node;
				}
				if (nodePos != -1) {
					this.parentNodes[nodePos] = maxChild;
				}
				if (node === this.root) {
					this.root = maxChild;
				}
				maxChild.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
