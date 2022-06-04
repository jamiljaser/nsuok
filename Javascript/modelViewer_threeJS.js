// Declaratons
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const GLTFLoader = new GLTFLoader();

canvas = renderer.domElement;

const width = document.querySelector('#modelCanvas').offsetWidth;

const height = document.querySelector('#modelListNavDiv').offsetHeight;
const camera = new THREE.PerspectiveCamera(22, width / height, 1, 1000);
const container = document.getElementById('modelCanvas');

renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Draw 3d geometry
const geometry = new THREE.SphereGeometry(3, 3, 12);
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(wireframe);
line.material.depthTest = false;
line.material.opacity = 1;
line.material.transparent = true;
scene.add(line);
camera.position.z = 50;

// Animate 3d Geometry
function animate() {
    requestAnimationFrame(animate);
    line.rotation.x += 0.01;
    line.rotation.y -= 0.01;
    renderer.render(scene, camera)
}

animate();

onWindowResize();

//Resize canvas with window 
window.addEventListener('resize', onWindowResize, false);
renderer.setSize( window.innerWidth - window.innerWidth/12.6, canvas.clientHeight);
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth - window.innerWidth/12.6, canvas.clientHeight);
}

// function consolePrinter() {
//     console.log(clientWidth);
// }

// consolePrinter();