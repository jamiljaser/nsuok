import * as THREE from 'https://cdn.skypack.dev/three@0.121.1/build/three.module.js'
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.121.1/examples/jsm/loaders/RGBELoader.js';
import {DRACOLoader} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js'


// INITIALIZE

// Scene
const canvas = document.querySelector('.modelCanvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
const domElement = document.domElement;
const loader = new GLTFLoader();


// Draco Loader
const dracoPath = 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/js/libs/draco/';
const myDracoLoader = new DRACOLoader();
myDracoLoader.setDecoderPath(dracoPath);
loader.setDRACOLoader(myDracoLoader)

    
// Declarations For Screen Resizing
const sizes = {
    width: window.innerWidth * 0.85,
    height: window.innerHeight * 0.8,
}

// modelCanvas Buttons Div declarations
const modelBttn = document.getElementsByClassName("viewModel bttn");
const scanBttn = document.getElementsByClassName("viewScan bttn");

// Array Builder----------------------------
const modelFolder = "../GLTF/";
console.log(modelFolder);

// ----------------------------------------------------

// HDRIs
const hdrUrl = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/abandoned_greenhouse_1k.hdr'
const hdrUrl2 = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/spruit_sunrise_1k.hdr'
// ----------------------------------------------------------------------------------------

// HDRI Loader
new RGBELoader().load(hdrUrl2, texture => {
    const gen = new THREE.PMREMGenerator(renderer)
    const envMap = gen.fromEquirectangular(texture).texture    
    // Interacts HDRI light with geometry
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envMap
    scene.background = envMap
    texture.dispose()
    gen.dispose()
  })

// GLTF Loader
loader.load(' ../GLTF/brainScene.glb', function(gltf){
// loader.load(' ../GLTF/ornateDisplayBox/ornateDisplayBox.gltf', function(gltf){
        // console.log(gltf)
        const root = gltf.scene;
        root.scale.set(1,1 ,1)
        let mesh = gltf.scene.children[0];
        
        // fixes shadow artifacts
        mesh.traverse(n => {
            if(n.isMesh){
                n.castShadow = true;
                n.receiveShadow = true;
            }
            if(n.material.map) n.material.map.anisotropy = 16;
        });

        scene.add(root);
    }, function(xhr){
        console.log(xhr.loaded/xhr.total * 100) + "% loaded"
}, function(error){
    console.log("an error has occured")
} )
// ------------------------------------------------------------------

// LIGHTS declarations

// Hemisphere Light
// const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 8);
// scene.add(hemiLight);

// overhead spot light
const lightOverhead = new THREE.SpotLight(0xffff11, 7)
lightOverhead.position.set(0,1,0)
lightOverhead.castShadow = true;
lightOverhead.shadow.bias = -0.0001;
lightOverhead.shadow.mapSize.width = 1024*4;
lightOverhead.shadow.mapSize.height = 1024*4;
// scene.add(lightOverhead)

// ----------------------------------------------------------------


// GEOMETRY declarations
// const plane = new THREE.PlaneGeometry(100,100);
//     // greenMaterial
const materialGreen = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});

    // purpleMaterial
// const materialPurple = new THREE.MeshBasicMaterial({
    // color: 0xff00ff, side: THREE.Doubleside
// });
    // groundPlane
// const groundPlane = new THREE.Mesh(plane, materialPurple)
// scene.add(groundPlane)
// groundPlane.rotateX(-33)
// groundPlane.position.set(0,-1.25,0)
// -------------------------------------------------------------------------

// Camera and renderer declarations
const camera = new THREE.PerspectiveCamera(18, sizes.width / sizes.height, 0.01, 10000)
camera.position.set(-15, 0.5, 8)
scene.add(camera)
camera.lookAt(0, 0.5, 0)


const renderer = new THREE.WebGL1Renderer ({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.5;
WebGLRenderbuffer.gammaOutput = true;
// -----------------------------------------------------------
// declaring orbit controler in scene
// has to come after the renderer
const controls = new OrbitControls(camera, renderer.domElement);
// FUNCTION DECLARATIONS____________________________________

// Window Resizer
window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){   
    let width = window.innerWidth*0.88;
    let height = window.innerHeight*.8;
    console.log(width+" = width, "+height+ " = height")
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height);
}

// ----------------------------------------------------------


// dispose of geometry function
function disposeOfGeometry(){    
    scene.children.splice(scene.children[2]);
}

// Switch to the building associated with the button clicked
function switchBuilding(){
    // disposeOfGeometry();
    console.log("switchBuilding Function Activated");
    readDir();
}

function arrayMaker(){
    const modelArray = [];
    modelArray[0] = ""; 

}

function readDir(){
    // var fs = require('fs');
    var fileAddress = "../GLTF/BaconeHouse/"
    console.log(files);
    
}

// buttonMaker
function buttonMkr(filename){
// put this in a for statement
    let bttn = document.createElement("button");
    document.getElementById("bttnContainer").appendChild(bttn);
    bttn.setAttribute("class", "modelListBttn");
    bttn.setAttribute("id", filename)
    // bttn.setAttribute("id", name this by concatination of the array item's file name minus the file format suffix)
    bttn.addEventListener("click", switchBuilding, false);
    // console.log(scene.children)
// end the for statement here
}

// animate function
function animate(){
    //Rotate the scene -- axis(speed)
    scene.rotateY(0.0001);
    // orbital controls update
    controls.update();
    lightOverhead.position.set(
        camera.position.x + 3,
        camera.position.y + 5,
        camera.position.z + 7
    )
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

// FUNCTION CALLS____________________________________
animate();
buttonMkr();
console.log(scene.children);