import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

let axes =  new THREE.AxesHelper(3);
scene.add(axes);

let box = new THREE.Box3();
box.setFromCenterAndSize( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 2, 1, 3 ) );
let helper = new THREE.Box3Helper( box, new THREE.Color(0xffff00) );
scene.add( helper );
