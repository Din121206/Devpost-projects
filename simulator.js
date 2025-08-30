// Quantum Navigation Simulator
// Using p5.js for 2D UI and Three.js for 3D visualization

// Three.js variables
let scene, camera, renderer, particles, particleSystem;
let width = window.innerWidth;
let height = window.innerHeight;

// Simulation parameters
let qubitCount = 3;
let entanglement = 0.5;
let simulationRunning = false;
let particlesCount = 1000;

// Initialize the simulator
function init() {
    // Set up Three.js scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    document.getElementById('simulator-container').appendChild(renderer.domElement);

    // Create particles
    createParticles();

    // Add event listeners
    setupEventListeners();

    // Start animation loop
    animate();
}

// Create particle system
function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    // Create random particle positions and colors
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Position
        positions[i3] = (Math.random() - 0.5) * 50;
        positions[i3 + 1] = (Math.random() - 0.5) * 50;
        positions[i3 + 2] = (Math.random() - 0.5) * 50;
        
        // Color (quantum blue/purple)
        colors[i3] = 0.4 + Math.random() * 0.3;        // R
        colors[i3 + 1] = 0.6 + Math.random() * 0.4;    // G
        colors[i3 + 2] = 0.8 + Math.random() * 0.2;    // B
        
        // Size
        sizes[i] = 0.5 + Math.random() * 1.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (simulationRunning) {
        // Update particles based on quantum simulation
        const positions = particleSystem.geometry.attributes.position.array;
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            // Create wave-like motion
            positions[i3] += Math.sin(time + i * 0.1) * 0.01 * (1 + entanglement);
            positions[i3 + 1] += Math.cos(time * 0.7 + i * 0.1) * 0.01 * (1 + entanglement);
            positions[i3 + 2] += Math.sin(time * 0.5 + i * 0.1) * 0.01 * (1 + entanglement);
        }
        
        particleSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    // Rotate the entire particle system
    particleSystem.rotation.x += 0.001;
    particleSystem.rotation.y += 0.002;
    
    renderer.render(scene, camera);
}

// Set up event listeners for UI controls
function setupEventListeners() {
    // Qubit count slider
    const qubitSlider = document.getElementById('qubitCount');
    const qubitValue = document.getElementById('qubitValue');
    qubitSlider.addEventListener('input', (e) => {
        qubitCount = parseInt(e.target.value);
        qubitValue.textContent = qubitCount;
    });
    
    // Entanglement slider
    const entanglementSlider = document.getElementById('entanglement');
    const entanglementValue = document.getElementById('entanglementValue');
    entanglementSlider.addEventListener('input', (e) => {
        entanglement = parseFloat(e.target.value);
        entanglementValue.textContent = entanglement.toFixed(1);
    });
    
    // Run simulation button
    document.getElementById('runSimulation').addEventListener('click', () => {
        simulationRunning = !simulationRunning;
        const button = document.getElementById('runSimulation');
        const status = document.getElementById('status');
        
        if (simulationRunning) {
            button.textContent = 'Pause Simulation';
            status.textContent = 'Status: Running quantum simulation...';
            // In a real implementation, we would connect to IBM Quantum here
            // For now, we'll just simulate quantum behavior
            setTimeout(() => {
                status.textContent = 'Status: Simulation complete!';
                simulationRunning = false;
                button.textContent = 'Run Simulation';
            }, 5000);
        } else {
            button.textContent = 'Run Simulation';
            status.textContent = 'Status: Paused';
        }
    });
    
    // Reset button
    document.getElementById('resetSimulation').addEventListener('click', () => {
        simulationRunning = false;
        document.getElementById('runSimulation').textContent = 'Run Simulation';
        document.getElementById('status').textContent = 'Status: Ready';
        createParticles(); // Reset particles
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// Initialize the simulator when the page loads
window.onload = init;
