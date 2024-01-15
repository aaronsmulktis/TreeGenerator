// generate all possible trees with N nodes that have less than or equal to M leaf nodes

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
    console.log("4. serialize: ", this._serializeNode(this.root));
    return this._serializeNode(this.root)
  }

  _serializeNode(node) {
    console.log("4. serializedNode: ", node)
    if (node.nodes.length === 0) return '()'
    let childrenSerialization = node.nodes.map(child => this._serializeNode(child)).join(',')
    console.log("childrenSerialization: ", childrenSerialization)
    return `(${childrenSerialization})`
  }

  addNode(parentNode, childNode) {
    console.log("6. addNode: ", parentNode, childNode)
    parentNode.nodes.push(childNode)
  }

  generateNodes(n, m, trees) {
    console.log("2. Generating nodes")
    this._generateNodesHelper(this.root, 1, 0, n, m, trees);
  }

  _generateNodesHelper(node, totalNodes, leafNodes, maxNodes, maxLeaves, trees) {
    console.log("3. generateNodesHelper: ", node, totalNodes, leafNodes, maxNodes, maxLeaves, trees)

    if (totalNodes >= maxNodes || leafNodes >= maxLeaves) {
      console.log("3. Totals reached maxes, returning")
      return
    }

    trees.add(this.serialize());

    for (let existingNode of this.getAllNodes()) {
      console.log("3. Looping through nodes: ", totalNodes)
      let newNode = new TreeNode(`node-${totalNodes}`);
      this.addNode(existingNode, newNode);

      let newLeafCount = existingNode.nodes.length === 1 ? leafNodes + 1 : leafNodes;
      this._generateNodesHelper(newNode, totalNodes + 1, newLeafCount, maxNodes, maxLeaves, trees);

      existingNode.nodes.pop();
    }
  }

  getAllNodes() {
    console.log("4. getAllNodes: ", this.root)
    let nodes = [];
    let queue = [this.root];
    while (queue.length > 0) {
      let currentNode = queue.shift();
      nodes.push(currentNode);
      queue.push(...currentNode.nodes);
    }
    return nodes;
  }
}

export const generateTrees = (N, M) => {
  console.log(`1. Generating trees with ${N} nodes and ${M} leaves`);
  let trees = new Set();
  let newTree = new Tree("node-0");
  newTree.generateNodes(N, M, trees);
  console.log("5. All Trees: ", trees);
  return trees;
};