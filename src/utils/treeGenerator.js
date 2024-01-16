class TreeNode {
  constructor(id) {
    this.id = id;
    this.nodes = [];
  }
}

class Tree {
  constructor(rootId) {
    this.root = new TreeNode(rootId);
  }

  serialize() {
    return this._serializeNode(this.root)
  }

  _serializeNode(node) {
    if (node.nodes.length === 0) return { id: node.id, nodes: [] }
    let childrenSerialization = node.nodes.map(child => this._serializeNode(child))
    return {id: node.id, nodes: childrenSerialization}
  }

  addNode(parentNode, childNode) {
    parentNode.nodes.push(childNode)
  }

  getAllNodes() {
    let nodes = [];
    let queue = [this.root];
    while (queue.length > 0) {
      let currentNode = queue.shift();
      nodes.push(currentNode);
      queue.push(...currentNode.nodes);
    }
    return nodes;
  }

  generateNode(node, totalNodes, leafNodes, maxNodes, maxLeaves, trees) {

    if (totalNodes >= maxNodes || leafNodes >= maxLeaves) {
      return
    }

    trees.add(this.serialize());

    for (let existingNode of this.getAllNodes()) {
      let newNode = new TreeNode(`node-${totalNodes}`);
      this.addNode(existingNode, newNode);

      let newLeafCount = existingNode.nodes.length === 1 ? leafNodes + 1 : leafNodes;
      this.generateNode(newNode, totalNodes + 1, newLeafCount, maxNodes, maxLeaves, trees);

      existingNode.nodes.pop();
    }
  }

  createTree(n, m, trees) {
    this.generateNode(this.root, 1, 0, n, m, trees);
  }
}

export const generateTrees = (N, M) => {
  let trees = new Set();
  let newTree = new Tree("node-0");
  newTree.createTree(N, M, trees);
  return trees;
};