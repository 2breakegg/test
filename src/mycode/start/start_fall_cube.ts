import {THREE, scene, camera, animateFunctions} from "../mylib/init";
import EventFunctions from "../mylib/eventfunctions";

function log(...a: any ) {
    // tslint:disable-next-line: no-console
    console.log(...a);
}

camera.position.z = 25;

function createCube(position: THREE.Vector3): THREE.Mesh {
    let material = new THREE.MeshBasicMaterial({color: 0xff6000});
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);
    return cube;
}

let startPostion: THREE.Vector3[] = [];

function setPosition() {
    for (let x = -9; x <= 9; x += 2) {
        for (let z = 1; z >= -9; z -= 2) {
            startPostion.push(new THREE.Vector3(x, 5, z));
        }
    }
}
setPosition();
// let cube = createCube(new THREE.Vector3());
// scene.add(cube);

function start() {
    log("start");
    this.obj = createCube(startPostion.pop());
    scene.add(this.obj);
    actions.push(this);
}
function next() {
    this.obj.position.y -= 0.1;
}

function estimateIsEnd() {
    return this.obj.position.y < -5;
}

function end() {
    log("end");
    if (startPostion.length) {
        // let action = new Action(start, next, estimateIsEnd, end);
        // action.run();
    }
}

class Action {
    public isStart = false;
    public isEnd = false;
    public start: () => void;
    public next: () => void;
    public estimateIsEnd: () => boolean;
    public end: () => void;
    public obj: THREE.Mesh;
    constructor(
        start: () => void,
        next: () => void,
        estimateIsEnd: () => boolean,
        end: () => void,
    ) {
        this.start = start;
        this.next = next;
        this.estimateIsEnd = estimateIsEnd;
        this.end = end;
    }
    /**
     * run();
     * 如果没有结束,还能继续 返回true
     * 如果已经结束,返回false
     */
    public run(): boolean {
        if (!this.isStart) {
            this.isStart = true;
            this.start();
            return true;
        } else if (!this.estimateIsEnd()) {
            this.next();
            return true;
        } else {
            this.isEnd = true;
            this.end();
            return false;
        }
    }
}

let actions: Action[] = [];

function runAction() {
    let delActList: number[] = [];
    actions.map((action, key) => {
        if (!action.run()) {
            delActList.push(key);
        }
    });
    while (delActList.length > 0) {
        actions.splice(delActList.pop(), 1);
    }
}

function aminateStart() {
    let a = new Action(start, next, estimateIsEnd, end);
    a.run();
    if (startPostion.length) {
        setTimeout(aminateStart, 50);
    }
}
aminateStart();
function aminate() {
    runAction();
    // cube.position.y -= 0.01;
}

animateFunctions.add(aminate);

// tslint:disable-next-line: no-string-literal
// window.actions = actions;

// interface Window {
//     actions: Action[];
// }
// window.actions=actions;