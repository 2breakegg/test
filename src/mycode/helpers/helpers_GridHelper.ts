import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

{ // gridHelper 坐标网格
    let size = 10; // 网格总体的大小
    let divisions = 10; // 网格被拆分的次数,也就是说size/divisions就能获得每个小网格的尺寸
    let gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );
}

{ // 放几个方块,测试下距离
    let cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xffffff}),
    );
    let cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xff00ff}),
    );
    let cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xff00ff}),
    );
    cube1.position.set(0, 0, 0);
    cube2.position.set(2, 0, 0);
    cube3.position.set(0, 0, 2);
    scene.add(cube1, cube2, cube3);
}
