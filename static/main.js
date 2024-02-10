import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerWidth, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth , window.innerHeight  );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const materials = [
    new THREE.MeshBasicMaterial({color: 0xff0000}), // red    0
    new THREE.MeshBasicMaterial({color: 0xFFA500}), // orange 1
    new THREE.MeshBasicMaterial({color: 0x0000ff}), // blue   2
    new THREE.MeshBasicMaterial({color: 0x00ff00}), // green  3
    new THREE.MeshBasicMaterial({color: 0xffffff}), // white  4
    new THREE.MeshBasicMaterial({color: 0xffff00}), // yellow 5
];

let geometry = new THREE.BoxGeometry( 1, 1, 1 );

const cubes = [];

const spacing = 1;


class Cubie{
    constructor(x, y, z){
        this.mesh = new THREE.Mesh( geometry, materials );
        this.mesh.position.x = x; // -1 => L, 1 => R
        this.mesh.position.y = y; // -1 => D, 1 => U
        this.mesh.position.z = z; // -1 => B, 1 => F
        this.mesh.addEventListener('click', ()=>{
            console.log("Hello world")
        })
        scene.add(this.mesh);
        this.faces = [
            'B', //yellow
            'L', //Orange
            'U', //Blue
            'R', //Red
            'D', //Green
            'F', //White
        ]
    }
}


function enableCameraControl() {
    orbitControl.noRotate = false;
}

function disableCameraControl() {
    orbitControl.noRotate = true;
}


for (let x = -spacing; x <= spacing; x+=spacing) {
    for (let y = -spacing; y <= spacing; y+=spacing){
        for (let z = -spacing; z <= spacing; z+=spacing){
            cubes.push(new Cubie(x, y, z))
        }
    }
}

function cubieX(obj){
    let temp_temp = obj.faces[0]
    obj.faces[0] = obj.faces[2]
    obj.faces[2] = obj.faces[5]
    obj.faces[5] = obj.faces[4]
    obj.faces[4] = temp_temp
}

function cubieY(obj){
    let temp_temp = obj.faces[1]
    obj.faces[1] = obj.faces[5]
    obj.faces[5] = obj.faces[3]
    obj.faces[3] = obj.faces[0]
    obj.faces[0] = temp_temp
}


function cubieZ(obj){
    let temp_temp = obj.faces[2]
    obj.faces[2] = obj.faces[1]
    obj.faces[1] = obj.faces[4]
    obj.faces[4] = obj.faces[3]
    obj.faces[3] = temp_temp
}

// TODO: Creta functionh for ACW rotation too.

var data = [];
var finalData;

