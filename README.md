# Tree Generator CLI & Visualizer

"A program to generate all possible trees with N nodes that have less than or equal to M leaf nodes."

Two major features:
- Prints out the trees as they are generated
- minimize the time required to generate each successive tree

Show the generated trees, and count the total number of trees for:
1) `N = 8`, `M = 5`
2) `N = 30`, `M = 3`

## Using the CLI

`yarn trees 8 5` = 814 trees (see output-1.txt)
`yarn trees 30 3` = 15,582,559 trees... until system failure (see output-2.txt in iCloud Drive)

## Running ThreeJS Visualization UI

`yarn start`

![Screenshot 2024-01-15 at 7 19 15 PM](https://github.com/aaronsmulktis/TreeGenerator/assets/1779579/72a5b282-4074-43bd-b5c4-26fbeda8653c)
