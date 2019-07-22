import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

let sphere = new THREE.SphereGeometry();
let object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( {color: 0xff0000} ) );
let box = new THREE.BoxHelper( object, new THREE.Color(0xffff00) );
scene.add( box, object );
