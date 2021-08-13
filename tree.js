/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }

  getDescendants(){
    const descendants = [...this.children];
    for(let child of this.children) {
      descendants.push(...child.getDescendants());
    }
    return descendants;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  getAll() {
    if(this.root) {
      return [this.root, ...this.root.getDescendants()];
    } else {
      return [];
    }
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    const nodes = this.getAll();
    const summedVals = nodes.reduce((acc, node) => acc + node.val, 0);
    return summedVals;
    
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    const nodes = this.getAll();
    const summedVals = nodes.reduce((acc, node) => {      
      if(node.val % 2 === 0) {
        return ++acc;
      } else return acc;
    }, 0);
    return summedVals;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {

    const nodes = this.getAll();
    const summedVals = 
      nodes.reduce((acc, node) => (
        node.val > lowerBound ? 
          ++acc : acc
      ), 0);
    return summedVals;

  }
}

module.exports = { Tree, TreeNode };
