import type * as _THREE from 'three';

export interface THREESubset {
	BufferGeometry: typeof _THREE.BufferGeometry;
	Float32BufferAttribute: typeof _THREE.Float32BufferAttribute;
	Quaternion: typeof _THREE.Quaternion;
	Vector2: typeof _THREE.Vector2;
	Vector3: typeof _THREE.Vector3;

	[ key: string ]: any;
}

const linear = ( t: number ): number => {

	return t;

};

export const generateRibbonGeometryClass = ( { THREE }: { THREE: THREESubset } ) => {

	const {
		BufferGeometry,
		Float32BufferAttribute,
		Quaternion,
		Vector2,
		Vector3,
	} = THREE;

	const radialSegments = 2;

	// helper variables
	let P = new Vector3();
	const normal = new Vector3();
	const binormal = new Vector3();
	const tangent = new Vector3();
	const vertex = new Vector3();
	const uv = new Vector2();
	const twistRotation = new Quaternion();
	const faceRotation = new Quaternion().setFromAxisAngle( new Vector3( 0, 1, 0 ), Math.PI / 2 );

	// based on
	// https://github.com/mrdoob/three.js/blob/master/src/geometries/TubeGeometry.js
	return class RibbonGeometry extends BufferGeometry {

		tangents: _THREE.Vector3[];
		normals: _THREE.Vector3[];
		binormals: _THREE.Vector3[];
		type = 'RibbonGeometry';

		constructor( path: _THREE.CurvePath<_THREE.Vector3>, ribbonSegments = 64, ribbonWidth = 1, numOfTwist = 0, twistEasing = linear, closed = false ) {

			super();

			const ribbonWidthHalf = ribbonWidth / 2;
			const frames = path.computeFrenetFrames( ribbonSegments, closed );

			// expose internals

			this.tangents = frames.tangents;
			this.normals = frames.normals;
			this.binormals = frames.binormals;

			// buffer

			const vertices: number[] = [];
			const normals: number[] = [];
			const uvs: number[] = [];
			const indices: number[] = [];

			// create buffer data

			generateBufferData();

			// build geometry

			this.setIndex( indices );
			this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
			this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
			this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

			// functions

			function generateBufferData() {

				for ( let i = 0; i < ribbonSegments; i ++ ) {

					generateSegment( i );

				}

				// if the geometry is not closed, generate the last row of vertices and normals
				// at the regular position on the given path
				//
				// if the geometry is closed, duplicate the first row of vertices and normals (uvs will differ)

				generateSegment( ( closed === false ) ? ribbonSegments : 0 );

				// uvs are generated in a separate function.
				// this makes it easy compute correct values for closed geometries

				generateUVs();

				// finally create faces

				generateIndices();

			}

			function generateSegment( i: number ) {

				// we use getPointAt to sample evenly distributed points from the given path
				const progressAlongThePath = i / ribbonSegments;
				P = path.getPointAt( progressAlongThePath, P );

				// retrieve corresponding normal and binormal

				normal.copy( frames.normals[ i ] ).applyQuaternion( faceRotation );
				binormal.copy( frames.binormals[ i ] ).applyQuaternion( faceRotation );
				tangent.copy( frames.tangents[ i ] );

				twistRotation.setFromAxisAngle( tangent, Math.PI * 2 * twistEasing( progressAlongThePath ) * numOfTwist );

				normal.applyQuaternion( twistRotation );
				binormal.applyQuaternion( twistRotation );
				// generate normals and vertices for the current segment

				for ( let j = 0; j <= radialSegments; j ++ ) {

					// normal
					normals.push( binormal.x, binormal.y, binormal.z );

					// vertex
					const v = j / radialSegments * Math.PI * 2;

					const sin = Math.sin( v );
					const cos = - Math.cos( v );

					vertex.x = P.x + ribbonWidthHalf * ( cos * normal.x + sin * binormal.x );
					vertex.y = P.y + ribbonWidthHalf * ( cos * normal.y + sin * binormal.y );
					vertex.z = P.z + ribbonWidthHalf * ( cos * normal.z + sin * binormal.z );

					vertices.push( vertex.x, vertex.y, vertex.z );

				}

			}

			function generateIndices() {

				for ( let j = 1; j <= ribbonSegments; j ++ ) {

					for ( let i = 1; i <= radialSegments - 1; i ++ ) {

						const a = ( radialSegments + 1 ) * ( j - 1 ) + ( i - 1 );
						const b = ( radialSegments + 1 ) * j + ( i - 1 );
						const c = ( radialSegments + 1 ) * j + i;
						const d = ( radialSegments + 1 ) * ( j - 1 ) + i;

						// faces

						indices.push( a, b, d );
						indices.push( b, c, d );

					}

				}

			}

			function generateUVs() {

				for ( let i = 0; i <= ribbonSegments; i ++ ) {

					for ( let j = 0; j <= radialSegments; j ++ ) {

						uv.x = 1 - j / ( radialSegments - 1 );
						uv.y = i / ribbonSegments;

						uvs.push( uv.x, uv.y );

					}

				}

			}

		}

	};

};
