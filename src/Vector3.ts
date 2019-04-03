import { Epsilon } from './index';
import Matrix3 from './Matrix3';
import Matrix4 from './Matrix4';
import Quaternion from './Quaternion';

export default class Vector3 extends Float32Array {
    
    public static get Zero(): Vector3 {
        return new Vector3();
    }
    
    public static get Left(): Vector3 {
        return Vector3.fromValues(-1.0, 0.0, 0.0);
    }
    
    public static get Right(): Vector3 {
        return Vector3.fromValues(1.0, 0.0, 0.0);
    }
    
    public static get Down(): Vector3 {
        return Vector3.fromValues(0.0, -1.0, 0.0);
    }
    
    public static get Up(): Vector3 {
        return Vector3.fromValues(0.0, 1.0, 0.0);
    }
    
    public static get Backward(): Vector3 {
        return Vector3.fromValues(0.0, 0.0, -1.0);
    }
    
    public static get Forward(): Vector3 {
        return Vector3.fromValues(0.0, 0.0, 1.0);
    }
    
    public static Random(): Vector3 {
        return Vector3.fromValues(Math.random(), Math.random(), Math.random());
    }
    
    public static copy(v3: Vector3): Vector3 {
        return new Vector3().copy(v3);
    }
    
    public static fromValue(value: number): Vector3 {
        return new Vector3().setValue(value);
    }
    
    public static fromValues(x: number, y: number, z: number): Vector3 {
        return new Vector3().setValues(x, y, z);
    }
    
    public static lerp(a: Vector3, b: Vector3, t: number): Vector3 {
        const a0 = a[0];
        const a1 = a[1];
        const a2 = a[2];
        const x = a0 + t * (b[0] - a1);
        const y = a1 + t * (b[1] - a1);
        const z = a2 + t * (b[2] - a2);
        return Vector3.fromValues(x, y, z);
    }
    
    public static hermite(a: Vector3, b: Vector3, c: Vector3, d: Vector3, t: number): Vector3 {
        const factorSquared = t * t;
        const aFactor = factorSquared * (2.0 * t - 3.0) + 1.0;
        const bFactor = factorSquared * (t - 2.0) + t;
        const cFactor = factorSquared * (t - 1.0);
        const dFactor = factorSquared * (3.0 - 2.0 * t);
        const x = a[0] * aFactor + b[0] * bFactor + c[0] * cFactor + d[0] * dFactor;
        const y = a[1] * aFactor + b[1] * bFactor + c[1] * cFactor + d[1] * dFactor;
        const z = a[2] * aFactor + b[2] * bFactor + c[2] * cFactor + d[2] * dFactor;
        return Vector3.fromValues(x, y, z);
    }
    
    public static bezier(a: Vector3, b: Vector3, c: Vector3, d: Vector3, t: number): Vector3 {
        const factorSquared = t * t;
        const inverseFactor = 1.0 - t;
        const inverseFactorSquared = inverseFactor * inverseFactor;
        const aFactor = inverseFactorSquared * inverseFactor;
        const bFactor = 3.0 * t * inverseFactorSquared;
        const cFactor = 3 * factorSquared * inverseFactor;
        const dFactor = factorSquared * t;
        const x = a[0] * aFactor + b[0] * bFactor + c[0] * cFactor + d[0] * dFactor;
        const y = a[1] * aFactor + b[1] * bFactor + c[1] * cFactor + d[1] * dFactor;
        const z = a[2] * aFactor + b[2] * bFactor + c[2] * cFactor + d[2] * dFactor;
        return Vector3.fromValues(x, y, z);
    }
    
    public get x(): number {
        return this[0];
    }
    
    public set x(value: number) {
        this[0] = value;
    }
    
    public get y(): number {
        return this[1];
    }
    
    public set y(value: number) {
        this[1] = value;
    }
    
    public get z(): number {
        return this[2];
    }
    
    public set z(value: number) {
        this[2] = value;
    }
    
