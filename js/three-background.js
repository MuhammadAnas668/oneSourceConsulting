// =====================================================
// 3D BACKGROUND USING THREE.JS
// =====================================================

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i += 3) {
    // Position in a sphere
    const radius = 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i+2] = radius * Math.cos(phi);
    
    // Colors (purple/blue spectrum)
    colorArray[i] = Math.random() * 0.5 + 0.5; // R
    colorArray[i+1] = Math.random() * 0.3;     // G
    colorArray[i+2] = Math.random() * 0.8 + 0.2; // B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 20;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate based on mouse
    particlesMesh.rotation.y += 0.0005 + mouseX * 0.0005;
    particlesMesh.rotation.x += 0.0002 + mouseY * 0.0002;
    
    renderer.render(scene, camera);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});