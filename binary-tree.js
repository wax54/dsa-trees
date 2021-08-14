/** BinaryTreeNode: node for a binary tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
  
  isLeaf() {
    return !(this.left || this.right) 
  }

  pathWithGreatestSum() {
    //base case #is the end of the road
    if (this.isLeaf()) return this.val;
    //normal case
    else {
      let pathWithGreatestSum = 0;
      if (!this.left) {
        //left side is a dead end just return the greatest 
        //  path of the right side. plus this value
        pathWithGreatestSum = this.right.pathWithGreatestSum();
      } else if (!this.right) {
        //right side is a dead end just return the greatest 
        //  path of the left side. plus this value
        pathWithGreatestSum = this.left.pathWithGreatestSum();
      } else {
        //both paths exist, return the bigger of the two paths.
        pathWithGreatestSum = Math.max(
          this.left.pathWithGreatestSum(),
          this.right.pathWithGreatestSum()
        );

      }
      if (pathWithGreatestSum > 0) {
        return pathWithGreatestSum + this.val;
      } else {
        return this.val;
      }
    }
  }
  // greatestPathToLeaf() {
  //   //base case #is the end of the road
  //   if (this.isLeaf()) return this.val;
  //   //normal case
  //   else {
  //     if (!this.left) {
  //       //left side is a dead end just return the greatest 
  //       //  path of the right side. plus this value
  //       return this.right.greatestPath() + this.val;
  //     } else if (!this.right) {
  //       //right side is a dead end just return the greatest 
  //       //  path of the left side. plus this value
  //       return this.left.greatestPath() + this.val;
  //     } else {
  //       //both paths exist, return the bigger of the two paths.
  //       return Math.max(
  //         this.left.greatestPath() + this.val,
  //         this.right.greatestPath() + this.val
  //       );
  //     }
  //   }
  // }
  //#Janky, to be worked on
  // possiblePathsToLeavesSums() {
  //   //base case 
  //   if (this.isLeaf()) return [this.val];
  //   //normal case
  //   else {
  //     if (!this.left) {
  //       //left side is a dead end just return the greatest 
  //       //  path of the right side. 
  //       //  Plus this value
  //       return [this.right.possiblePathsToLeavesSums().map( sum => sum + this.val)];
  //     } else if (!this.right) {
  //       //right side is a dead end just return the greatest 
  //       //  path of the left side. plus this value
  //       return this.left.possiblePathsToLeavesSums().map(sum => sum + this.val);
  //     } else {
  //       //both possible
  //       return [
  //         ...this.left.possiblePathsToLeavesSums().map(sum => sum + this.val),
  //         ...this.right.possiblePathsToLeavesSums().map(sum => sum + this.val)
  //       ];
  //     }
  //   }
  // }

  shortestToLeaf() {
    //we're at a leaf, there is one node on this path
    if (this.isLeaf()) return 1;
    else {
      if (!this.left) {
        return this.right.shortestToLeaf() + 1;
      } else if (!this.right) {
        return this.left.shortestToLeaf() + 1;
      } else {
        return Math.min(
            this.left.shortestToLeaf(), 
            this.right.shortestToLeaf()
            ) + 1;
      }
    }
  }

  longestToLeaf() {
    if (this.isLeaf()) return 1;
    else {
      if (!this.left) {
        return this.right.longestToLeaf() + 1;
      } else if (!this.right) {
        return this.left.longestToLeaf() + 1;
      } else {
        return Math.max(
          this.left.longestToLeaf(),
          this.right.longestToLeaf()
        ) + 1;
      }
    }
  }

  findParent(node) {
    if (this.left === node) return this;
    else if (this.right === node) return this;
    else if (this.isLeaf()) return null;
    else {
      if (!this.left) {
        return this.right.findParent(node);
      } else if (!this.right) {
        return this.left.findParent(node);
      } else {
        const left = this.left.findParent(node);
        const right = this.right.findParent(node);
        if (right) return right;
        else if (left) return left;
        else return null;
      }
    }
  }

  distanceToNode(node) {
    if (this === node) return 1;
    else if(this.isLeaf()) return null;
    else {
      if (!this.left) {
        return this.right.distanceToNode(node) + 1;
      } else if (!this.right) {
        return this.left.distanceToNode(node) + 1;
      } else {
        const left = this.left.distanceToNode(node);
        const right = this.right.distanceToNode(node);
        if (right) return right + 1;
        else if(left) return left + 1;
        else return null;
      }
    }
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  findNextLargest(num) {
    if(this.isLeaf()) return this.val > num ? this.val : null;
    else {
      if(!this.left) {
        //no left side
        if (this.val > num){
            const nextLargest = this.right.findNextLargest(num);
            if(nextLargest) 
              return Math.min(this.val, nextLargest);
            else 
              return this.val;
        } else
            return this.right.findNextLargest(num);
      } else if(!this.right) {
        //no right side
        if (this.val > num) {
          const nextLargest = this.left.findNextLargest(num);
          if (nextLargest)
            return Math.min(this.val, this.left.findNextLargest(num));
          else
            return this.val;
        } else
          return this.left.findNextLargest(num);
      } else {
        //there are both left and right nodes
        const left = this.left.findNextLargest(num)
        const right = this.right.findNextLargest(num)
        if (this.val > num)
          if(left)
            if(right)
              return Math.min(this.val, left, right);
            else
              return Math.min(this.val, left);
          else
            return this.val;
        else
          if(left)
            if(right)
              return Math.min(left, right);
            else
              return left;
          else
            return null;
      }
    }
  }

  arrayify() {
    const result = [];
    result.push(this.left ? this.left.val : null);
    result.push(this.right ? this.right.val : null);

    if(this.left) {
      result.push(...this.left.arrayify());
    }
    if(this.right) {
      result.push(...this.right.arrayify());
    }
    return result;
  }

  constructFromArray(arr, idx=0) {
    if (arr[idx]) {
      this.left = new BinaryTreeNode(arr[idx]);
    }
    if (arr[idx + 1]) {
      this.right = new BinaryTreeNode(arr[idx + 1]);
    }

    idx += 2;
    if (this.left) {
      idx = this.left.constructFromArray(arr, idx);
    } 
    if (this.right) {
      idx = this.right.constructFromArray(arr, idx);
    }
    return idx;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    const currNode = this.root;
    return currNode ? currNode.shortestToLeaf() : 0;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const currNode = this.root;
    return currNode ? currNode.longestToLeaf() : 0;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if(this.root){
      const leftPath = this.root.left ? this.root.left.pathWithGreatestSum() : 0;
      const rightPath = this.root.right ? this.root.right.pathWithGreatestSum() : 0;
      return leftPath + rightPath + this.root.val;
    } else 
      return 0;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(this.root)
      return this.root.findNextLargest(lowerBound);
    else
      return null;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) 
   * O(n^2) yikes*/

  areCousins(node1, node2) {
    const stackLevelOne = this.root.distanceToNode(node1);
    //don't have to search for the other one, the first one is not in here

    if (stackLevelOne === null) {
      return false;
    }

    const stackLevelTwo = this.root.distanceToNode(node2);
    //if sL2^ is null, it won't be === to sL1
    if(stackLevelOne === stackLevelTwo) {
      const parent = this.root.findParent(node1);
      if(parent.left === node2 || parent.right === node2)
        return false;
      else
        return true;
    //otherwise they are not cousins
    }else {
      return false;
    }
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const result = tree.root.arrayify();
    result.unshift(tree.root.val);
    return JSON.stringify(result);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const arr = JSON.parse(stringTree);
    const rootVal = arr.shift();
    const rootNode = new BinaryTreeNode(rootVal);
    rootNode.constructFromArray(arr);
    return new BinaryTree(rootNode);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. 
   * Huge Runtime
   * */

  lowestCommonAncestor(node1, node2) {
    let currNode = this.root;

    /** If I can't find one or more of my nodes */
    if(currNode.distanceToNode(node1) === null || currNode.distanceToNode(node2) === null)
      // return null
      return null;

    //otherwise...
    let left;
    let right;
    do {
      //both nodes on left?
      left = (currNode.left.distanceToNode(node1) !== null &&
        currNode.left.distanceToNode(node2) !== null);
      //both nodes on right?
      right = (currNode.right.distanceToNode(node1) !== null &&
        currNode.right.distanceToNode(node2) !== null);
      //if both on left..
      if(left) {
        //.. dive deeper into the left
        currNode = currNode.left;
      //if both on right..
      } else if(right) {
        //..dive deeper into right
        currNode = currNode.right;
      }
      // other wise, we are at LCA
    //Repear while both of my nodes can be found on the same side
    } while (left || right);

    return currNode;

    // let temp1 = node1;
    // let temp2 = node2;
    // let dist1 = this.root.distanceToNode(temp1);
    // let dist2 = this.root.distanceToNode(temp2);   

    // if(dist1 === null || dist2 === null) return null;

    // while (dist1 !== dist2) {

    //   return null;
    //   if(dist1 > dist2) {
    //     temp1 = this.root.findParent(temp1);
    //   } else {
    //     temp2 = this.root.findParent(temp2);
    //   }
    //     dist1 = this.root.distanceToNode(temp1);
    //     dist2 = this.root.distanceToNode(temp2);
    // }

    // console.log('hello');
    // while (temp1 !== temp2); {

    //   console.log('temp1: ', temp1, 'temp2: ', temp2);
    //   return null;

    //   temp1 = this.root.findParent(temp1);
    //   temp2 = this.root.findParent(temp2);
    // } 
    // return temp1;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
