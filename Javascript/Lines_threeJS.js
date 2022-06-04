const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(22, innerWidth/ innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();
const container = document.getElementById("3dContent")
renderer.setSize( window.innerWidth, window.innerHeight);
document.getElementById("3dContent").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry( 3, 3, 12);
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(wireframe);
line.material.depthTest = false;
line.material.opacity = 1;
line.material.transparent = true;

scene.add(line);
// const material = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
// const material = new THREE.LineDashedMaterial({
//     color: 0xff00ff,
//     linewidth: 1,
//     scale: 1,
//     dashSize: 3,
//     gapSize: 1,

// });
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 50;

function animate(){
    requestAnimationFrame( animate );
    line.rotation.x += 0.01;
    line.rotation.y -= 0.01;
    renderer.render( scene, camera )
}

animate();


