import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls.js";

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
let controls = new OrbitControls( camera, renderer.domElement );
{   // 创建箭头 ArrowHelper
    // tslint:disable-next-line: one-variable-per-declaration tslint:disable-next-line: no-var-keyword
    var arrowHelperx: THREE.ArrowHelper, arrowHelpery: THREE.ArrowHelper, arrowHelperz: THREE.ArrowHelper;
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

    arrowHelperx = new THREE.ArrowHelper( dirx, origin, length, 0xff0000 );
    arrowHelpery = new THREE.ArrowHelper( diry, origin, length, 0x00ff00 );
    arrowHelperz = new THREE.ArrowHelper( dirz, origin, length, 0x0000ff );
    scene.add( arrowHelperx, arrowHelpery, arrowHelperz );
}

declare global {
    interface Window { arrowHelpers: any; }
}
window.arrowHelpers =  [arrowHelperx, arrowHelpery, arrowHelperz];
