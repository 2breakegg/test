import * as THREE from "three";
import { GUI } from "../jsm/libs/dat.gui.module";
import { OrbitControls } from "../jsm/controls/OrbitControls";
import { TetrahedronGeometry } from "../../build/three";
import log from "../mylib/log";

let mesh: THREE.Mesh;
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

let gui;

let API = {
    centerX: 0.5,
    centerY: 0.5,
    offsetX: 0,
    offsetY: 0,
    repeatX: 0.25,
    repeatY: 0.25,
    rotation: Math.PI / 4, // positive is counter-clockwise
    // @@tslint:disable-next-line: object-literal-sort-keys
};

init();

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 10, 15, 25 );
    scene.add( camera );

    let controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( "change", render );
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    let geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );

    new THREE.TextureLoader().load( "/asset/textures/UV_Grid_Sm.jpg", ( texture ) => {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // texture.matrixAutoUpdate = false; // default true; set to false to update texture.matrix manually

        let material = new THREE.MeshBasicMaterial( { map: texture } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        updateUvTransform();

        // initGui();

        render();

    } );

    window.addEventListener( "resize", onWindowResize, false );

}

function render() {

    renderer.render( scene, camera );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function updateUvTransform() {
    let material = mesh.material as THREE.MeshBasicMaterial;
    let texture = material.map;
    if ( texture.matrixAutoUpdate === true ) {
        texture.offset.set( API.offsetX, API.offsetY );
        texture.repeat.set( API.repeatX, API.repeatY );
        texture.center.set( API.centerX, API.centerY );
        texture.rotation = API.rotation; // rotation is around [ 0.5, 0.5 ]

    } else {

        // one way...
        // texture.matrix.setUvTransform( API.offsetX, API.offsetY, API.repeatX, API.repeatY, API.rotation, API.centerX, API.centerY );
        if (texture.matrix instanceof THREE.Matrix3) {
            log("THREE.Matrix3");
        } else if (texture.matrix instanceof THREE.Matrix4) {
            log("THREE.Matrix4");
        } else {
            log("类型 未知");
        }
        // another way...
        texture.matrix
            .identity()
            .translate( - API.centerX, - API.centerY )
            .rotate( API.rotation )					// I don't understand how rotation can preceed scale, but it seems to be required...
            .scale( API.repeatX, API.repeatY )
            .translate( API.centerX, API.centerY )
            .translate( API.offsetX, API.offsetY );

    }

    render();

}

// function initGui() {

//     gui = new GUI();

//     gui.add( API, 'offsetX', 0.0, 1.0 ).name( 'offset.x' ).onChange( updateUvTransform );
//     gui.add( API, 'offsetY', 0.0, 1.0 ).name( 'offset.y' ).onChange( updateUvTransform );
//     gui.add( API, 'repeatX', 0.25, 2.0 ).name( 'repeat.x' ).onChange( updateUvTransform );
//     gui.add( API, 'repeatY', 0.25, 2.0 ).name( 'repeat.y' ).onChange( updateUvTransform );
//     gui.add( API, 'rotation', - 2.0, 2.0 ).name( 'rotation' ).onChange( updateUvTransform );
//     gui.add( API, 'centerX', 0.0, 1.0 ).name( 'center.x' ).onChange( updateUvTransform );
//     gui.add( API, 'centerY', 0.0, 1.0 ).name( 'center.y' ).onChange( updateUvTransform );

// }
