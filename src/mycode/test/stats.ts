import * as THREE from "three";
import Stats from "../jsm/libs/stats.module";

let scene = new THREE.Scene(); // 创建场景
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000); // 创建相机 (参数分别是   FOV:可视角度,  aspect ratio:宽高比,  near:近剪切面,  far:远剪切面)
let renderer =  new THREE.WebGLRenderer(); // 创建渲染器
let stats: any = new Stats(); // 显示帧数

renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器的宽高
document.body.appendChild(renderer.domElement); // 将渲染器的dom添加进body中
renderer.render(scene, camera); // 将场景和相机交给渲染器进行渲染
document.body.appendChild( stats.dom );

camera.position.z = 10;
renderer.render(scene, camera);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update(); // 刷新帧数
}