function getFaces(){
    // U -> R -> F -> D -> L -> B faces should be fed to the poython kociemba library
    // UP FACE
    var tempGrp = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.y - 1) <= 0.1){
            tempGrp.push(cube);
        }
    });    
    tempGrp.sort(function(a, b){
        if (a.mesh.position.z - b.mesh.position.z < -0.1) {
            // a.z < b.z => [a, b]
            return -1;
        } else if (a.mesh.position.z - b.mesh.position.z > 0.1) {
            return 1;
        } else {
            if (a.mesh.position.x - b.mesh.position.x < -0.1) {
                return -1;
            } else {
                return 1;
            }
        }
    });
    for(let i = 0; i<9; i++){
        data[i] = tempGrp[i].faces[2]
    }



    // RIGHT FACE    
    var tempGrp = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.x - 1) <= 0.1){
            tempGrp.push(cube);
        }
    });    
    tempGrp.sort(function(a, b){
        if (a.mesh.position.y - b.mesh.position.y < -0.1) {
            //a.z > b.z => [a, z]
            return 1;
        } else if (a.mesh.position.y - b.mesh.position.y > 0.1) {
            return -1;
        } else {
            if (a.mesh.position.z - b.mesh.position.z < -0.1) {
                return 1;
            } else {
                return -1;
            }
        }
    });
    for(let i = 0; i<9; i++){
        data[i+9] = tempGrp[i].faces[3]
    }



    // FRONT FACE    
    var tempGrp = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.z - 1) <= 0.1){
            tempGrp.push(cube);
        }
    });    
    tempGrp.sort(function(a, b){
        if (a.mesh.position.y - b.mesh.position.y < -0.1) {
            //a.y > b.y => [a, y]
            return 1;
        } else if (a.mesh.position.y - b.mesh.position.y > 0.1) {
            return -1;
        } else {
            if (a.mesh.position.x - b.mesh.position.x < -0.1) {
                return -1;
            } else {
                return 1;
            }
        }
    });
    for(let i = 0; i<9; i++){
        data[i+18] = tempGrp[i].faces[5]
    }



    // DOWN FACE
    var tempGrp = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.y + 1) <= 0.1){
            tempGrp.push(cube);
        }
    });    
    tempGrp.sort(function(a, b){
        if (a.mesh.position.z - b.mesh.position.z < -0.1) {
            // a.z < b.z => [a, b]
            return 1;
        } else if (a.mesh.position.z - b.mesh.position.z > 0.1) {
            return -1;
        } else {
            if (a.mesh.position.x - b.mesh.position.x < -0.1) {
                return -1;
            } else {
                return 1;
            }
        }
    });
    for(let i = 0; i<9; i++){
        data[i+27] = tempGrp[i].faces[4]
    }



    // LEFT FACE    
    var tempGrp = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.x + 1) <= 0.1){
            tempGrp.push(cube);
        }
    });    
    tempGrp.sort(function(a, b){
        if (a.mesh.position.y - b.mesh.position.y < -0.1) {
            //a.y > b.y => [a, b]
            return 1;
        } else if (a.mesh.position.y - b.mesh.position.y > 0.1) {
            return -1;
        } else {
            if (a.mesh.position.z - b.mesh.position.z < -0.1) {
                return -1;
            } else {
                return 1;
            }
        }
    });
    for(let i = 0; i<9; i++){
        data[i+36] = tempGrp[i].faces[1]
    }



    // FRONT FACE    
    var tempGrp = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.z + 1) <= 0.1){
            tempGrp.push(cube);
        }
    });    
    tempGrp.sort(function(a, b){
        if (a.mesh.position.y - b.mesh.position.y < -0.1) {
            //a.y > b.y => [a, b]
            return 1;
        } else if (a.mesh.position.y - b.mesh.position.y > 0.1) {
            return -1;
        } else {
            if (a.mesh.position.x - b.mesh.position.x < -0.1) {
                return 1;
            } else {
                return -1;
            }
        }
    });
    for(let i = 0; i<9; i++){
        data[i+45] = tempGrp[i].faces[0]
    }

    console.log(data)
    finalData = data.join('')
    console.log(finalData)

}


function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
    pointIsWorld = (pointIsWorld === undefined) ? false : pointIsWorld;

    if (pointIsWorld) {
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(-point.x, -point.y, -point.z);
    matrix.multiply(new THREE.Matrix4().makeRotationAxis(axis.normalize(), theta));
    matrix.multiply(new THREE.Matrix4().makeTranslation(point.x, point.y, point.z));

    obj.applyMatrix4(matrix);

    if (pointIsWorld) {
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }
}

let activeGroup = [];

function L() {
    let point = new THREE.Vector3(1.5, 0, 0);
    let axis = new THREE.Vector3(1, 0, 0);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.x + 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {

        rotateAboutPoint(cube.mesh, point, axis, Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieX(cube);
        cubieX(cube);
        cubieX(cube);

    });
}

function LPrime() {
    let point = new THREE.Vector3(1.5, 0, 0);
    let axis = new THREE.Vector3(1, 0, 0);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.x + 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {

        rotateAboutPoint(cube.mesh, point, axis, -Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieX(cube);

    });
}


