// import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";
import { PerspectiveCamera } from "three";

let scene = new THREE.Scene(); // 创建场景
let camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight / 2, 0.1, 2000); // 创建相机 (参数分别是   FOV:可视角度,  aspect ratio:宽高比,  near:近剪切面,  far:远剪切面)
let renderer =  new THREE.WebGLRenderer(); // 创建渲染器
renderer.autoClear = false; // 取消自动清屏
renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器的宽高
document.body.appendChild(renderer.domElement); // 将渲染器的dom添加进body中
let control = new OrbitControls(camera, renderer.domElement);
camera.position.x = 15;


let near = 0.1;
let far = 100;
let camera2 = new PerspectiveCamera(60, window.innerWidth / window.innerHeight / 2, near, far );
let helper = new THREE.CameraHelper( camera2 );
scene.add( helper );
let cube: THREE.Mesh;

{ // 放俩辅助对象 查看坐标方向
    let axesNear = new THREE.AxesHelper(10);
    let axesFar = new THREE.AxesHelper(10);
    axesNear.position.z = -near;
    axesFar.position.z = -far;
    scene.add(axesFar, axesNear);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({color: 0xff0000});
    cube = new THREE.Mesh(geometry, material);
    cube.position.z = -10;
    scene.add(cube);
}

// 设置相机的显示位置和尺寸
camera.viewport = new THREE.Vector4( 0, 0, window.innerWidth / 2, window.innerHeight);
camera2.viewport = new THREE.Vector4( window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);


function animate() {
    requestAnimationFrame(animate);
    cube.rotateX(0.01);
    camera.updateProjectionMatrix();
    camera2.updateProjectionMatrix();

    renderer.clear();

    renderer.setViewport( 0, 0, window.innerWidth / 2, window.innerHeight );
    renderer.render(scene, camera);
    renderer.setViewport( window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight );
    renderer.render(scene, camera2);
}
animate();
declare global {
    interface Window {
        scene: any;
        camera: any;
        renderer: any;
    }
}

window.scene =  scene;
window.camera =  camera;
window.renderer =  renderer;
