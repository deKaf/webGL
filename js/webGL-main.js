// Globals

var canvas;
var gl;

var newBuffer;
var mvMatrix;
var shader;
var vertexPositionAttribute;
var perspectiveMatrix;



// ---------------------------- Buffer ----------------------------//

function initBuffers() {
  newBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, newBuffer);

  var square = [ 1.0,  1.0,  0.0,
    -1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
    -1.0, -1.0, 0.0 ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(square), gl.STATIC_DRAW);
}



// ---------------------------- Shaders --------------------------//

function initShaders() {
  
  var psMain = getShader( gl, 'pixelShader' );
  var vsMain = getShader( gl, 'vertexShader');

  shader = gl.createProgram();

  gl.attachShader( shader, vsMain );
  gl.attachShader( shader, psMain );

  gl.linkProgram (shader);

  if (!gl.getProgramParameter (shader, gl.LINK_STATUS)){
    console.log('Unable to initialize shader' + gl.getProgramInfoLog(shader));
  }

  gl.useProgram(shader);

  vtxPosAttribute = gl.getAttribLocation( shader, 'aVertexPosition');
  gl.enableVertexAttribArray (vertexPositionAttribute);

}

function getShader( gl, id ){

  var shaderScript = document.getElementById(id);
  if (!shaderScript) { 
    return null ;
  }

  
  var source = "";

  currentChild = shaderScript.firstChild;
  while ( currentChild ) {
    if (currentChild.nodeType == 3) {
      source += currentChild.textContent;
    }
    currentChild = currentChild.nextSibling;
  }
  

  var shader;

  if ( shaderScript.type == 'pixelShader' ) {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if ( shaderScript.type == 'vertexShader' ) {
    shader = gl.createShader(gl.VERTEX_SHADER);
    } 
  else { 
    return null;
    }

  gl.shaderSource ( shader, source );
  gl.compileShader ( shader );

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert ( "Error compiling shaders: " + gl.getShaderInfoLog(shader) );
      gl.deleteShader( shader );
      return null;
    }
    
    return shader;
  }
   


//------------------------------- Create Viewport -----------------------------//


function start() {
  canvas = document.getElementById("glcanvas");

  initWebGL(canvas);      // Initialize the GL context

  // Only continue if WebGL is available and working

  if (gl) {
    gl.viewport (0,0, canvas.width, canvas.height);
    
    gl.clearColor(0.2, 0.5, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);          
    gl.depthFunc(gl.LEQUAL);            

    initShaders();
    initBuffers();

  }
}

function initWebGL() {
  gl = null;

  try {
    gl = canvas.getContext("experimental-webgl");
  }
  catch(e) {
  }

  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }
}

function drawScene() {
  
  RES = document.getElementById( "glcanvas" );
  var FOV = 45;
  var CAMERA_NEAR = 0.1;
  var CAMERA_FAR = 100.0;
  
  gl.clear ( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //clear buffer
  pMatrix = makePerspective(FOV, (640.0/480.0), CAMERA_NEAR, CAMERA_FAR);
  

  loadIdentity();
  mvTranslate([-0.0, 0.0, -6.0]);

  gl.bindBuffer( gl.ARRAY_BUFFER, newBuffer );
  gl.vertexAttribPointer( vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0 );
  setMatrixUniforms();

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}

// ------------------- Utility Functions ------------------- //

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shader, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(pMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shader, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}