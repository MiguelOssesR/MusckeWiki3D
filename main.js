import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Configuración de la escena y cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(-1, 6, 5);
camera.lookAt(-2, 2, 0);



// Crear un grupo para contener el modelo y el grid
const group = new THREE.Group();
scene.add(group);

// Añadir un grid a la escena
const gridHelper = new THREE.GridHelper(100, 100);
group.add(gridHelper);


// Configuración de luces
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const backLight = new THREE.DirectionalLight(0xffffff, 10);
backLight.position.set(-5, -10, -7.5);
scene.add(backLight);

// Configuración del renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(2000, 1000); // Ajusta el tamaño interno del canvas
renderer.domElement.style.display = 'block'; // Estilo en línea
renderer.domElement.style.width = '100%'; // Ancho en estilo CSS
renderer.domElement.style.height = '100%'; // Altura en estilo CSS
renderer.setClearColor(0x000000, 0);
document.getElementById('3d-model').appendChild(renderer.domElement);

//const controls = new OrbitControls( camera, renderer.domElement );

// Cargar el modelo GLTF
const loader = new GLTFLoader();
let model;
loader.load('/assets/3D_models/human_body.glb', (gltf) => {
    model = gltf.scene;
    group.add(model);
});

// Animación
function animate() {
    if (group) {
        group.rotation.y -= 0.005; // Rotación del modelo
    }
    renderer.render(scene, camera);
}

// Iniciar bucle de animación
renderer.setAnimationLoop(animate);
