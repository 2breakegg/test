import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

let near = 10;
let far = 100;

let camera2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, near, far );
let helper = new THREE.CameraHelper( camera2 );
scene.add( helper );

{ // 放俩辅助对象 查看坐标方向
    let axesNear = new THREE.AxesHelper(10);
    let axesFar = new THREE.AxesHelper(10);
    axesNear.position.z = -near;
    axesFar.position.z = -far;
    scene.add(axesFar, axesNear);
}
