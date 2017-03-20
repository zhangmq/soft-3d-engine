import raf from 'raf';
import vec3 from 'gl-vec3';
import Box from './box';
import { render } from './device';
import Mesh from './mesh';
import monkey from './monkey.json';

//const box1 = new Box('box1', 1);
//const box2 = new Box('box2', 2);

const monkeyMeshes = loadModel(monkey);


//box1.rotationAxis = [1, 1, 0];
//box1.position = [0.5, 0.5, 0.5];
//box2.rotationAxis = [0, 1, 1];
monkeyMeshes[0].rotationAxis = [0, 1, 0];
const loop = () => {
  //box1.rotationAngle += 0.01;
  //box2.rotationAngle -= 0.01;
  monkeyMeshes[0].rotationAngle += 0.01;
  render(monkeyMeshes);
  raf(loop);
};

raf(loop);

function loadModel(model) {
  return model.meshes.map(mesh => {
    const { vertices, indices, uvCount } = mesh;

    const verticesStep = 
      uvCount === 0 ? 6
      : uvCount === 1 ? 8
      : uvCount === 2 ? 10 : 1;

    console.log(verticesStep);
    
    const meshVertices = [];
    for (var i = 0; i < vertices.length / verticesStep; i ++) {
      meshVertices.push(
        vec3.copy(vec3.create(), [
          vertices[i * verticesStep],
          vertices[i * verticesStep + 1],
          vertices[i * verticesStep + 2]
        ])
      );
    }

    const faces = [];
    for (var i = 0; i < indices.length / 3; i ++) {
      faces.push(
        [
          indices[i * 3],
          indices[i * 3 + 1],
          indices[i * 3 + 2]
        ]
      );
    }
    console.log(faces.length);
    return new Mesh('monkey', meshVertices, faces);
  });
}