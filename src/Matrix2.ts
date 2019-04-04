import { Epsilon } from './index';
import Vector2 from './Vector2';
import Matrix2d from './Matrix2d';
import Matrix3 from './Matrix3';
import Matrix4 from './Matrix4';

export default class Matrix2 extends Float32Array {
    
    public static get Identity(): Matrix2 {
        return new Matrix2();
    }
    
    public static copy(m2: Matrix2): Matrix2 {
        return new Matrix2().copy(m2);
    }
    
    public static fromValue(value: number): Matrix2 {
        return new Matrix2().setValue(value);
    }
    
    public static fromValues(m00: number, m01: number, m10: number, m11: number): Matrix2 {
        return new Matrix2().setValues(m00, m01, m10, m11);
    }
    
    public static fromRotation(radians: number): Matrix2 {
        return new Matrix2().rotate(radians);
    }
    
    public static fromScaling(v2: Vector2): Matrix2 {
        return new Matrix2().scale(v2);
    }
    
    public get determinant(): number {
        return this[0] * this[3] - this[2] * this[1];
    }
    
    public get frobenius(): number {
        return Math.hypot(this[0], this[1], this[2], this[3]);
    }
    
    public get transposed(): Matrix2 {
        return new Matrix2(this).transpose();
    }
    
    public get adjugated(): Matrix2 {
        return new Matrix2(this).adjugate();
    }
    
    public get inverted(): Matrix2 {
        return new Matrix2(this).invert();
    }
    
    public get LDU(): Matrix2[] {
        const m00 = this[0];
        const m01 = this[1];
        const m10 = this[2];
        const m11 = this[3];
        const L = new Matrix2();
        const D = new Matrix2();
        const U = new Matrix2();
        L[2] = m10 / m00;
        U[0] = m00;
        U[1] = m01;
        U[3] = m11 - L[2] * U[1];
        return [ L, D, U ];
    }
    
    public constructor();
    public constructor(m2: Matrix2);
    public constructor(m2d: Matrix2d);
    public constructor(m3: Matrix3);
    public constructor(array: Float32Array);
    public constructor(value: number);
    public constructor(m00: number, m01: number, m10: number, m11: number);
    public constructor(...args: any[]) {
        super(4);
        
        if (args.length == 0) {
            this[0] = 1.0;
            this[3] = 1.0;
            return;
        } else if (args.length == 1) {
            const value = args[0];
            if (value.constructor == Float32Array) {
                this.copy(value);
            } else if (value.constructor == Matrix2) {
                this.copy(value);
            } else if (typeof(value) == "number") {
                this.setValue(value);
            }
        } else if (args.length == 4) {
            const m00 = args[0];
            const m01 = args[1];
            const m10 = args[2];
            const m11 = args[3];
            if (typeof(m00) == "number" && typeof(m01) == "number" && typeof(m10) == "number" && typeof(m11) == "number") {
                this.setValues(m00, m01, m10, m11);
            }
        }
    }
    
    public copy(m2: Matrix2): this {
        this.set(m2);
        return this;
    }
    
    public setValue(value: number): this {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        this[3] = value;
        return this;
    }
    
    public setValues(m00: number, m01: number, m10: number, m11: number): this {
        this[0] = m00;
        this[1] = m01;
        this[2] = m10;
        this[3] = m11;
        return this;
    }
    
    public add(m2: Matrix2): this {
        this[0] += m2[0];
        this[1] += m2[1];
        this[2] += m2[2];
        this[3] += m2[3];
        return this;
    }
    
    public subtract(m2: Matrix2): this {
        this[0] -= m2[0];
        this[1] -= m2[1];
        this[2] -= m2[2];
        this[3] -= m2[3];
        return this;
    }
    
    public multiply(m2: Matrix2): this;
    public multiply(s: number) : this;
    public multiply(...args: any[]): this {
        const value = args[0];
        if (value.constructor == Matrix2) {
            return this.multiplyMatrix2(value);
        } else if (typeof(value) == "number") {
            return this.multiplyScalar(value);
        }
        return this;
    }
    
    public multiplyMatrix2(m2: Matrix2): this {
        const a00 = this[0];
        const a01 = this[1];
        const a10 = this[2];
        const a11 = this[3];
        const b00 = m2[0];
        const b01 = m2[1];
        const b10 = m2[2];
        const b11 = m2[3];
        this[0] = a00 * b00 + a10 * b01;
        this[1] = a01 * b00 + a11 * b01;
        this[2] = a00 * b10 + a10 * b11
        this[3] = a01 * b10 + a11 * b11
        return this;
    }
    
    public multiplyScalar(s: number): this {
        this[0] *= s;
        this[1] *= s;
        this[2] *= s;
        this[3] *= s;
        return this;
    }
    
    public equals(m2: Matrix2): boolean {
        const a00 = this[0];
        const a01 = this[1];
        const a10 = this[2];
        const a11 = this[3];
        const b00 = m2[0];
        const b01 = m2[1];
        const b10 = m2[2];
        const b11 = m2[3];
        return (
            Math.abs(a00 - b00) <= Epsilon * Math.max(1.0, Math.abs(a00), Math.abs(b00)) &&
            Math.abs(a01 - b01) <= Epsilon * Math.max(1.0, Math.abs(a01), Math.abs(b01)) &&
            Math.abs(a10 - b10) <= Epsilon * Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= Epsilon * Math.max(1.0, Math.abs(a11), Math.abs(b11))
        );
    }
    
    public exactEquals(m2: Matrix2): boolean {
        return (
            this[0] === m2[0] &&
            this[1] === m2[1] &&
            this[2] === m2[2] &&
            this[3] === m2[3]
        );
    }
    
    public rotate(radians: number): this {
        const m00 = this[0];
        const m01 = this[1];
        const m10 = this[2];
        const m11 = this[3];
        const sine = Math.sin(radians);
        const cosine = Math.cos(radians);
        this[0] = m00 * cosine + m10 * sine;
        this[1] = m01 * cosine + m11 * sine;
        this[2] = m00 * -sine + m10 * cosine;
        this[3] = m01 * -sine + m11 * cosine;
        return this;
    }
    
    public scale(v2: Vector2): this {
        const x = v2[0];
        const y = v2[1];
        this[0] *= x;
        this[1] *= x;
        this[2] *= y;
        this[3] *= y;
        return this;
    }
    
    public transpose(): this {
        const m01 = this[1];
        this[1] = this[2];
        this[2] = m01;
        return this;
    }
    
    public adjugate(): this {
        const m00 = this[0];
        this[0] = this[3];
        this[1] = -this[1];
        this[2] = -this[2];
        this[3] = m00;
        return this;
    }
    
    public invert(): this {
        const m00 = this[0];
        const m01 = this[1];
        const m10 = this[2];
        const m11 = this[3];
        let factor = this.determinant;
        if (factor != 0.0) {
            factor = 1.0 / factor;
            this[0] = m11 * factor;
            this[1] = -m01 * factor;
            this[2] = -m10 * factor;
            this[3] = m00 * factor;
        }
        return this;
    }
    
}