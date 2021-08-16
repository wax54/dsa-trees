
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
        } else if (!this.right) {
            this.right = node;
        } else if(!this.left) {
            this.left = node;
        } else {
            this.right = this.right.append(node);
        }
        return this;
    }
}


class MaxHeap {
    constructor(head=null){
        this.head = head;
        this.size;
    }   
    /**
     * #GOAL
     * ifmap.length == 2
     *   500
     *  /  \
     * n    n
     * 
     *OR if map.length == 4
     *          500
     *          /    \
     *      107        185
     *      /  \      /   \
     *    106   74   162   n
     *    /  \ / \  / \ / \
     *   n   n n n  n n n n
     */

    printMoreUsefulMap() {
        const map = this.getMoreUsefulMap();
        for(i in map) {
            if(typeof map[i] !== "array"){
                console.log(" ".repeat(3 * (i - map.length))+map[i]);
                console.log(" ".repeat(3 * (i - map.length))+"");

            }else {
                printArray(map[i], i);
            }
        }

    }
    //Goal [1, [1, 2], [null, 1, 2, 3], [null, null, 1, 2, 8, null, 1, null, null]]
    getMoreUsefulMap() {
        const finalResult = [];
        let result = finalResult;
        const queue = [this.head, "LINEBREAK"];
        let currNode;

        while(queue.length) {
            currNode = queue.shift();
            if(currNode === "LINEBREAK") {
                const temp = [];
                finalResult.push(temp);
                result = temp;
                /** when we hit a line break, we have added the children 
                 * of all the nodes from this line to the queue, it's time to add another line break on top 
                 * (if nothings in the queue, we have no more lines)
                 * */
                if(queue.length)
                    queue.push("LINEBREAK");
                continue;
            }
            result.push(currNode ? currNode.val : null);
            if(currNode){
                queue.push(currNode.left, currNode.right);
            }
        }
        return finalResult;
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
                return "null null";
            
            let currLine = `${arr[0] || "null"}   ${arr[1]|| "null"}\n`;
            currLine +=    "/  \\     /  \\\n";

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
        console.log(' ', map[0], '');
        console.log("  /   \\  ");
        console.log(_printMapRecurse(map[1]))

    }
    append(val) {
        const node = new MaxHeapNode(val);
        this.size++;
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
        this.size--;
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
const tree = new MaxHeap(heapHead);
tree.append(100);
tree.append(10);
tree.append(1);
tree.append(5);
tree.append(500);
tree.append(105);
tree.append(-100);
tree.append(-00);


module.exports = { MaxHeap, MaxHeapNode, tree };
