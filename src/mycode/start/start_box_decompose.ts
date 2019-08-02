import {scene, camera, renderer, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

let box = new THREE.Group();
scene.add(box);
let faceBottom = createFace([
    new THREE.Vector3( -1, 0, 1),
    new THREE.Vector3( -1, 0, -1),
    new THREE.Vector3( 1, 0, -1),
    new THREE.Vector3( 1, 0, 1),
]);
box.add(faceBottom);

let faceLeft = createFace([
    new THREE.Vector3( 0, 0, 1),
    new THREE.Vector3( 0, 0, -1),
    new THREE.Vector3( 0, 2, -1),
    new THREE.Vector3( 0, 2, 1),
]);
faceLeft.position.x = -1;
faceBottom.add(faceLeft);

let faceRight = createFace([
    new THREE.Vector3( 0, 0, 1),
    new THREE.Vector3( 0, 0, -1),
    new THREE.Vector3( 0, 2, -1),
    new THREE.Vector3( 0, 2, 1),
]);
faceRight.position.x = 1;
faceBottom.add(faceRight);

let faceNear = createFace([
    new THREE.Vector3( 1, 0, 0),
    new THREE.Vector3( -1, 0, 0),
    new THREE.Vector3( -1, 2, 0),
    new THREE.Vector3( 1, 2, 0),
]);
faceNear.position.z = 1;
faceBottom.add(faceNear);

let faceFar = createFace([
    new THREE.Vector3( 1, 0, 0),
    new THREE.Vector3( -1, 0, 0),
    new THREE.Vector3( -1, 2, 0),
    new THREE.Vector3( 1, 2, 0),
]);
faceFar.position.z = -1;
faceBottom.add(faceFar);

let faceTop = createFace([
    new THREE.Vector3( -1, 0, 2),
    new THREE.Vector3( -1, 0, 0),
    new THREE.Vector3( 1, 0, 0),
    new THREE.Vector3( 1, 0, 2),
]);
faceTop.position.y = 2;
faceFar.add(faceTop);

function createFace(points: THREE.Vector3[]) {
    // 面
    let geometry = new THREE.Geometry();
    geometry.vertices.push( points[0], points[1], points[2], points[3] );
    geometry.faces.push( new THREE.Face3( 0, 1, 2), new THREE.Face3( 2, 3, 0));
    let material = new THREE.MeshBasicMaterial( { color : 0xff0000 } );
    material.side =  THREE.DoubleSide;
    let face = new THREE.Mesh( geometry, material );

    // 线框
    let geometry2 = new THREE.WireframeGeometry(geometry);
    let material2 = new THREE.LineBasicMaterial({color: 0xffff00});
    let line = new THREE.LineSegments( geometry2, material2 );

    let group = new THREE.Group();
    group.add(face, line);
    return group;
    // return new THREE.Mesh( geometry, material );
}

let isResolve = true;

function aminate() {
    if ( isResolve ) {
        faceLeft.rotation.z -= -0.01;
        faceRight.rotation.z -= 0.01;
        faceNear.rotation.x -= -0.01;
        faceFar.rotation.x -= 0.01;
        faceTop.rotation.x -= 0.01;

        if (faceLeft.rotation.z >= Math.PI * 0.5) {
            isResolve = !isResolve;
        }
    } else {
        faceLeft.rotation.z += -0.01;
        faceRight.rotation.z += 0.01;
        faceNear.rotation.x += -0.01;
        faceFar.rotation.x += 0.01;
        faceTop.rotation.x += 0.01;

        if (faceLeft.rotation.z <= 0) {
            isResolve = !isResolve;
        }
    }
}

animateFunctions.add(aminate);
