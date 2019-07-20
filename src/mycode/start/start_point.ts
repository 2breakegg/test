import {scene, camera, animateFunctions} from "../mylib/init";
import * as THREE from "three";
import Stats from "../jsm/libs/stats.module";

let stats: any = new Stats();

document.body.appendChild( stats.dom );

function aminate() {
    stats.update();
    // cube.position.y -= 0.01;
}

animateFunctions.add(aminate);
