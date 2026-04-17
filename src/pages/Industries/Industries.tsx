import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { industryData } from './industryData';
import './Industries.css';

gsap.registerPlugin(ScrollTrigger);

function roundedRect(ctx: THREE.Shape, x: number, y: number, width: number, height: number, radius: number) {
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
}

export default function Industries() {
    const mountRef = useRef<HTMLDivElement>(null);
    const scrollStatus = useRef(false);
    const disableAnimate = useRef(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animation for the text reveal
        if (textRef.current) {
            gsap.fromTo(textRef.current.children,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: mountRef.current,
                        start: "top 60%", // Reveals when user scrolls halfway into it
                    }
                }
            );
        }

        if (!mountRef.current) return;
        const container = mountRef.current;

        const scene = new THREE.Scene();
        // Match the background to CaseStudies / Signal for smooth fade
        scene.background = new THREE.Color('#06231D');

        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(window.devicePixelRatio);

        const posterSize = { h: 40, w: 27, padding: 3, cols: 11, rows: 10 };
        const canvasSize = { h: window.innerHeight, w: window.innerWidth };

        renderer.setSize(canvasSize.w, canvasSize.h);
        container.appendChild(renderer.domElement);

        const posterShape = new THREE.Shape();
        roundedRect(posterShape, 0, 0, posterSize.w, posterSize.h, 2);
        const posterGeometry = new THREE.ShapeGeometry(posterShape);

        const startingY = -posterSize.h - posterSize.padding;
        const assetGroup = new THREE.Group();
        assetGroup.position.y = startingY;
        assetGroup.position.x = -((posterSize.w * posterSize.cols) + (posterSize.padding * (posterSize.cols - 1))) / 2;
        scene.add(assetGroup);

        const camera = new THREE.PerspectiveCamera(75, canvasSize.w / canvasSize.h, 0.1, 1000);
        camera.rotation.x = 0.7;
        camera.position.z = 60;
        camera.position.y = 45;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const spotLight = new THREE.PointLight(0xffffff, 2000, 500);
        spotLight.position.set(0, posterSize.h * 1.5, 50);
        scene.add(spotLight);

        const posterCollection: THREE.Group[] = [];
        let assetGroupY = startingY;

        const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin('anonymous');

        const materials = industryData.map(data => {
            const texture = textureLoader.load(data.image);
            texture.colorSpace = THREE.SRGBColorSpace;

            // Critical UV normalization for ShapeGeometry
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1 / posterSize.w, 1 / posterSize.h);

            texture.generateMipmaps = true;

            return new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
                map: texture,
                side: THREE.FrontSide,
                roughness: 0.3,
                metalness: 0.1
            });
        });

        // Generate Grid
        let x = 0;
        let y = 0;
        let rowGroup: THREE.Group | null = null;
        let materialIndex = 0;

        for (let i = 0; i < posterSize.cols * posterSize.rows; i++) {
            if (i % posterSize.cols === 0) {
                y += posterSize.h + posterSize.padding;
                x = 0;
                rowGroup = new THREE.Group();
                rowGroup.position.y = y;
                assetGroup.add(rowGroup);
                posterCollection.push(rowGroup);
            } else {
                x += posterSize.w + posterSize.padding;
            }

            const material = materials[materialIndex % materials.length];
            materialIndex++;
            // Soft random scatter mapping to keep grid organic
            if (Math.random() > 0.5) materialIndex += Math.floor(Math.random() * 3);

            const poster = new THREE.Mesh(posterGeometry, material);
            poster.position.x = x;
            if (rowGroup) rowGroup.add(poster);
        }

        const animate = () => {
            if (!scrollStatus.current && !disableAnimate.current) {
                scrollPosters(0.08); // slow panning speed
            }

            assetGroup.position.y = assetGroupY;
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        const scrollPosters = (moveY = 0.1) => {
            if (assetGroup.position.y >= 0) {
                loopPosters();
                assetGroupY = startingY;
            } else {
                assetGroupY += moveY;
            }
        };

        const loopPosters = () => {
            if (posterCollection.length) {
                const lastY = (posterSize.h * posterCollection.length) + (posterSize.padding * (posterCollection.length - 1));
                for (let i = 0; i < posterCollection.length; i++) {
                    const row = posterCollection[i];
                    if (row.position.y >= lastY) {
                        row.position.y = -startingY;
                    } else {
                        row.position.y += -startingY;
                    }
                }
            }
        };

        let animationFrameId = requestAnimationFrame(animate);

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > 5) {
                scrollStatus.current = true;
                scrollPosters(Math.abs(e.deltaY) * 0.02);
                setTimeout(() => {
                    scrollStatus.current = false;
                }, 100);
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: true });

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('wheel', handleWheel);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <section className="industries-section" id="industries">
            {/* Blend mask top gradient hooking directly into the previous component */}
            <div className="industries-top-mask"></div>

            <div className="industries-canvas-wrap" ref={mountRef}></div>

            {/* DAREX BRAND LOGO OVERLAY */}
            <div className="industries-logo" ref={textRef}>
                <h1 className="industries-title">DAREX AI.</h1>
                <span className="industries-subtitle">Cross-Industry Dominance</span>
            </div>

            <div className="industries-overlay scroll-blur"></div>
        </section>
    );
}
