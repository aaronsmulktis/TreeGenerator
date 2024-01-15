import React, { useState } from "react";

const drawBranch = (x, y, z, length, angle, radius) => {
  return (
    <mesh position={[x, y, z]} rotation={[0, 0, angle]}>
      <cylinderGeometry args={[radius, radius, length, 8]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

export const Tree = ({ data }) => {
  return (
    <>
      <mesh>
        {drawBranch(0, 0, 0, 100, 0, 0.1)}
      </mesh>
    </>
  );
};
