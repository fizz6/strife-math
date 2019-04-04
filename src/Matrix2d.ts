import { Epsilon } from './index';
import Vector2 from './Vector2';

export default class Matrix2d extends Float32Array {
    
    public static get Identity(): Matrix2d {
        return new Matrix2d();
    }
    
    public static copy(m2d: Matrix2d): Matrix2d {
        return new Matrix2d().copy(m2d);
    }
    
    public static fromValue(value: number): Matrix2d {
        return new Matrix2d().setValue(value);
    }
    
    public static fromValues(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number): Matrix2d {
        return new Matrix2d().setValues(m00, m01, m10, m11, m20, m21);
    }
    
    public static fromTranslation(v2: Vector2): Matrix2d {
        return new Matrix2d().translate(v2);
    }
    
    public static fromRotation(radians: number): Matrix2d {
        return new Matrix2d().rotate(radians);
    }
    
    public static fromScaling(v2: Vector2): Matrix2d {
        return new Matrix2d().scale(v2);
    }
    
    public get determinant(): number {
        return this[0] * this[3] - this[2] * this[1];
    }
    
    public get frobenius(): number {
        return Math.hypot(this[0], this[1], this[2], this[3], this[4], this[5], 1.0);
    }
    
    public get inverted(): Matrix2d {
        return new Matrix2d(this).invert();
    }
    
    public constructor();
    public constructor(m2d: Matrix2d);
    public constructor(array: Float32Array);
    public constructor(value: number);
    public constructor(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number);
    public constructor(...args: any[]) {
        super(6);
        
        if (args.length == 0) {
            this[0] = 1.0;
            this[3] = 1.0;
            return;
        } else if (args.length == 1) {
            const value = args[0];
            if (value.constructor == Float32Array) {
                this.copy(value);
            } else if (value.constructor == Matrix2d) {
                this.copy(value);
            } else if (typeof(value) == "number") {
                this.setValue(value);
            }
        } else if (args.length == 6) {
            const m00 = args[0];
            const m01 = args[1];
            const m10 = args[2];
            const m11 = args[3];
            const m20 = args[4];
            const m21 = args[5];
            if (typeof(m00) == "number" && typeof(m01) == "number" && typeof(m10) == "number" && typeof(m11) == "number" && typeof(m20) == "number" && typeof(m21) == "number") {
                this.setValues(m00, m01, m10, m11, m20, m21);
            }
        }
    }
    
    public copy(m2d: Matrix2d): this {
        this.set(m2d);
        return this;
    }
    
    public setValue(value: number): this {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        this[3] = value;
        this[4] = value;
        this[5] = value;
        return this;
    }
    
    public setValues(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number): this {
        this[0] = m00;
        this[1] = m01;
        this[2] = m10;
        this[3] = m11;
        this[4] = m20;
        this[5] = m21;
        return this;
    }
    
    public add(m2d: Matrix2d): this {
        this[0] += m2d[0];
        this[1] += m2d[1];
        this[2] += m2d[2];
        this[3] += m2d[3];
        this[4] += m2d[4];
        this[5] += m2d[5];
        return this;
    }
    
    public subtract(m2d: Matrix2d): this {
        this[0] -= m2d[0];
        this[1] -= m2d[1];
        this[2] -= m2d[2];
        this[3] -= m2d[3];
        this[4] -= m2d[4];
        this[5] -= m2d[5];
        return this;
    }
    
    public multiply(m2d: Matrix2d): this;
    public multiply(s: number) : this;
    public multiply(...args: any[]): this {
        const value = args[0];
        if (value.constructor == Matrix2d) {
            return this.multiplyMatrix2d(value);
        } else if (typeof(value) == "number") {
            return this.multiplyScalar(value);
        }
        return this;
    }
    
    public multiplyMatrix2d(m2d: Matrix2d): this {
        const a00 = this[0];
        const a01 = this[1];
        const a10 = this[2];
        const a11 = this[3];
        const a20 = this[4];
        const a21 = this[5];
        const b00 = m2d[0];
        const b01 = m2d[1];
        const b10 = m2d[2];
        const b11 = m2d[3];
        const b20 = m2d[4];
        const b21 = m2d[5];
        this[0] = a00 * b00 + a10 * b01;
        this[1] = a01 * b00 + a11 * b01;
        this[2] = a00 * b10 + a10 * b11;
        this[3] = a01 * b10 + a11 * b11;
        this[4] = a00 * b20 + a10 * b21 + a20;
        this[5] = a01 * b20 + a11 * b21 + a21;
        return this;
    }
    
    public multiplyScalar(s: number): this {
        this[0] *= s;
        this[1] *= s;
        this[2] *= s;
        this[3] *= s;
        this[4] *= s;
        this[5] *= s;
        return this;
    }
    
    public equals(m2d: Matrix2d): boolean {
        const a00 = this[0];
        const a01 = this[1];
        const a10 = this[2];
        const a11 = this[3];
        const a20 = this[4];
        const a21 = this[5];
        const b00 = m2d[0];
        const b01 = m2d[1];
        const b10 = m2d[2];
        const b11 = m2d[3];
        const b20 = m2d[4];
        const b21 = m2d[5];
        return (
            Math.abs(a00 - b00) <= Epsilon * Math.max(1.0, Math.abs(a00), Math.abs(b00)) &&
            Math.abs(a01 - b01) <= Epsilon * Math.max(1.0, Math.abs(a01), Math.abs(b01)) &&
            Math.abs(a10 - b10) <= Epsilon * Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= Epsilon * Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a20 - b20) <= Epsilon * Math.max(1.0, Math.abs(a20), Math.abs(b20)) &&
            Math.abs(a21 - b21) <= Epsilon * Math.max(1.0, Math.abs(a21), Math.abs(b21))
        );
    }
    
    public exactEquals(m2d: Matrix2d): boolean {
        return (
            this[0] === m2d[0] &&
            this[1] === m2d[1] &&
            this[2] === m2d[2] &&
            this[3] === m2d[3] &&
            this[4] === m2d[4] &&
            this[5] === m2d[5]
        );
    }
    
    public translate(v2: Vector2): this {
        const x = v2[0];
        const y = v2[1];
        this[4] = x * this[0] + y * this[2] + this[4];
        this[5] = x * this[1] + y * this[3] + this[5];
        return this;
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
    
    public invert(): this {
        const m00 = this[0];
        const m01 = this[1];
        const m10 = this[2];
        const m11 = this[3];
        const m20 = this[4];
        const m21 = this[5];
        let factor = this.determinant;
        if (factor != 0.0) {
            factor = 1.0 / factor;
            this[0] = m11 * factor;
            this[1] = -m01 * factor;
            this[2] = -m10 * factor;
            this[3] = m00 * factor;
            this[4] = (m10 * m21 - m11 * m20) * factor;
            this[5] = (m01 * m20 - m00 * m21) * factor;
        }
        return this;
    }
    
}