import { Epsilon } from './index';
import Matrix4 from './Matrix4';
import Quaternion from './Quaternion';

export default class Vector4 extends Float32Array {
    
    public static get Zero(): Vector4 {
        return new Vector4();
    }
    
    public static get Left(): Vector4 {
        return Vector4.fromValues(-1.0, 0.0, 0.0, 0.0);
    }
    
    public static get Right(): Vector4 {
        return Vector4.fromValues(1.0, 0.0, 0.0, 0.0);
    }
    
    public static get Down(): Vector4 {
        return Vector4.fromValues(0.0, -1.0, 0.0, 0.0);
    }
    
    public static get Up(): Vector4 {
        return Vector4.fromValues(0.0, 1.0, 0.0, 0.0);
    }
    
    public static get Backward(): Vector4 {
        return Vector4.fromValues(0.0, 0.0, -1.0, 0.0);
    }
    
    public static get Forward(): Vector4 {
        return Vector4.fromValues(0.0, 0.0, 1.0, 0.0);
    }
    
    public static copy(v4: Vector4): Vector4 {
        return new Vector4().copy(v4);
    }
    
    public static fromValue(value: number): Vector4 {
        return new Vector4().setValue(value);
    }
    
    public static fromValues(x: number, y: number, z: number, w: number): Vector4 {
        return new Vector4().setValues(x, y, z, w);
    }
    
    public static lerp(a: Vector4, b: Vector4, t: number): Vector4 {
        const a0 = a[0];
        const a1 = a[1];
        const a2 = a[2];
        const a3 = a[3];
        const x = a0 + t * (b[0] - a1);
        const y = a1 + t * (b[1] - a1);
        const z = a2 + t * (b[2] - a2);
        const w = a3 + t * (b[3] - a3);
        return Vector4.fromValues(x, y, z, w);
    }
    
    public static hermite(a: Vector4, b: Vector4, c: Vector4, d: Vector4, t: number): Vector4 {
        const factorSquared = t * t;
        const aFactor = factorSquared * (2.0 * t - 3.0) + 1.0;
        const bFactor = factorSquared * (t - 2.0) + t;
        const cFactor = factorSquared * (t - 1.0);
        const dFactor = factorSquared * (3.0 - 2.0 * t);
        const x = a[0] * aFactor + b[0] * bFactor + c[0] * cFactor + d[0] * dFactor;
        const y = a[1] * aFactor + b[1] * bFactor + c[1] * cFactor + d[1] * dFactor;
        const z = a[2] * aFactor + b[2] * bFactor + c[2] * cFactor + d[2] * dFactor;
        const w = a[3] * aFactor + b[3] * bFactor + c[3] * cFactor + d[3] * dFactor;
        return Vector4.fromValues(x, y, z, w);
    }
    
