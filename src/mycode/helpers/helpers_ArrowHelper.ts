import {log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
// import Window2 from "./global";

let dirx = new THREE.Vector3( 1, 0, 0 );
let diry = new THREE.Vector3( 0, 1, 0 );
let dirz = new THREE.Vector3( 0, 0, 1 );

// normalize the direction vector (convert to vector of length 1)
dirx.normalize();
diry.normalize();
dirz.normalize();

let origin = new THREE.Vector3( 0, 0, 0 );
let length = 1;
let hex = 0xffff00;

let arrowHelperx = new THREE.ArrowHelper( dirx, origin, length, 0xff0000 );
let arrowHelpery = new THREE.ArrowHelper( diry, origin, length, 0x00ff00 );
let arrowHelperz = new THREE.ArrowHelper( dirz, origin, length, 0x0000ff );
scene.add( arrowHelperx, arrowHelpery, arrowHelperz );

// console.warn();
// tslint:disable-next-line: no-string-literal
// window = new Window2();
declare global {
    interface Window { camera: any; }
}
window.camera =  camera;
// export module ThePublicModule {
//     export let publicInfo: string = "666";
// }
