
var renderer, scene,camera;
var boxGeo;
var boxMaterial;
//------------------------------- On page load -----------------------------//

function start() {
  drawScene();
  animate();
}

//------------------------------- Create Viewport -----------------------------//

function drawScene() {
  
  var RES = { width: 1280, height: 720 }
  var FOV = 45;
  var CAMERA_NEAR = 0.1;
  var CAMERA_FAR = 1000.0;
  
  camera = new THREE.PerspectiveCamera(FOV, (RES.width/RES.height), CAMERA_NEAR, CAMERA_FAR);
  scene = new THREE.Scene();

  

  
  
  

  var ambientLight = new THREE.AmbientLight(0x404040);

  scene.add( ambientLight );
  scene.add( boxGeo );

  //camera.position.z = 5;


  renderer = new THREE.WebGLRenderer();
  renderer.setSize( RES.width, RES.height);
  document.body.appendChild( renderer.domElement);
}

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