    public static bezier(a: Vector4, b: Vector4, c: Vector4, d: Vector4, t: number): Vector4 {
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
        const w = a[3] * aFactor + b[3] * bFactor + c[3] * cFactor + d[3] * dFactor;
        return Vector4.fromValues(x, y, z, w);
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
    
    public get w(): number {
        return this[3];
    }
    
    public set w(value: number) {
        this[3] = value;
    }
    
    public get magnitudeSquared(): number {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        const w = this[3];
        return x * x + y * y + z * z + w * w;
    }
    
    public get magnitude(): number {
        const magnitudeSquared = this.magnitudeSquared;
        return Math.sqrt(magnitudeSquared);
    }
    
    public get inverted(): Vector4 {
        return Vector4.copy(this).invert();
    }
    
    public get negated(): Vector4 {
        return Vector4.copy(this).negate();
    }
    
    public get normalized(): Vector4 {
        return Vector4.copy(this).normalize();
    }
    
    public constructor();
    public constructor(v4: Vector4);
    public constructor(array: Float32Array);
    public constructor(value: number);
    public constructor(x: number, y: number, z: number, w: number);
    public constructor(...args: any[]) {
        super(4);
        
        if (args.length == 0) {
            return;
        } else if (args.length == 1) {
            const value = args[0];
            if (value.constructor == Float32Array) {
                this.copy(value);
            } else if (value.constructor == Vector4) {
                this.copy(value);
            } else if (typeof(value) == "number") {
                this.setValue(value);
            }
        } else if (args.length == 4) {
            const x = args[0];
            const y = args[1];
            const z = args[2];
            const w = args[3];
            if (typeof(x) == "number" && typeof(y) == "number" && typeof(z) == "number" && typeof(w) == "number") {
                this.setValues(x, y, z, w);
            }
        }
    }
    
    public copy(v4: Vector4): this {
        this.set(v4);
        return this;
    }
    
    public setValue(value: number): this {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        this[3] = value;
        return this;
    }
    
    public setValues(x: number, y: number, z: number, w: number): this {
        this[0] = x;
        this[1] = y;
        this[2] = z;
        this[3] = w;
        return this;
    }
    
    public add(v4: Vector4): this {
        this[0] += v4[0];
        this[1] += v4[1];
        this[2] += v4[2];
        this[3] += v4[3];
        return this;
    }
    
    public subtract(v4: Vector4): this {
        this[0] -= v4[0];
        this[1] -= v4[1];
        this[2] -= v4[2];
        this[3] -= v4[3];
        return this;
    }
    
    public multiply(v4: Vector4): this {
        this[0] *= v4[0];
        this[1] *= v4[1];
        this[2] *= v4[2];
        this[3] *= v4[3];
        return this;
    }
    
    public divide(v4: Vector4): this {
        this[0] /= v4[0];
        this[1] /= v4[1];
        this[2] /= v4[2];
        this[3] /= v4[3];
        return this;
    }
    
    public floor(): this {
        this[0] = Math.floor(this[0]);
        this[1] = Math.floor(this[1]);
        this[2] = Math.floor(this[2]);
        this[3] = Math.floor(this[3]);
        return this;
    }
    
    public ceil(): this {
        this[0] = Math.ceil(this[0]);
        this[1] = Math.ceil(this[1]);
        this[2] = Math.ceil(this[2]);
        this[3] = Math.ceil(this[3]);
        return this;
    }
    
    public round(): this {
        this[0] = Math.round(this[0]);
        this[1] = Math.round(this[1]);
        this[2] = Math.round(this[2]);
        this[3] = Math.round(this[3]);
        return this;
    }
    
    public min(v4: Vector4): this {
        this[0] = Math.min(this[0], v4[0]);
        this[1] = Math.min(this[1], v4[1]);
        this[2] = Math.min(this[2], v4[2]);
        this[3] = Math.min(this[3], v4[3]);
        return this;
    }
    
    public max(v4: Vector4): this {
        this[0] = Math.max(this[0], v4[0]);
        this[1] = Math.max(this[1], v4[1]);
        this[2] = Math.max(this[2], v4[2]);
        this[3] = Math.max(this[3], v4[3]);
        return this;
    }
    
    public scale(s: number): this {
        this[0] *= s;
        this[1] *= s;
        this[2] *= s;
        this[3] *= s;
        return this;
    }
    
    public distanceSquared(v4: Vector4): number {
        const x = v4[0] - this[0];
        const y = v4[1] - this[1];
        const z = v4[2] - this[2];
        const w = v4[3] - this[3];
        return x * x + y * y + z * z + w * w;
    }
    
    public distance(v4: Vector4): number {
        const distanceSquared = this.distanceSquared(v4);
        return Math.sqrt(distanceSquared);
    }
    
    public negate(): this {
        this[0] *= -1.0;
        this[1] *= -1.0;
        this[2] *= -1.0;
        this[3] *= -1.0;
        return this;
    }
    
    public invert(): this {
        this[0] = 1.0 / this[0];
        this[1] = 1.0 / this[1];
        this[2] = 1.0 / this[2];
        this[3] = 1.0 / this[3];
        return this;
    }
    
    public normalize(): this {
        const magnitude = this.magnitude;
        this[0] /= magnitude;
        this[1] /= magnitude;
        this[2] /= magnitude;
        this[3] /= magnitude;
        return this;
    }
    
    public dot(v4: Vector4): number {
        const x = this[0] * v4[0];
        const y = this[1] * v4[1];
        const z = this[2] * v4[2];
        const w = this[3] * v4[3];
        return x + y + z + w;
    }
    
    public equals(v4: Vector4): boolean {
        const ax = this[0];
        const ay = this[1];
        const az = this[2];
        const aw = this[3];
        const bx = v4[0];
        const by = v4[1];
        const bz = v4[2];
        const bw = v4[3];
        return (
            Math.abs(ax - bx) <= Epsilon * Math.max(1.0, Math.abs(ax), Math.abs(bx)) &&
            Math.abs(ay - by) <= Epsilon * Math.max(1.0, Math.abs(ay), Math.abs(by)) &&
            Math.abs(az - bz) <= Epsilon * Math.max(1.0, Math.abs(az), Math.abs(bz)) &&
            Math.abs(aw - bw) <= Epsilon * Math.max(1.0, Math.abs(aw), Math.abs(bw))
        );
    }
    
    public exactEquals(v4: Vector4): boolean {
        return (
            this[0] === v4[0] &&
            this[1] === v4[1] &&
            this[2] === v4[2] &&
            this[3] === v4[3]
        );
    }
    
    public transform(m4: Matrix4): this;
    public transform(q: Quaternion): this;
    public transform(...args: any[]): this {
        const value = args[0];
        if (value.constructor == Matrix4) {
            return this.transformMatrix4(value);
        } else if (value.constructor == Quaternion) {
            return this.transformQuaternion(value);
        } else {
            return this;
        }
    }
    
    public transformMatrix4(m4: Matrix4): this {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        const w = this[3];
        this[0] = x * m4[0] + y * m4[4] + z * m4[8] + w * m4[12];
        this[1] = x * m4[1] + y * m4[5] + z * m4[9] + w * m4[13];
        this[2] = x * m4[2] + y * m4[6] + z * m4[10] + w * m4[14];
        this[3] = x * m4[3] + y * m4[7] + z * m4[11] + w * m4[15];
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
        const ix = qw * x + qy * z - qz * y;
        const iy = qw * y + qz * x - qx * z;
        const iz = qw * z + qx * y - qy * x;
        const iw = -qx * x - qy * y - qz * z;
        this[0] = ix * qw + iw * -qx + iy * -qx - iz * -qy;
        this[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    }
    
}