function F() {
    let point = new THREE.Vector3(0, 0, 1.5);
    let axis = new THREE.Vector3(0, 0, 1);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.z - 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {

        rotateAboutPoint(cube.mesh, point, axis, -Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieZ(cube);

    });
}

function FPrime(){
    
    let point = new THREE.Vector3(0, 0, 1.5);
    let axis = new THREE.Vector3(0, 0, 1);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.z - 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {

        rotateAboutPoint(cube.mesh, point, axis, Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieZ(cube);
        cubieZ(cube);
        cubieZ(cube);

    });
}



function R() {
    let point = new THREE.Vector3(1.5, 0, 0);
    let axis = new THREE.Vector3(1, 0, 0);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.x - 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {

        rotateAboutPoint(cube.mesh, point, axis, -Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieX(cube);

    });
}

function RPrime(){
    let point = new THREE.Vector3(1.5, 0, 0);
    let axis = new THREE.Vector3(1, 0, 0);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.x - 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {
        
        rotateAboutPoint(cube.mesh, point, axis, Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieX(cube);
        cubieX(cube);
        cubieX(cube);
    });

}



function B() {
    let point = new THREE.Vector3(0, 0, 1.5);
    let axis = new THREE.Vector3(0, 0, 1);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.z + 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {

        rotateAboutPoint(cube.mesh, point, axis, Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieZ(cube)
        cubieZ(cube)
        cubieZ(cube)

    });
}

function BPrime() {
    let point = new THREE.Vector3(0, 0, 1.5);
    let axis = new THREE.Vector3(0, 0, 1);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.z + 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {

        rotateAboutPoint(cube.mesh, point, axis, -Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieZ(cube)

    });
}



function U() {
    let point = new THREE.Vector3(0, 1.5, 0);
    let axis = new THREE.Vector3(0, 1, 0);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.y - 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {
        
        rotateAboutPoint(cube.mesh, point, axis, -Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieY(cube)

    });
}

function UPrime() {
    let point = new THREE.Vector3(0, 1.5, 0);
    let axis = new THREE.Vector3(0, 1, 0);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.y - 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {
        
        rotateAboutPoint(cube.mesh, point, axis, Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieY(cube)
        cubieY(cube)
        cubieY(cube)

    });
}



function D() {
    let point = new THREE.Vector3(0, -1.5, 0);
    let axis = new THREE.Vector3(0, -1, 0);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.y + 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {
        
        rotateAboutPoint(cube.mesh, point, axis, -Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieY(cube)
        cubieY(cube)
        cubieY(cube)

    });
}

function DPrime() {
    let point = new THREE.Vector3(0, -1.5, 0);
    let axis = new THREE.Vector3(0, -1, 0);
    
    activeGroup = [];

    cubes.forEach((cube) => {
        if (Math.abs(cube.mesh.position.y + 1) <= 0.1){
            activeGroup.push(cube);
        }
    });

    activeGroup.forEach((cube) => {

        rotateAboutPoint(cube.mesh, point, axis, Math.PI / 2, false);
        cube.mesh.updateMatrixWorld();
        cubieY(cube)

    });
}


document.body.addEventListener("keydown", (event) => {
    switch(event.key){
        case 'L':
            L();
            break;
        case 'l':
            LPrime();
            break;
        case 'R':
            R();
            break;
        case 'r':
            RPrime();
            break;
        case 'B':
            B();
            break;
        case 'b':
            BPrime();
            break;
        case 'F':
            F();
            break;
        case 'f':
            FPrime();
            break;
        case 'U':
            U();
            break;
        case 'u':
            UPrime();
            break;
        case 'D':
            D();
            break;
        case 'd':
            DPrime();
            break;
    }
});
var sol = []
var moveInd = 0;

function makeMoves(solution){
    sol = solution.split(" ");
    
}

let str = "";

