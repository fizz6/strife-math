import { Epsilon } from './index';
import Vector3 from './Vector3';
import Matrix2 from './Matrix2';
import Matrix2d from './Matrix2d';
import Matrix3 from './Matrix3';
import Matrix4 from './Matrix4';

export default class Vector2 extends Float32Array {
    
    public static get Zero(): Vector2 {
        return new Vector2();
    }
    
    public static get Left(): Vector2 {
        return Vector2.fromValues(-1.0, 0.0);
    }
    
    public static get Right(): Vector2 {
        return Vector2.fromValues(1.0, 0.0);
    }
    
    public static get Down(): Vector2 {
        return Vector2.fromValues(0.0, -1.0);
    }
    
    public static get Up(): Vector2 {
        return Vector2.fromValues(0.0, 1.0);
    }
    
    public static copy(v2: Vector2): Vector2 {
        return new Vector2().copy(v2);
    }
    
    public static fromValue(value: number): Vector2 {
        return new Vector2().setValue(value);
    }
    
    public static fromValues(x: number, y: number): Vector2 {
        return new Vector2().setValues(x, y);
    }
    
    public static lerp(a: Vector2, b: Vector2, t: number): Vector2 {
        const a0 = a[0];
        const a1 = a[1];
        const x = a0 + t * (b[0] - a0);
        const y = a1 + t * (b[1] - a1);
        return Vector2.fromValues(x, y);
    }
    
    public static hermite(a: Vector2, b: Vector2, c: Vector2, d: Vector2, t: number): Vector2 {
        const factorSquared = t * t;
        const aFactor = factorSquared * (2.0 * t - 3.0) + 1.0;
        const bFactor = factorSquared * (t - 2.0) + t;
        const cFactor = factorSquared * (t - 1.0);
        const dFactor = factorSquared * (3.0 - 2.0 * t);
        const x = a[0] * aFactor + b[0] * bFactor + c[0] * cFactor + d[0] * dFactor;
        const y = a[1] * aFactor + b[1] * bFactor + c[1] * cFactor + d[1] * dFactor;
        return Vector2.fromValues(x, y);
    }
    
