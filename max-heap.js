
class MaxHeapNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
    //EX: returns 
    //  [childL, childR, 
    //     [gcLL, gclR,
    //         [null, ggcLLR, null || empty, [null, null]],
    //         [null, null]
    //     ],
    //     [gcRL, gcRR,
    //         [null, null], 
    //         [null, null]
    //     ]
    //  ]
    getMap() {
        //Base Case
        if(this.isLeaf()) return([null,null]);
        //Normal Case
        let result = [];
        if(this.left){
            result[0] = this.left.val;
            result[2] = this.left.getMap();
        } else {
            result[0] = null;
            result[2] = null;
        }
        if (this.right) {
            result[1] = this.right.val;
            result[3] = this.right.getMap();
        } else {
            result[1] = null;
            result[3] = null;
        }
        return result;
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
            this.left = this.left.append(node);
        }
        return this;
    }
}


class MaxHeap {
    constructor(head=null){
        this.head = head;
        this.size;
    }

    getMap() {
        if(this.head)
            return [this.head.val, this.head.getMap()];
        else
            return null;
    }
    printMap() {
        const _printMapRecurse = (arr) => {
            if (arr[0] === null && arr[1] === null) 
                return "null            null";
            
            let currLine = `${arr[0]}          ${arr[1]}\n`;
            currLine +=    "  /  \\                 /  \\\n";

            if(arr[2] === null){
                currLine += "                ";
            } else {
                currLine += _printMapRecurse(arr[2]);
            } if (arr[3] === null) {
                currLine += "                ";
            } else {
                currLine += _printMapRecurse(arr[3]);
            }
            currLine += "\n";
            return currLine;
        }

        const map = this.getMap();
        console.log('     ', map[0], '-    ');
        console.log("     /  \\  ");
        console.log(_printMapRecurse(map[1]))

    }
    append(val) {
        const node = new MaxHeapNode(val);
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
const heapHead = new MaxHeapNode(100);
module.exports = { MaxHeap, MaxHeapNode };
