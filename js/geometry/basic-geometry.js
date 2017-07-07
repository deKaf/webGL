var boxMaterial = new THREE.MeshLambertMaterial( {color:  0x00ff00 });
var orenNayarMaterial = new THREE.ShaderMaterial();
var lambertianHalfWrap = new THREE.ShaderMaterial();


var boxGeo = new THREE.Mesh( new THREE.BoxBufferGeometry(10,10,10), boxMaterial );
var sphereGeo = new THREE.Mesh( new THREE.SphereBufferGeometry( 5, 50, 50), boxMaterial );