    public static bezier(a: Vector2, b: Vector2, c: Vector2, d: Vector2, t: number): Vector2 {
        const factorSquared = t * t;
        const inverseFactor = 1.0 - t;
        const inverseFactorSquared = inverseFactor * inverseFactor;
        const aFactor = inverseFactorSquared * inverseFactor;
        const bFactor = 3.0 * t * inverseFactorSquared;
        const cFactor = 3 * factorSquared * inverseFactor;
        const dFactor = factorSquared * t;
        const x = a[0] * aFactor + b[0] * bFactor + c[0] * cFactor + d[0] * dFactor;
        const y = a[1] * aFactor + b[1] * bFactor + c[1] * cFactor + d[1] * dFactor;
        return Vector2.fromValues(x, y);
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
    
    public get magnitudeSquared(): number {
        const x = this[0];
        const y = this[1];
        return x * x + y * y;
    }
    
    public get magnitude(): number {
        const magnitudeSquared = this.magnitudeSquared;
        return Math.sqrt(magnitudeSquared);
    }
    
    public get inverted(): Vector2 {
        return Vector2.copy(this).invert();
    }
    
    public get negated(): Vector2 {
        return Vector2.copy(this).negate();
    }
    
    public get normalized(): Vector2 {
        return Vector2.copy(this).normalize();
    }
    
    public constructor();
    public constructor(v2: Vector2);
    public constructor(array: Float32Array);
    public constructor(value: number);
    public constructor(x: number, y: number);
    public constructor(...args: any[]) {
        super(2);
        
        if (args.length == 0) {
            return;
        } else if (args.length == 1) {
            const value = args[0];
            if (value.constructor == Float32Array) {
                this.copy(value);
            } else if (value.constructor == Vector2) {
                this.copy(value);
            } else if (typeof(value) == "number") {
                this.setValue(value);
            }
        } else if (args.length == 2) {
            const x = args[0];
            const y = args[1];
            if (typeof(x) == "number" && typeof(y) == "number") {
                this.setValues(x, y);
            }
        }
    }
    
    public copy(v2: Vector2): this {
        this.set(v2);
        return this;
    }
    
    public setValue(value: number): this {
        this[0] = value;
        this[1] = value;
        return this;
    }
    
    public setValues(x: number, y: number): this {
        this[0] = x;
        this[1] = y;
        return this;
    }
    
    public add(v2: Vector2): this {
        this[0] += v2[0];
        this[1] += v2[1];
        return this;
    }
    
    public subtract(v2: Vector2): this {
        this[0] -= v2[0];
        this[1] -= v2[1];
        return this;
    }
    
    public multiply(v2: Vector2): this {
        this[0] *= v2[0];
        this[1] *= v2[1];
        return this;
    }
    
    public divide(v2: Vector2): this {
        this[0] /= v2[0];
        this[1] /= v2[1];
        return this;
    }
    
    public floor(): this {
        this[0] = Math.floor(this[0]);
        this[1] = Math.floor(this[1]);
        return this;
    }
    
    public ceil(): this {
        this[0] = Math.ceil(this[0]);
        this[1] = Math.ceil(this[1]);
        return this;
    }
    
    public round(): this {
        this[0] = Math.round(this[0]);
        this[1] = Math.round(this[1]);
        return this;
    }
    
    public min(v2: Vector2): this {
        this[0] = Math.min(this[0], v2[0]);
        this[1] = Math.min(this[1], v2[1]);
        return this;
    }
    
    public max(v2: Vector2): this {
        this[0] = Math.max(this[0], v2[0]);
        this[1] = Math.max(this[1], v2[1]);
        return this;
    }
    
    public scale(s: number): this {
        this[0] *= s;
        this[1] *= s;
        return this;
    }
    
    public distanceSquared(v2: Vector2): number {
        const x = v2[0] - this[0];
        const y = v2[1] - this[1];
        return x * x + y * y;
    }
    
    public distance(v2: Vector2): number {
        const distanceSquared = this.distanceSquared(v2);
        return Math.sqrt(distanceSquared);
    }
    
    public negate(): this {
        this[0] *= -1.0;
        this[1] *= -1.0;
        return this;
    }
    
    public invert(): this {
        this[0] = 1.0 / this[0];
        this[1] = 1.0 / this[1];
        return this;
    }
    
    public normalize(): this {
        const magnitude = this.magnitude;
        this[0] /= magnitude;
        this[1] /= magnitude;
        return this;
    }
    
    public dot(v2: Vector2): number {
        const x = this[0] * v2[0];
        const y = this[1] * v2[1];
        return x + y;
    }
    
    public cross(v2: Vector2): Vector3 {
        const z = this[0] * v2[1] - this[1] * v2[0];
        return Vector3.fromValues(0.0, 0.0, z);
    }
    
    public equals(v2: Vector2): boolean {
        const ax = this[0];
        const ay = this[1];
        const bx = v2[0];
        const by = v2[1];
        return (
            Math.abs(ax - bx) <= Epsilon * Math.max(1.0, Math.abs(ax), Math.abs(bx)) &&
            Math.abs(ay - by) <= Epsilon * Math.max(1.0, Math.abs(ay), Math.abs(by))
        );
    }
    
    public exactEquals(v2: Vector2): boolean {
        return (
            this[0] === v2[0] &&
            this[1] === v2[1]
        );
    }
    
    public transform(m2: Matrix2): this;
    public transform(m2d: Matrix2d): this;
    public transform(m3: Matrix3): this;
    public transform(m4: Matrix4): this;
    public transform(...args: any[]): this {
        const value = args[0];
        if (value.constructor == Matrix2) {
            return this.transformMatrix2(value as Matrix2);
        } else if (value.constructor == Matrix2d) {
            return this.transformMatrix2d(value as Matrix2d);
        } else if (value.constructor == Matrix3) {
            return this.transformMatrix3(value as Matrix3);
        } else if (value.constructor == Matrix4) {
            return this.transformMatrix4(value as Matrix4);
        } else {
            return this;
        }
    }
    
    public transformMatrix2(m2: Matrix2): this {
        const x = this[0];
        const y = this[1];
        this[0] = x * m2[0] + y * m2[2];
        this[1] = x * m2[1] + y * m2[3];
        return this;
    }
    
    public transformMatrix2d(m2d: Matrix2d): this {
        const x = this[0];
        const y = this[1];
        this[0] = x * m2d[0] + y * m2d[2] + m2d[4];
        this[1] = x * m2d[1] + y * m2d[3] + m2d[5];
        return this;
    }
    
    public transformMatrix3(m3: Matrix3): this {
        const x = this[0];
        const y = this[1];
        this[0] = x * m3[0] + y * m3[3] + m3[6];
        this[1] = x * m3[1] + y * m3[4] + m3[7];
        return this;
    }
    
    public transformMatrix4(m4: Matrix4): this {
        const x = this[0];
        const y = this[1];
        this[0] = x * m4[0] + y * m4[4] + m4[12];
        this[1] = x * m4[1] + y * m4[5] + m4[13];
        return this;
    }
    
    public rotate(origin: Vector2, radians: number): this {
        const x = this[0] - origin[0];
        const y = this[1] - origin[1];
        const sine = Math.sin(radians);
        const cosine = Math.cos(radians);
        this[0] = x * cosine - y * sine + origin[0];
        this[1] = x * sine + y * cosine + origin[1];
        return this;
    }
    
    public angle(v2: Vector2): number {
        let thisFactor = this.magnitudeSquared;
        if (thisFactor > 0.0) {
            thisFactor = 1.0 / Math.sqrt(thisFactor);
        }
        let otherFactor = v2.magnitudeSquared;
        if (otherFactor > 0.0) {
            otherFactor = 1.0 / Math.sqrt(otherFactor);
        }
        const cosine = (this[0] * this[1] + v2[0] * v2[1]) * thisFactor * otherFactor;
        if (cosine > 1.0) {
            return 0.0;
        } else if (cosine < -1.0) {
            return Math.PI;
        } else {
            return Math.acos(cosine);
        }
    }
    
}