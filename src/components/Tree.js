import React, { useState } from "react"

const colors = ["green", "blue", "red", "yellow", "purple", "orange"]

const drawTree = (tree, x, y, z, angle, length, radius, colorIndex, isLeaf) => {
  // console.log("drawing tree: ", x, y, z, angle, length, radius)
  const color = isLeaf ? "green" : colors[colorIndex % colors.length]
  const elements = [
    <mesh key={tree.id} position={[x, y, z]} rotation={[angle, angle, 0]}>
      {isLeaf ? <sphereGeometry args={[radius, 8, 8]} />
      : <cylinderGeometry args={[radius, radius, length, 8]} />}
      <meshStandardMaterial color={color} />
    </mesh>
  ]

let childAngleDelta = Math.PI / 4
let childLength = length * 0.5
let childRadius = radius * 0.5

tree.nodes.forEach((childNode, index) => {
    const childIsLeaf = tree.nodes.length === 0
    // console.log("draw branch: ", childNode, index)
    let childAngle = angle + (index - tree.nodes.length / 2) * childAngleDelta
    let childX = x + Math.cos(childAngle) * length / 2
    let childY = y + Math.sin(childAngle) * length / 2
    elements.push(...drawTree(
      childNode,
      childX,
      childY,
      z,
      childAngle,
      childLength,
      childRadius,
      colorIndex + 1
    ))
  })

  // console.log("elements: ", elements)

  return elements
}

export const Tree = ({ data: tree, index }) => {
  console.log("tree: ", index, tree)

  if (!tree) {
    return <div>Loading...</div>
  }

  return (
    <>
      <mesh>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} />
        {drawTree(
          tree, // 
          index * 10, // 
          0, // 
          0, // 
          index, // 
          100, // 
          0.1, // 
          index)} // 
      </mesh>
    </>
  )
}
