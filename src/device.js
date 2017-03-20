import mat4 from 'gl-mat4';
import vec3 from 'gl-vec3';
import { select } from 'd3';

const svg = select('#surface');

const eye = [0, 0, 10.0];
const center = [0, 0, 0];
const up = [0, 1, 0];
const light = [0, 10, 10];

export function render(meshes) {
  const view = mat4.lookAt(
    mat4.create(),
    eye,
    center,
    up
  );

  const proj = mat4.perspective(
    mat4.create(),
    0.78,
    1,
    -0.01,
    -1
  );

  const g = svg.selectAll('.mesh').data(meshes);
  g.exit().remove();
  g.enter().append('g')
      .attr('class', 'mesh')
    .merge(g)
      .each(renderMesh(view, proj));
}

const renderMesh = (view, proj) => (mesh, i, nodes) => {
  const transform = getTransform(view, proj, mesh);
  const face = select(nodes[i]).selectAll('polygon')
    .data(mesh.faces);

  face.exit().remove();
  face.enter().append('polygon')
      .attr('fill', 'none')
      .attr('stroke', 'black')
    .merge(face)
      .call(renderFace, transform, mesh);
}

function renderFace(selection, transform, mesh) {
  selection.attr('points', indexs => {
    return indexs.map(index => { 
      const v = mesh.vertices[index];
      
      const p = vec3.transformMat4(vec3.create(), v, transform);
      const x = p[0] * 400 + 200 >> 0;
      const y = -p[1] * 400 + 200 >> 0;
      return `${x},${y}`;
    }).join(' ');
  });
}

function getTransform(view, proj, mesh) {
  const translate = mat4.translate(
    mat4.create(), 
    mat4.create(),
    mesh.position
  );

  const rotate = mat4.rotate(
    mat4.create(),
    mat4.create(),
    mesh.rotationAngle,
    mesh.rotationAxis
  ) || mat4.create();

  const world = mat4.multiply(mat4.create(), translate, rotate);
  
  const transform = mat4.multiply(
    mat4.create(), 
    mat4.multiply(mat4.create(), proj, view), 
    world
  );

  return transform;
}
