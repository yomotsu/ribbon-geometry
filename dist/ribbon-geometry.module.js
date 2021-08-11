/*!
 * ribbon-geometry
 * https://github.com/yomotsu/ribbon-geometry
 * (c) 2021 @yomotsu
 * Released under the MIT License.
 */
const linear = (t) => {
    return t;
};
const generateRibbonGeometryClass = ({ THREE }) => {
    const { BufferGeometry, Float32BufferAttribute, Quaternion, Vector2, Vector3, } = THREE;
    const radialSegments = 2;
    let P = new Vector3();
    const normal = new Vector3();
    const binormal = new Vector3();
    const tangent = new Vector3();
    const vertex = new Vector3();
    const uv = new Vector2();
    const twistRotation = new Quaternion();
    const faceRotation = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
    return class RibbonGeometry extends BufferGeometry {
        constructor(path, ribbonSegments = 64, ribbonWidth = 1, numOfTwist = 0, twistEasing = linear, closed = false) {
            super();
            this.type = 'RibbonGeometry';
            const ribbonWidthHalf = ribbonWidth / 2;
            const frames = path.computeFrenetFrames(ribbonSegments, closed);
            this.tangents = frames.tangents;
            this.normals = frames.normals;
            this.binormals = frames.binormals;
            const vertices = [];
            const normals = [];
            const uvs = [];
            const indices = [];
            generateBufferData();
            this.setIndex(indices);
            this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
            this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
            this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
            function generateBufferData() {
                for (let i = 0; i < ribbonSegments; i++) {
                    generateSegment(i);
                }
                generateSegment((closed === false) ? ribbonSegments : 0);
                generateUVs();
                generateIndices();
            }
            function generateSegment(i) {
                const progressAlongThePath = i / ribbonSegments;
                P = path.getPointAt(progressAlongThePath, P);
                normal.copy(frames.normals[i]).applyQuaternion(faceRotation);
                binormal.copy(frames.binormals[i]).applyQuaternion(faceRotation);
                tangent.copy(frames.tangents[i]);
                twistRotation.setFromAxisAngle(tangent, Math.PI * 2 * twistEasing(progressAlongThePath) * numOfTwist);
                normal.applyQuaternion(twistRotation);
                binormal.applyQuaternion(twistRotation);
                for (let j = 0; j <= radialSegments; j++) {
                    normals.push(binormal.x, binormal.y, binormal.z);
                    const v = j / radialSegments * Math.PI * 2;
                    const sin = Math.sin(v);
                    const cos = -Math.cos(v);
                    vertex.x = P.x + ribbonWidthHalf * (cos * normal.x + sin * binormal.x);
                    vertex.y = P.y + ribbonWidthHalf * (cos * normal.y + sin * binormal.y);
                    vertex.z = P.z + ribbonWidthHalf * (cos * normal.z + sin * binormal.z);
                    vertices.push(vertex.x, vertex.y, vertex.z);
                }
            }
            function generateIndices() {
                for (let j = 1; j <= ribbonSegments; j++) {
                    for (let i = 1; i <= radialSegments - 1; i++) {
                        const a = (radialSegments + 1) * (j - 1) + (i - 1);
                        const b = (radialSegments + 1) * j + (i - 1);
                        const c = (radialSegments + 1) * j + i;
                        const d = (radialSegments + 1) * (j - 1) + i;
                        indices.push(a, b, d);
                        indices.push(b, c, d);
                    }
                }
            }
            function generateUVs() {
                for (let i = 0; i <= ribbonSegments; i++) {
                    for (let j = 0; j <= radialSegments; j++) {
                        uv.x = 1 - j / (radialSegments - 1);
                        uv.y = i / ribbonSegments;
                        uvs.push(uv.x, uv.y);
                    }
                }
            }
        }
    };
};

export { generateRibbonGeometryClass as default };
