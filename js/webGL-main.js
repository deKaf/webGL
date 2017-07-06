
var renderer, scene,camera;

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
  
  var pointLight1 = new THREE.PointLight(0x404040, 5.0, 100);
  pointLight1.position.set( -20, 10, 0 );
  
  scene.add( ambientLight );
  scene.add( pointLight1 );
  scene.add( boxGeo );


  camera.position.z = 50;


  renderer = new THREE.WebGLRenderer();
  renderer.setSize( RES.width, RES.height);
  document.body.appendChild( renderer.domElement);
}

var animate =function() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

  //boxGeo.rotation.x += 0.03;
  boxGeo.rotation.y += 0.01;
}

