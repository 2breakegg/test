import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

let radius = 10;
let radials = 16;
let circles = 8;
let divisions = 64;

let helper = new THREE.PolarGridHelper( radius, radials, circles, divisions, undefined, undefined);
scene.add( helper );
