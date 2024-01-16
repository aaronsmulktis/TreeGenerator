import React, { useState, useEffect, useMemo } from 'react'
import { Canvas, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { generateTrees } from './utils/treeGenerator'
import { Environment } from './components/Environment'
import { Tree } from './components/Tree'
import './App.css'

function App() {
  const [maxNodes, setMaxNodes] = useState(5);
  const [maxLeaves, setMaxLeaves] = useState(3);
  const [trees, setTrees] = useState([]);
  useEffect(() => {
    document.title = 'Tree Generator'
    
    const generatedTrees = generateTrees(maxNodes, maxLeaves);
    setTrees([...generatedTrees]);

    return () => {
      document.title = 'Tree Generator'
    }
  }, [])

  const treeComponents = useMemo(() => {
    return Array.from(trees).map((tree, index) => {
      return <Tree key={index} data={tree} index={index} />;
    });
  }, [trees]);

  return (
    <div className="App">
      <input type="number" value={maxNodes} onChange={(e) => setMaxNodes(e.target.value)} />
      <input type="number" value={maxLeaves} onChange={(e) => setMaxLeaves(e.target.value)} />
      <button onClick={() => setTrees(generateTrees(maxNodes, maxLeaves))}>Generate Trees</button>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [-15, 10, 15], fov: 25 }}
      >
        <color attach="background" args={['skyblue']} />
        <group position={[0, -0.5, 0]} rotation={[0, -0.75, 0]}>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          
          {treeComponents}
        </group>
        <Environment />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}

export default App
