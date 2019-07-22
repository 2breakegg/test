import {renderer, log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import {OrbitControls} from "../jsm/controls/OrbitControls";

let control = new OrbitControls(camera, renderer.domElement);

camera.position.z = 20;

{   // 实体 面
    let geometry = new THREE.BoxGeometry( 5, 5, 5, 2, 2, 2 );
    let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    let box = new THREE.Mesh( geometry, material );
    box.position.x = -10;

    let helper = new THREE.FaceNormalsHelper( box, 2, 0x00ff00, 1 );

    scene.add( box );
    scene.add( helper );
}

{   // 线框
    let geometry = new THREE.BoxGeometry( 5, 5, 5, 2, 2, 2 );
    let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xff0000}));
    mesh.position.x = 10;
    let geometry2 = new THREE.WireframeGeometry(geometry);
    let line = new THREE.LineSegments( geometry2 );
    line.material = line.material as THREE.LineBasicMaterial;
    line.material.depthTest = false;
    line.material.opacity = 1;
    line.material.transparent = true;
    line.position.x = 10;

    let helper = new THREE.FaceNormalsHelper( mesh, 2, 0x00ff00, 1 );

    scene.add( line );
    scene.add( helper );
}
