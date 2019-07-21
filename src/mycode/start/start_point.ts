import {log, scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";

function createPointByGeometry() {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(1, 1, 1));
    geometry.vertices.push(new THREE.Vector3(5, 3, 1));
    let material = new THREE.PointsMaterial({ color: 0x888888});
    let points = new THREE.Points(geometry, material);
    scene.add(points);

    log(geometry);
}
function createPointByBufferGeometry() {
    camera.position.z = 10;
    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute( "position", new THREE.Float32BufferAttribute( [
        0, 0, 0,
        1, 1, 0,
        2, 2, 0,
        3, 3, 0,
        4, 4, 0,
        5, 5, 0,
    ], 3 ) );
    // geometry.addAttribute( "color", new THREE.Float32BufferAttribute( [0.9, 0.1, 0.1], 3 ) );
    let material = new THREE.PointsMaterial({  size: 1.4142, color: 0x888888});
    let points = new THREE.Points(geometry, material);
    scene.add(points);
}
function webgl_buffergeometry_points() {
    camera.position.z = 20;

    let particles = 5;

    let geometry = new THREE.BufferGeometry();

    let positions = [];
    let colors = [];

    let color = new THREE.Color();

    // tslint:disable-next-line: one-variable-per-declaration
    let n = 10, n2 = n / 2; // particles spread in the cube

    for ( let i = 0; i < particles; i ++ ) {

    // positions

    let x = Math.random() * n - n2;
    let y = Math.random() * n - n2;
    let z = Math.random() * n - n2;

    positions.push( x, y, z );

    // colors

    let vx = ( x / n ) + 0.5;
    let vy = ( y / n ) + 0.5;
    let vz = ( z / n ) + 0.5;

    color.setRGB( vx, vy, vz );

    colors.push( color.r, color.g, color.b );

    }

    geometry.addAttribute( "position", new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( "color", new THREE.Float32BufferAttribute( colors, 3 ) );

    geometry.computeBoundingSphere();

    //

    let material = new THREE.PointsMaterial( { size: 1, vertexColors: THREE.VertexColors } );

    let points = new THREE.Points( geometry, material );
    scene.add( points );

    let aminate = () => {
        scene.children[0].rotation.x += 0.01;
        scene.children[0].rotation.y += 0.01;
    };
    animateFunctions.add(aminate);
}
// createPointByGeometry();
createPointByBufferGeometry();
// webgl_buffergeometry_points();
