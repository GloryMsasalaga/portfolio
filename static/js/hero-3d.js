// 3D Hero Section Animation
class Hero3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createParticles();
        this.createLights();
        this.bindEvents();
        this.animate();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
    }

    createRenderer() {
        const canvas = document.getElementById('hero-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            // Positions
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;

            // Colors
            const color = new THREE.Color();
            color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0x6366f1, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // Point light
        const pointLight = new THREE.PointLight(0x8b5cf6, 0.8, 10);
        pointLight.position.set(-5, 3, 2);
        this.scene.add(pointLight);
    }

    bindEvents() {
        window.addEventListener('resize', () => this.onWindowResize());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouseX = (event.clientX - this.windowHalfX) * 0.001;
        this.mouseY = (event.clientY - this.windowHalfY) * 0.001;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
        }

        // Mouse interaction
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }
}

// Profile 3D Animation
class Profile3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cube = null;
        this.sphere = null;
        
        this.init();
    }

    init() {
        const canvas = document.getElementById('profile-canvas');
        if (!canvas) return;

        this.createScene();
        this.createCamera();
        this.createRenderer(canvas);
        this.createObjects();
        this.createLights();
        this.animate();
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            1, // Will be updated in createRenderer
            0.1,
            1000
        );
        this.camera.position.z = 5;
    }

    createRenderer(canvas) {
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        
        const container = canvas.parentElement;
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    createObjects() {
        // Create animated geometric shapes
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.7
        });
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cube.position.x = -1.5;
        this.scene.add(this.cube);

        const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.7
        });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position.x = 1.5;
        this.scene.add(this.sphere);

        // Add wireframe objects
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            wireframe: true
        });
        
        const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
        const torus = new THREE.Mesh(torusGeometry, wireframeMaterial);
        torus.position.y = 1.5;
        this.scene.add(torus);
        this.torus = torus;
    }

    createLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Animate objects
        if (this.cube) {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
        }

        if (this.sphere) {
            this.sphere.rotation.x += 0.005;
            this.sphere.rotation.z += 0.01;
        }

        if (this.torus) {
            this.torus.rotation.x += 0.02;
            this.torus.rotation.y += 0.03;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize 3D animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the home page
    if (document.getElementById('hero-canvas')) {
        new Hero3D();
    }
    
    if (document.getElementById('profile-canvas')) {
        new Profile3D();
    }
});

// Handle theme changes for 3D scenes
window.addEventListener('themeChange', (e) => {
    const isDark = e.detail.theme === 'dark';
    
    // Update scene backgrounds and colors based on theme
    // This would be implemented based on the specific 3D objects in use
});
