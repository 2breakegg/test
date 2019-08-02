import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

let light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
let helper = new THREE.HemisphereLightHelper( light, 5 );
scene.add( helper );
// todo 光 以后再说
