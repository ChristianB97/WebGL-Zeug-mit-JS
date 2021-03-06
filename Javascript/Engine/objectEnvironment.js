import { ShaderGroupPool } from "./glShaderGroupPool.js";


export function ObjectEnvironment()
{
  this.shaderGroupPool = new ShaderGroupPool();
  this.addObject = function(object) {
    var meshRenderer = object.getComponent("MeshRenderer");
    this.shaderGroupPool.registerRenderer(meshRenderer);
  }
  this.draw = drawObjects.bind(this);
}

function drawObjects(gl, camera)
{
  this.shaderGroupPool.loadedShaderGroups.forEach((shaderGroup) =>
  {
    drawObjectsInShaderGroup(gl, shaderGroup, this.drawingMethod, camera);
  });
}

function drawObjectsInShaderGroup(gl, shaderGroup, draw, camera){
  gl.useProgram(shaderGroup.programContainer.program);
  shaderGroup.renderers.forEach((renderer, i) => {
    renderer.meshDraw.draw(gl, shaderGroup.programContainer.program, camera.uniformPool);
  });
}
