import * as _THREE from 'three';
export interface THREESubset {
    BufferGeometry: typeof _THREE.BufferGeometry;
    Float32BufferAttribute: typeof _THREE.Float32BufferAttribute;
    Quaternion: typeof _THREE.Quaternion;
    Vector2: typeof _THREE.Vector2;
    Vector3: typeof _THREE.Vector3;
    [key: string]: any;
}
export declare const generateRibbonGeometryClass: ({ THREE }: {
    THREE: THREESubset;
}) => {
    new (path: _THREE.CurvePath<_THREE.Vector3>, ribbonSegments?: number, ribbonWidth?: number, numOfTwist?: number, twistEasing?: (t: number) => number, closed?: boolean): {
        tangents: _THREE.Vector3[];
        normals: _THREE.Vector3[];
        binormals: _THREE.Vector3[];
        type: string;
        id: number;
        uuid: string;
        name: string;
        index: _THREE.BufferAttribute | null;
        attributes: {
            [name: string]: _THREE.BufferAttribute | _THREE.InterleavedBufferAttribute;
        };
        morphAttributes: {
            [name: string]: (_THREE.BufferAttribute | _THREE.InterleavedBufferAttribute)[];
        };
        morphTargetsRelative: boolean;
        groups: {
            start: number;
            count: number;
            materialIndex?: number | undefined;
        }[];
        boundingBox: _THREE.Box3 | null;
        boundingSphere: _THREE.Sphere | null;
        drawRange: {
            start: number;
            count: number;
        };
        userData: {
            [key: string]: any;
        };
        readonly isBufferGeometry: true;
        getIndex(): _THREE.BufferAttribute | null;
        setIndex(index: _THREE.BufferAttribute | number[] | null): _THREE.BufferGeometry;
        setAttribute(name: _THREE.BuiltinShaderAttributeName | (string & {}), attribute: _THREE.BufferAttribute | _THREE.InterleavedBufferAttribute): _THREE.BufferGeometry;
        getAttribute(name: _THREE.BuiltinShaderAttributeName | (string & {})): _THREE.BufferAttribute | _THREE.InterleavedBufferAttribute;
        deleteAttribute(name: _THREE.BuiltinShaderAttributeName | (string & {})): _THREE.BufferGeometry;
        hasAttribute(name: _THREE.BuiltinShaderAttributeName | (string & {})): boolean;
        addGroup(start: number, count: number, materialIndex?: number | undefined): void;
        clearGroups(): void;
        setDrawRange(start: number, count: number): void;
        applyMatrix4(matrix: _THREE.Matrix4): _THREE.BufferGeometry;
        applyQuaternion(q: _THREE.Quaternion): _THREE.BufferGeometry;
        rotateX(angle: number): _THREE.BufferGeometry;
        rotateY(angle: number): _THREE.BufferGeometry;
        rotateZ(angle: number): _THREE.BufferGeometry;
        translate(x: number, y: number, z: number): _THREE.BufferGeometry;
        scale(x: number, y: number, z: number): _THREE.BufferGeometry;
        lookAt(v: _THREE.Vector3): void;
        center(): _THREE.BufferGeometry;
        setFromPoints(points: _THREE.Vector3[] | _THREE.Vector2[]): _THREE.BufferGeometry;
        computeBoundingBox(): void;
        computeBoundingSphere(): void;
        computeTangents(): void;
        computeVertexNormals(): void;
        merge(geometry: _THREE.BufferGeometry, offset?: number | undefined): _THREE.BufferGeometry;
        normalizeNormals(): void;
        toNonIndexed(): _THREE.BufferGeometry;
        toJSON(): any;
        clone(): _THREE.BufferGeometry;
        copy(source: _THREE.BufferGeometry): any;
        dispose(): void;
        drawcalls: any;
        offsets: any;
        addIndex(index: any): void;
        addDrawCall(start: any, count: any, indexOffset?: any): void;
        clearDrawCalls(): void;
        addAttribute(name: string, attribute: _THREE.BufferAttribute | _THREE.InterleavedBufferAttribute): _THREE.BufferGeometry;
        addAttribute(name: any, array: any, itemSize: any): any;
        removeAttribute(name: string): _THREE.BufferGeometry;
        addEventListener(type: string, listener: (event: _THREE.Event) => void): void;
        hasEventListener(type: string, listener: (event: _THREE.Event) => void): boolean;
        removeEventListener(type: string, listener: (event: _THREE.Event) => void): void;
        dispatchEvent(event: {
            [attachment: string]: any;
            type: string;
        }): void;
    };
    MaxIndex: number;
};
