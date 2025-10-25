import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/earth-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Earth.geometry} material={materials.Earth_mat} />
    </group>
  )
}

useGLTF.preload('/models/earth-transformed.glb')
