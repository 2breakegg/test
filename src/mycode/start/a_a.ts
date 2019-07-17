import {THREE,scene,camera,renderer, animateFunctions} from "../mylib/init";

let geometry = new THREE.BoxGeometry(1,1,1);
let material = new THREE.MeshBasicMaterial({color:0xff0000});
let cube = new THREE.Mesh(geometry,material);
scene.add(cube);

function cubeRotate(speed:number){
    cube.rotation.x+=speed;
    cube.rotation.y+=speed;
    // cube.rotation.z+=0.01;
}

function cubeRotateAnimate(){
    cubeRotate(0.013)
}

console.log(22);

let cubeRotateAnimateKey = animateFunctions.add(cubeRotateAnimate);
setTimeout(()=>{animateFunctions.del(cubeRotateAnimateKey)},1000)