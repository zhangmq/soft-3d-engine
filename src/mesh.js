import vec3 from 'gl-vec3';

export default class Mesh {
  constructor(name, vertices, faces) {
    this.name = name;
    this.vertices = vertices;
    this.faces = faces;
    this.position = vec3.create();
    this.rotationAxis = vec3.create();
    this.rotationAngle = 0;
  }
}