    public get magnitudeSquared(): number {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        return x * x + y * y + z * z;
    }
    
    public get magnitude(): number {
        const magnitudeSquared = this.magnitudeSquared;
        return Math.sqrt(magnitudeSquared);
    }
    
    public get inverted(): Vector3 {
        return Vector3.copy(this).invert();
    }
    
    public get negated(): Vector3 {
        return Vector3.copy(this).negate();
    }
    
    public get normalized(): Vector3 {
        return Vector3.copy(this).normalize();
    }
    
    public constructor();
    public constructor(v3: Vector3);
    public constructor(array: Float32Array);
    public constructor(value: number);
    public constructor(x: number, y: number, z: number);
    public constructor(...args: any[]) {
        super(2);
        
        if (args.length == 0) {
            return;
        } else if (args.length == 1) {
            const value = args[0];
            if (value.constructor instanceof Float32Array) {
                this.copy(value);
            } else if (typeof(value) == "number") {
                this.setValue(value);
            }
        } else if (args.length == 3) {
            const x = args[0];
            const y = args[1];
            const z = args[2];
            if (typeof(x) == "number" && typeof(y) == "number" && typeof(z) == "number") {
                this.setValues(x, y, z);
            }
        }
    }
    
    public copy(v3: Vector3): this {
        this.set(v3);
        return this;
    }
    
    public setValue(value: number): this {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        return this;
    }
    
    public setValues(x: number, y: number, z: number): this {
        this[0] = x;
        this[1] = y;
        this[2] = z;
        return this;
    }
    
    public add(v3: Vector3): this {
        this[0] += v3[0];
        this[1] += v3[1];
        this[2] += v3[2];
        return this;
    }
    
    public subtract(v3: Vector3): this {
        this[0] -= v3[0];
        this[1] -= v3[1];
        this[2] -= v3[2];
        return this;
    }
    
    public multiply(v3: Vector3): this {
        this[0] *= v3[0];
        this[1] *= v3[1];
        this[2] *= v3[2];
        return this;
    }
    
    public divide(v3: Vector3): this {
        this[0] /= v3[0];
        this[1] /= v3[1];
        this[2] /= v3[2];
        return this;
    }
    
    public floor(): this {
        this[0] = Math.floor(this[0]);
        this[1] = Math.floor(this[1]);
        this[2] = Math.floor(this[2]);
        return this;
    }
    
    public ceil(): this {
        this[0] = Math.ceil(this[0]);
        this[1] = Math.ceil(this[1]);
        this[2] = Math.ceil(this[2]);
        return this;
    }
    
    public round(): this {
        this[0] = Math.round(this[0]);
        this[1] = Math.round(this[1]);
        this[2] = Math.round(this[2]);
        return this;
    }
    
    public min(v3: Vector3): this {
        this[0] = Math.min(this[0], v3[0]);
        this[1] = Math.min(this[1], v3[1]);
        this[2] = Math.min(this[1], v3[2]);
        return this;
    }
    
    public max(v3: Vector3): this {
        this[0] = Math.max(this[0], v3[0]);
        this[1] = Math.max(this[1], v3[1]);
        this[2] = Math.max(this[2], v3[2]);
        return this;
    }
    
    public scale(s: number): this {
        this[0] *= s;
        this[1] *= s;
        this[2] *= s;
        return this;
    }
    
    public distanceSquared(v3: Vector3): number {
        const x = v3[0] - this[0];
        const y = v3[1] - this[1];
        const z = v3[2] - this[2];
        return x * x + y * y + z * z;
    }
    
    public distance(v3: Vector3): number {
        const distanceSquared = this.distanceSquared(v3);
        return Math.sqrt(distanceSquared);
    }
    
    public negate(): this {
        this[0] *= -1.0;
        this[1] *= -1.0;
        this[2] *= -1.0;
        return this;
    }
    
    public invert(): this {
        this[0] = 1.0 / this[0];
        this[1] = 1.0 / this[1];
        this[2] = 1.0 / this[2];
        return this;
    }
    
