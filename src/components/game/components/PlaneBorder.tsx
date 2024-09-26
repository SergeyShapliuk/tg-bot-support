import React from "react";
import {Vector3Tuple} from "three";


interface PlaneBorderProps {
    children?: React.ReactNode;
    borderWidth: number;
    position?: Vector3Tuple;
    color?: string;
    opacity?: number;
    renderOrder?: any;
    args?: any;
}

export function PlaneBorder({
                                children,
                                borderWidth,
                                position = [0, 0, 0],
                                color = "white",
                                opacity = 1
                            }: PlaneBorderProps) {
    const size = [10, 10]; // Set default size or pass size as a prop

    const width = size[0];
    const height = size[1];

    const argsForLeftAndRightPlanes: [number, number] = [width + borderWidth * 2, borderWidth];

    const argsForTopAndBottomPlanes: [number, number] = [borderWidth, height];

    const positionZOfLeftPlane = height / 2 + borderWidth / 2;
    const positionXOfTopPlane = width / 2 + borderWidth / 2;

    return (
        <group position={position}>
            {/* Left Plane */}
            <mesh position={[0, 0, positionZOfLeftPlane]}>
                <planeGeometry args={argsForLeftAndRightPlanes}/>
                <meshBasicMaterial color={color} transparent={true} opacity={opacity}/>
            </mesh>
            {/* Right Plane */}
            <mesh position={[0, 0, -positionZOfLeftPlane]}>
                <planeGeometry args={argsForLeftAndRightPlanes}/>
                <meshBasicMaterial color={color} transparent={true} opacity={opacity}/>
            </mesh>
            {/* Top Plane */}
            <mesh position={[positionXOfTopPlane, 0, 0]}>
                <planeGeometry args={argsForTopAndBottomPlanes}/>
                <meshBasicMaterial color={color} transparent={true} opacity={opacity}/>
            </mesh>
            {/* Bottom Plane */}
            <mesh position={[-positionXOfTopPlane, 0, 0]}>
                <planeGeometry args={argsForTopAndBottomPlanes}/>
                <meshBasicMaterial color={color} transparent={true} opacity={opacity}/>
            </mesh>
            {children}
        </group>
    );
}
