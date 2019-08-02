import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

let listener = new THREE.AudioListener();
camera.add( listener );

let positionalAudio = new THREE.PositionalAudio( listener );
positionalAudio.setDirectionalCone( 180, 230, 0.1 );

let helper = new THREE.PositionalAudioHelper( positionalAudio );
positionalAudio.add( helper );

// todo 声音文件 以后再说
