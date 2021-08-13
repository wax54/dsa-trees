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

  greatestPath() {
    //base case #is the end of the road
    if (this.isLeaf()) return this.val;
    //normal case
    else {
      if (!this.left) {
        //left side is a dead end just return the greatest 
        //  path of the right side. plus this value
        return this.right.greatestPath() + this.val;
      } else if (!this.right) {
        //right side is a dead end just return the greatest 
        //  path of the left side. plus this value
        return this.left.greatestPath() + this.val;
      } else {
        //both paths exist, return the bigger of the two paths.
        return Math.max(
          this.left.greatestPath() + this.val,
          this.right.greatestPath() + this.val
        );
      }
    }
  }

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

  distanceToNode(node) {
    if (this === node) return 1;
    else if(this.isLeaf()) return null;
    else {
      if (!this.left) {
        return this.right.distanceToNode() + 1;
      } else if (!this.right) {
        return this.left.distanceToNode() + 1;
      } else {
        const left = this.left.distanceToNode();
        const right = this.right.distanceToNode();
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
    if(this.root)
      return this.root.greatestPath();
    else 
      return 0;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    return this.root.findNextLargest(lowerBound);
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
    //if sL2^ is null, it won't be === to sL2
    if(stackLevelOne === stackLevelTwo) {
      return true;
    //otherwise they are not cousins
    }else {
      return false;
    }
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
