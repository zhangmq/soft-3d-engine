import Mesh from './mesh';

export default class Box extends Mesh {
  constructor(name, size) {
    super(
      name, 
      [
        [-size / 2, size / 2, size / 2],
        [size / 2, size / 2, size / 2],
        [-size / 2, -size / 2, size / 2],
        [size / 2, -size / 2, size / 2],
        [-size / 2, size / 2, -size / 2],
        [size / 2, size / 2, -size / 2],
        [size / 2, -size / 2, -size / 2],
        [-size / 2, -size / 2, -size / 2]
      ],
      [
        [0, 1, 2],
        [1, 2, 3],
        [1, 3, 6],
        [1, 5, 6],
        [0, 1, 4],
        [1, 4, 5],
        [2, 3, 7],
        [3, 6, 7],
        [0, 2, 7],
        [0, 4, 7],
        [4, 5, 6],
        [4, 6, 7]
      ]
    );
  }
}