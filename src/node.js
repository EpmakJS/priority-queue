class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		} else if (this.right === null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (node === this.left) {
			this.left = null;
			node.parent = null;
		} else if (node === this.right) {
			this.right = null;
			node.parent = null;
		} else throw new Error();
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {			
			let father = this.parent;
			let nextParent = this.parent.parent;
			let left = this.left;
			let right = this.right;
			if (nextParent) {
				if (this.parent === nextParent.left) {
					nextParent.left = this;

				} else if (this.parent === nextParent.right) {
					nextParent.right = this;
				}
			}
			if (this === father.left){
				this.left = father;
				this.right = this.parent.right
				
			} else if (this === father.right){
				this.right = father;
				this.left = this.parent.left;
				 
			}
			if (father.left && father.right) {
				if (this === father.left) {
					this.right.parent = this;
					
				} else if (this === father.right) {
					this.left.parent = this;
				} 
			}
			this.parent = nextParent;			
			father.parent = this;
			father.left = left;
			father.right = right
			if (left) {
				left.parent = father;
			} 
			if (right) {
				right.parent = father;
			} 	
		}
	}
}

module.exports = Node;
