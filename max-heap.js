
class maxHeapNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    isLeaf() {
        return !(this.left || this.right)
    }

    append(node) {
        if (node.val > this.val ) {
            node.left = this;
            return node;
        } else if(!this.left) {
            this.left = node;
        } else if(!this.right) {
            this.right = node;
        } else {
            this.left.append(node);
        }
        return this;
    }
}


class maxHeap {
    constructor(head=null){
        this.head = head;
        this.size;
    }

    append(val) {
        const node = maxHeapNode(val);
        if(this.head === null) {
            this.head = node;
        } else {
            const newHead = this.head.append(node);
            this.head = newHead;
        }
    }
    //unfinsihed.... what if
    pop() {
        if(this.head === null) throw Error("NO ITEMS IN HEAP!");
        const returnVal = this.head.val;

        if(this.head.isLeaf()){
            this.head = null;
        }else if(!this.head.left) {
            this.head = this.head.right;
        } else if(!this.head.right) {
            this.head = this.head.left;
        } else {
            if(this.head.left.val > this.head.right.val){
                const right = this.head.right;
                this.head = this.head.left;
                this.head.append(right);
            } else {
                const left = this.head.left;
                this.head = this.head.right;
                this.head.append(left);
            }
        }
        return returnVal
    }
}
const heapHead = new maxHeapNode(100);
