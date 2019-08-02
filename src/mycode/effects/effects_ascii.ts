import * as THREE from "three";
import { AsciiEffect } from "../jsm/effects/AsciiEffect.js";
import { TrackballControls } from "../jsm/controls/TrackballControls.js";

// 这个是example的代码, 用的是将3D贴到canvas2D上,通过像素点亮度来定使用的字符,然后将字符扔进table中,最后贴到网页上.
// 挺失望的,本来还以为是用什么后处理,shader做的...
let camera: THREE.PerspectiveCamera;
let controls: TrackballControls;
let scene: THREE.Scene;
let renderer: THREE.Renderer;
let effect: AsciiEffect;

let sphere: THREE.Mesh;
let plane: THREE.Mesh;

let start = Date.now();

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 150;
    camera.position.z = 500;

    scene = new THREE.Scene();

    let light = new THREE.PointLight( 0xffffff );
    light.position.set( 500, 500, 500 );
    scene.add( light );

    let light2 = new THREE.PointLight( 0xffffff, 0.25 );
    light2.position.set( - 500, - 500, - 500 );
    scene.add( light2 );

    sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 200, 20, 10 ), new THREE.MeshPhongMaterial( { flatShading: true } ) );
    scene.add( sphere );

    // Plane

    plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 400, 400 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
    plane.position.y = - 200;
    plane.rotation.x = - Math.PI / 2;
    scene.add( plane );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    effect = new AsciiEffect( renderer, " .:-+*=%@#", { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = "white";
    effect.domElement.style.backgroundColor = "black";

    // Special case: append effect.domElement, instead of renderer.domElement.
    // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

    document.body.appendChild( effect.domElement );

    controls = new TrackballControls( camera, effect.domElement );

    //

    window.addEventListener( "resize", onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    effect.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    let timer = Date.now() - start;

    sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150;
    sphere.rotation.x = timer * 0.0003;
    sphere.rotation.z = timer * 0.0002;

    controls.update();

    effect.render( scene, camera );

}