function moveNext(ind){

    if(!sol){
        return;
    }else if(ind >(sol.length) - 1){
        alert("NO NEXT MOVE");
    }else{
        if(sol[ind].length == 1){
            str = sol[ind]
            switch(sol[ind]){
                case 'U':
                    U();
                    break;
                case 'D':
                    D();
                    break;
                case 'F':
                    F();
                    break;
                case 'B':
                    B();
                    break;
                case 'R':
                    R();
                    break;
                case 'L':
                    L();
                    break;
            }
        }else if(sol[ind][1] != '2'){
            switch(sol[ind][0]){
                case 'U':
                    UPrime();
                    break;
                case 'D':
                    DPrime();
                    break;
                case 'F':
                    FPrime();
                    break;
                case 'B':
                    BPrime();
                    break;
                case 'R':
                    RPrime();
                    break;
                case 'L':
                    LPrime();
                    break;
            }
        }else{
            switch(sol[ind][0]){
                case 'U':
                    U();
                    break;
                case 'D':
                    D();
                    break;
                case 'F':
                    F();
                    break;
                case 'B':
                    B();
                    break;
                case 'R':
                    R();
                    break;
                case 'L':
                    L();
                    break;
            }
            switch(sol[ind][0]){
                case 'U':
                    U();
                    break;
                case 'D':
                    D();
                    break;
                case 'F':
                    F();
                    break;
                case 'B':
                    B();
                    break;
                case 'R':
                    R();
                    break;
                case 'L':
                    L();
                    break;
            }

        }
    }
    console.log(str);
}


function movePrev(ind){

    if(!sol){
        return;
    }
    if(ind < 0){
        alert("NO PREVIOUS MOVE");
    }else{
        if(sol[ind].length == 1){
            str = sol[ind]
            switch(sol[ind]){
                case 'U':
                    UPrime();
                    break;
                case 'D':
                    DPrime();
                    break;
                case 'F':
                    FPrime();
                    break;
                case 'B':
                    BPrime();
                    break;
                case 'R':
                    RPrime();
                    break;
                case 'L':
                    LPrime();
                    break;
            }
        }else if(sol[ind][1] != '2'){
            switch(sol[ind][0]){
                case 'U':
                    U();
                    break;
                case 'D':
                    D();
                    break;
                case 'F':
                    F();
                    break;
                case 'B':
                    B();
                    break;
                case 'R':
                    R();
                    break;
                case 'L':
                    L();
                    break;
            }
        }else{
            switch(sol[ind][0]){
                case 'U':
                    U();
                    break;
                case 'D':
                    D();
                    break;
                case 'F':
                    F();
                    break;
                case 'B':
                    B();
                    break;
                case 'R':
                    R();
                    break;
                case 'L':
                    L();
                    break;
            }
            switch(sol[ind][0]){
                case 'U':
                    U();
                    break;
                case 'D':
                    D();
                    break;
                case 'F':
                    F();
                    break;
                case 'B':
                    B();
                    break;
                case 'R':
                    R();
                    break;
                case 'L':
                    L();
                    break;
            }

        }
    }
    console.log(str);

}


const newButton = document.createElement('button');
newButton.textContent = 'SOLVE!';
newButton.addEventListener('click', () => {
    getFaces()
    const s = JSON.stringify(finalData);

    $.ajax({
        url:"http://127.0.0.1:5000/test",
        type:"POST",
        contentType: "application/json",
        data: s,
        success: function(response) {
            const solution = response.solution;
            console.log(solution)
            makeMoves(solution)
        }
    });
});
document.body.appendChild(newButton);


const newButton1 = document.createElement('button');
newButton1.textContent = 'NEXT MOVE!';
newButton1.addEventListener('click', () => {
    moveNext(moveInd)
    moveInd++
});
document.body.appendChild(newButton1);

const newButton2 = document.createElement('button');
newButton2.textContent = 'PREVIOUSS MOVE!';
newButton2.addEventListener('click', () => {
    movePrev(--moveInd)
});
document.body.appendChild(newButton2);


camera.position.set( 0, 0, 5 );
camera.lookAt( 0, 0, 0 );
controls.update();

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

animate();