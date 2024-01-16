treeId = 0

class TreeNode {
  constructor(id) {
    this.id = id;
    this.nodes = [];
  }

  toASCII(prefix = '', isTail = true) {
    let result = prefix + (isTail ? "└── " : "├── ") + this.id + '\n';
    for (let i = 0; i < this.nodes.length; i++) {
      const child = this.nodes[i];
      result += child.toASCII(prefix + (isTail ? "    " : "│   "), i === this.nodes.length - 1);
    }
    return result;
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

  generateNode(node, totalNodes, leafNodes, maxNodes, maxLeaves) {
    if (totalNodes >= maxNodes || leafNodes >= maxLeaves) {
      return;
    }

    console.log("Tree: ", treeId++);
    console.log(this.root.toASCII());

    for (let existingNode of this.getAllNodes()) {
      let newNode = new TreeNode(`node-${totalNodes}`);
      this.addNode(existingNode, newNode);

      let newLeafCount = existingNode.nodes.length === 1 ? leafNodes + 1 : leafNodes;
      this.generateNode(newNode, totalNodes + 1, newLeafCount, maxNodes, maxLeaves);

      existingNode.nodes.pop();
    }
  }

  createTree(n, m) {
    this.generateNode(this.root, 1, 0, n, m);
  }
}

const generateTrees = (N, M) => {
  let newTree = new Tree("node-0");
  newTree.createTree(N, M);
};

function reconstructTree(serializedNode) {
  let node = new TreeNode(serializedNode.id);
  serializedNode.nodes.forEach(child => {
    node.nodes.push(reconstructTree(child));
  });
  return node;
}

if (require.main === module) {
  const N = process.argv[2];
  const M = process.argv[3];

  if (!N || !M) {
    console.log("Please provide N and M values");
    process.exit(1);
  }

  generateTrees(parseInt(N, 10), parseInt(M, 10));
}