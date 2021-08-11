# RibbonGeometry

RibbonGeometry for three.js

[![Latest NPM release](https://img.shields.io/npm/v/ribbon-geometry.svg)](https://www.npmjs.com/package/ribbon-geometry)

## Examples

- [basic](https://yomotsu.github.io/ribbon-geometry/examples/basic.html)
- [curve](https://yomotsu.github.io/ribbon-geometry/examples/curve.html)
- [normal](https://yomotsu.github.io/ribbon-geometry/examples/normal.html)
- [twist](https://yomotsu.github.io/ribbon-geometry/examples/twist.html)
- [twist-weight](https://yomotsu.github.io/ribbon-geometry/examples/twist-weight.html)

## Usage

```javascript
import * as THREE from 'three';
import generateRibbonGeometryClass from 'ribbon-geometry';

// inject three.js to the lib to make the Class.
const RibbonGeometry = generateRibbonGeometryClass( { THREE: THREE } );

const width  = window.innerWidth;
const height = window.innerHeight;
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 100 );
camera.position.set( 0, 0, 5 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

const curvePath = new THREE.CurvePath();
const lineCurve = new THREE.LineCurve3(
	new THREE.Vector3( 0, - 1, 0 ),
	new THREE.Vector3( 0,   1, 0 ),
)
curvePath.add( lineCurve );

const ribbonSegments = 64;
const ribbonWidth = 1;
const mesh = new THREE.Mesh(
	new RibbonGeometry( curvePath, ribbonSegments, ribbonWidth ),
	new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } ),
);
scene.add( mesh );

renderer.render( scene, camera );
```



