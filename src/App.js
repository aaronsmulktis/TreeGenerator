import React, { useState, useEffect } from 'react'
import { Canvas, extend, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { OrbitControls, TransformControls } from 'three-stdlib'
import { generateTrees } from './treeGenerator'
import { Tree } from './Tree'
import './App.css'

extend({ OrbitControls, TransformControls })

function Controls() {
  const { camera, gl } = useThree()
  const orbitControls = new OrbitControls(camera, gl.domElement)
  return (
    <>
      <orbitControls />
      {/* <transformControls /> */}
    </>
  )
}

function App() {
  const [trees, setTrees] = useState([]);
  useEffect(() => {
    document.title = 'Tree Generator'

    setTrees(generateTrees(5, 3))

    return () => {
      document.title = 'Tree Generator'
    }
  }, [])
  return (
    <div className="App">
      <Canvas>
        {/* <PerspectiveCamera makeDefault manual /> */}
        {/* <Controls /> */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} />
        <Tree />
      </Canvas>
    </div>
  )
}

export default App
