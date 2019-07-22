import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

let geometry = new THREE.BoxGeometry( 10, 10, 10, 2, 2, 2 );
let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
let box = new THREE.Mesh( geometry, material );

let helper = new THREE.VertexNormalsHelper( box, 2, 0x00ff00, 1 );

scene.add( box );
scene.add( helper );
