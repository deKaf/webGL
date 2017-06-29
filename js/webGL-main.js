var canvas;
var gl;

function initShaders() {
  
  var psMain = getShader( gl, './basic/pixelShader' );
  var vsMain = getShader( gl, './basic/vertexShader');

  shaderProgram = gl.createProgram();
  gl.attachShader( shaderProgram, vsMain );
  gl.attachShader( shaderProgram, psMain );

  gl.linkProgram (shaderProgram);

  if (!gl.getProgramParameter (shaderProgram, gl.LINK_STATUS)){
    console.log('Unable to initialize shader' + gl.getProgramInfoLog(shaderProgram));
  }

  gl.useProgram(shaderProgram);

  vtxPosAttribute = gl.getAttribLocation( shaderProgram, 'aVertexPosition');
  gl.enableVertexAttribArray (vertexPositionAttribute);

}

function getShader( gl, id, type ){

  var shaderScript, source, currentChild, shader;

  shaderScript = document.getElementById(id);
  if (!shaderScript) { return null ; }

 theSource = shaderScript.text;
 
}
function start() {
  canvas = document.getElementById("glcanvas");

  initWebGL(canvas);      // Initialize the GL context

  // Only continue if WebGL is available and working

  if (gl) {
    gl.viewport (0,0, canvas.width, canvas.height);
    
    gl.clearColor(0.2, 0.5, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
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