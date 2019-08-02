import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

let plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
let helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
scene.add( helper );