    public normalize(): this {
        const magnitude = this.magnitude;
        this[0] /= magnitude;
        this[1] /= magnitude;
        this[2] /= magnitude;
        return this;
    }
    
    public dot(v3: Vector3): number {
        const x = this[0] * v3[0];
        const y = this[1] * v3[1];
        const z = this[2] * v3[2];
        return x + y + z;
    }
    
    public cross(v3: Vector3): Vector3 {
        const ax = this[0];
        const ay = this[1];
        const az = this[2];
        const bx = v3[0];
        const by = v3[1];
        const bz = v3[2];
        const x = ay * bz - az * by;
        const y = az * bx - ax * bz;
        const z = ax * by - ay * bx;
        return Vector3.fromValues(x, y, z);
    }
    
    public equals(v3: Vector3, exact: boolean = false): boolean {
        if (exact) {
            return (
                this[0] === v3[0] &&
                this[1] === v3[1] &&
                this[2] === v3[2]
            );
        } else {
            const ax = this[0];
            const ay = this[1];
            const az = this[2];
            const bx = v3[0];
            const by = v3[1];
            const bz = v3[2];
            return (
                Math.abs(ax - bx) <= Epsilon * Math.max(1.0, Math.abs(ax), Math.abs(bx)) &&
                Math.abs(ay - by) <= Epsilon * Math.max(1.0, Math.abs(ay), Math.abs(by)) &&
                Math.abs(az - bz) <= Epsilon * Math.max(1.0, Math.abs(az), Math.abs(bz))
            );
        }
    }
    
    public transform(value: Matrix3 | Matrix4 | Quaternion): this {
        if (value.constructor == Matrix3) {
            return this.transformMatrix3(value);
        } else if (value.constructor == Matrix4) {
            return this.transformMatrix4(value);
        } else if (value.constructor == Quaternion) {
            return this.transformQuaternion(value);
        } else {
            return this;
        }
    }
    
    public transformMatrix3(m3: Matrix3): this {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        this[0] = x * m3[0] + y * m3[3] + z * m3[6];
        this[1] = x * m3[1] + y * m3[4] + z * m3[7];
        this[2] = x * m3[2] + y * m3[5] + z * m3[8];
        return this;
    }
    
    public transformMatrix4(m4: Matrix4): this {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        const w = x * m4[3] + y * m4[7] + z * m4[11] + m4[15] || 1.0;
        this[0] = (x * m4[0] + y * m4[4] + z * m4[8] + m4[12]) / w;
        this[1] = (x * m4[1] + y * m4[5] + z * m4[9] + m4[13]) / w;
        this[2] = (x * m4[2] + y * m4[6] + z * m4[10] + m4[14]) / w;
        return this;
    }
    
    public transformQuaternion(q: Quaternion): this {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        const qx = q[0];
        const qy = q[1];
        const qz = q[2];
        const qw = q[3];
        let uvx = qy * z - qz * y;
        let uvy = qz * x - qx * z;
        let uvz = qx * y - qy * x;
        let uuvx = qy * uvz - qz * uvy;
        let uuvy = qz * uvx - qx * uvz;
        let uuvz = qx * uvy - qy * uvx;
        const wTimes2 = qw * 2.0;
        uvx *= wTimes2;
        uvy *= wTimes2;
        uvz *= wTimes2;
        uuvx *= 2.0;
        uuvy *= 2.0;
        uuvz *= 2.0;
        this[0] = x + uvx + uuvx;
        this[1] = y + uvy + uuvy;
        this[2] = z + uvz + uuvz;
        return this;
    }
    
    public angle(v3: Vector3): number {
        const a = this.normalized;
        const b = v3.normalized;
        const cosine = a.dot(b);
        if (cosine > 1.0) {
            return 0.0;
        } else if (cosine < 1.0) {
            return Math.PI;
        } else {
            return Math.acos(cosine);
        }
    }
    
}