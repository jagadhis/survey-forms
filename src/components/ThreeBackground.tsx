import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xf0f0f0, 1);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        const pointsCount = 100;
        const positions = new Float32Array(pointsCount * 3);

        for (let i = 0; i < pointsCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }

        const pointsGeometry = new THREE.BufferGeometry();
        pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const pointsMaterial = new THREE.PointsMaterial({
            color: 0xd0d0d0,
            size: 0.1,
        });

        const points = new THREE.Points(pointsGeometry, pointsMaterial);
        scene.add(points);

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xd0d0d0,
            opacity: 0.6,
            transparent: true,
        });
        const lineSegments = new THREE.LineSegments(pointsGeometry, lineMaterial);
        scene.add(lineSegments);

        const animate = () => {
            requestAnimationFrame(animate);
            points.rotation.y += 0.0005;
            points.rotation.x += 0.0002;

            lineSegments.rotation.y += 0.0005;
            lineSegments.rotation.x += 0.0002;

            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />;
}