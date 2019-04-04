import { Epsilon } from './index';
import Vector2 from './Vector2';
import Matrix4 from './Matrix4';
import Quaternion from './Quaternion';

export default class Matrix3 extends Float32Array {
    
    public static get Identity(): Matrix3 {
        return new Matrix3();
    }
    
    public static copy(m3: Matrix3): Matrix3 {
        return new Matrix3().copy(m3);
    }
    
    public static fromValue(value: number): Matrix3 {
        return new Matrix3().setValue(value);
    }
    
    public static fromValues(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): Matrix3 {
        return new Matrix3().setValues(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    }
    
    public static fromTranslation(v2: Vector2): Matrix3 {
        return new Matrix3().translate(v2);
    }
    
    public static fromRotation(radians: number): Matrix3 {
        return new Matrix3().rotate(radians);
    }
    
    public static fromScaling(v2: Vector2): Matrix3 {
        return new Matrix3().scale(v2);
    }
    
    public static fromQuaternion(q: Quaternion): Matrix3 {
        return new Matrix3().setQuaternion(q);
    }
    
    public static projection(width: number, height: number): Matrix3 {
        const m3 = new Matrix3();
        m3[0] = 2.0 / width;
        m3[4] = -2.0 / height;
        m3[6] = -1.0;
        m3[7] = 1.0;
        return m3;
    }
    
    public static normalFromMatrix4(m4: Matrix4): Matrix3 {
        const m3 = new Matrix3();
        // TODO: Implement this...
        return m3;
    }
    
    public get determinant(): number {
        const m00 = this[0];
        const m01 = this[1];
        const m02 = this[2];
        const m10 = this[3];
        const m11 = this[4];
        const m12 = this[5];
        const m20 = this[6];
        const m21 = this[7];
        const m22 = this[8];
        return m00 * (m22 * m11 - m12 * m21) + m01 * (-m22 * m10 + m12 * m20) + m02 * (m21 * m10 - m11 * m20);
    }
    
    public get frobenius(): number {
        return Math.hypot(this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]);
    }
    
    public get transposed(): Matrix3 {
        return new Matrix3(this).transpose();
    }
    
    public get adjugated(): Matrix3 {
        return new Matrix3(this).adjugate();
    }
    
    public get inverted(): Matrix3 {
        return new Matrix3(this).invert();
    }
    
    public constructor();
    public constructor(m3: Matrix3);
    public constructor(array: Float32Array);
    public constructor(value: number);
    public constructor(m00: number, m01: number, m02: number,  m10: number, m11: number, m12: number, m20: number, m21: number, m22: number);
    public constructor(...args: any[]) {
        super(9);
        
        if (args.length == 0) {
            this[0] = 1.0;
            this[4] = 1.0;
            this[8] = 1.0;
            return;
        } else if (args.length == 1) {
            const value = args[0];
            if (value.constructor == Float32Array) {
                this.copy(value);
            } else if (value.constructor == Matrix3) {
                this.copy(value);
            } else if (value.constructor == Quaternion) {
                this.setQuaternion(value);
            } else if (typeof(value) == "number") {
                this.setValue(value);
            }
        } else if (args.length == 9) {
            const m00 = args[0];
            const m01 = args[1];
            const m02 = args[2]
            const m10 = args[3];
            const m11 = args[4];
            const m12 = args[5];
            const m20 = args[6];
            const m21 = args[7];
            const m22 = args[8];
            if (typeof(m00) == "number" && typeof(m01) == "number" && typeof(m02) == "number" && typeof(m10) == "number" && typeof(m11) == "number" && typeof(m12) == "number" && typeof(m20) == "number" && typeof(m21) == "number" && typeof(m22) == "number") {
                this.setValues(m00, m01, m02, m10, m11, m12, m20, m21, m22);
            }
        }
    }
    
    public copy(m3: Matrix3): this {
        this.set(m3);
        return this;
    }
    
    public setValue(value: number): this {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        this[3] = value;
        this[4] = value;
        this[5] = value;
        this[6] = value;
        this[7] = value;
        this[8] = value;
        return this;
    }
    
    public setValues(m00: number, m01: number, m02: number,  m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): this {
        this[0] = m00;
        this[1] = m01;
        this[2] = m02;
        this[3] = m10;
        this[4] = m11;
        this[5] = m12;
        this[6] = m20;
        this[7] = m21;
        this[8] = m22;
        return this;
    }
    
    public setQuaternion(q: Quaternion): this {
        const x = q[0];
        const y = q[1];
        const z = q[2];
        const w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        this[0] = 1.0 - yy - zz;
        this[1] = yx + wz;
        this[2] = zx - wy;
        this[3] = yx - wz;
        this[4] = 1.0 - xx - zz;
        this[5] = zy + wx;
        this[6] = zx + wy;
        this[7] = zy - wx;
        this[8] = 1.0 - xx - yy;
        return this;
    }
    
    public add(m3: Matrix3): this {
        this[0] += m3[0];
        this[1] += m3[1];
        this[2] += m3[2];
        this[3] += m3[3];
        this[4] += m3[4];
        this[5] += m3[5];
        this[6] += m3[6];
        this[7] += m3[7];
        this[8] += m3[8];
        return this;
    }
    
    public subtract(m3: Matrix3): this {
        this[0] -= m3[0];
        this[1] -= m3[1];
        this[2] -= m3[2];
        this[3] -= m3[3];
        this[4] -= m3[4];
        this[5] -= m3[5];
        this[6] -= m3[6];
        this[7] -= m3[7];
        this[8] -= m3[8];
        return this;
    }
    
    public multiply(m3: Matrix3): this;
    public multiply(s: number) : this;
    public multiply(...args: any[]): this {
        const value = args[0];
        if (value.constructor == Matrix3) {
            return this.multiplyMatrix3(value);
        } else if (typeof(value) == "number") {
            return this.multiplyScalar(value);
        }
        return this;
    }
    
    public multiplyMatrix3(m3: Matrix3): this {
        const a00 = this[0];
        const a01 = this[1];
        const a02 = this[2];
        const a10 = this[3];
        const a11 = this[4];
        const a12 = this[5];
        const a20 = this[6];
        const a21 = this[7];
        const a22 = this[8];
        const b00 = m3[0];
        const b01 = m3[1];
        const b02 = m3[2];
        const b10 = m3[3];
        const b11 = m3[4];
        const b12 = m3[5];
        const b20 = m3[6];
        const b21 = m3[7];
        const b22 = m3[8];
        this[0] = b00 * a00 + b01 * a10 + b02 * a20;
        this[1] = b00 * a01 + b01 * a11 + b02 * a21;
        this[2] = b00 * a02 + b01 * a12 + b02 * a22;
        this[3] = b10 * a00 + b11 * a10 + b12 * a20;
        this[4] = b10 * a01 + b11 * a11 + b12 * a21;
        this[5] = b10 * a02 + b11 * a12 + b12 * a22;
        this[6] = b20 * a00 + b21 * a10 + b22 * a20;
        this[7] = b20 * a01 + b21 * a11 + b22 * a21;
        this[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return this;
    }
    
    public multiplyScalar(s: number): this {
        this[0] *= s;
        this[1] *= s;
        this[2] *= s;
        this[3] *= s;
        this[4] *= s;
        this[5] *= s;
        this[6] *= s;
        this[7] *= s;
        this[8] *= s;
        return this;
    }
    
    public equals(m3: Matrix3): boolean {
        const a00 = this[0];
        const a01 = this[1];
        const a02 = this[2];
        const a10 = this[3];
        const a11 = this[4];
        const a12 = this[5];
        const a20 = this[6];
        const a21 = this[7];
        const a22 = this[8];
        const b00 = m3[0];
        const b01 = m3[1];
        const b02 = m3[2];
        const b10 = m3[3];
        const b11 = m3[4];
        const b12 = m3[5];
        const b20 = m3[6];
        const b21 = m3[7];
        const b22 = m3[8];
        return (
            Math.abs(a00 - b00) <= Epsilon * Math.max(1.0, Math.abs(a00), Math.abs(b00)) &&
            Math.abs(a01 - b01) <= Epsilon * Math.max(1.0, Math.abs(a01), Math.abs(b01)) &&
            Math.abs(a02 - b02) <= Epsilon * Math.max(1.0, Math.abs(a02), Math.abs(b02)) &&
            Math.abs(a10 - b10) <= Epsilon * Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= Epsilon * Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a12 - b12) <= Epsilon * Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
            Math.abs(a20 - b20) <= Epsilon * Math.max(1.0, Math.abs(a20), Math.abs(b20)) &&
            Math.abs(a21 - b21) <= Epsilon * Math.max(1.0, Math.abs(a21), Math.abs(b21)) &&
            Math.abs(a22 - b22) <= Epsilon * Math.max(1.0, Math.abs(a22), Math.abs(b22))
        );
    }
    
    public exactEquals(m3: Matrix3): boolean {
        return (
            this[0] === m3[0] &&
            this[1] === m3[1] &&
            this[2] === m3[2] &&
            this[3] === m3[3] &&
            this[4] === m3[4] &&
            this[5] === m3[5] &&
            this[6] === m3[6] &&
            this[7] === m3[7] &&
            this[8] === m3[8]
        );
    }
    
    public translate(v2: Vector2): this {
        const x = v2[0];
        const y = v2[1];
        this[6] = x * this[0] + y * this[3] + this[6];
        this[7] = x * this[1] + y * this[4] + this[7];
        this[8] = x * this[2] + y * this[5] + this[8];
        return this;
    }
    
    public rotate(radians: number): this {
        const m00 = this[0];
        const m01 = this[1];
        const m02 = this[2];
        const m10 = this[3];
        const m11 = this[4];
        const m12 = this[5];
        const sine = Math.sin(radians);
        const cosine = Math.cos(radians);
        this[0] = m00 * cosine + m10 * sine;
        this[1] = m01 * cosine + m11 * sine;
        this[2] = m02 * cosine + m12 * sine;
        this[3] = m10 * cosine - m00 * sine;
        this[4] = m11 * cosine - m01 * sine;
        this[5] = m12 * cosine - m02 * sine;
        return this;
    }
    
    public scale(v2: Vector2): this {
        const x = v2[0];
        const y = v2[1];
        this[0] *= x;
        this[1] *= x;
        this[2] *= x;
        this[3] *= y;
        this[4] *= y;
        this[5] *= y;
        return this;
    }
    
    public transpose(): this {
        const m01 = this[1];
        const m02 = this[2];
        const m12 = this[5];
        this[1] = this[3];
        this[2] = this[6];
        this[3] = m01;
        this[5] = this[7];
        this[6] = m02;
        this[7] = m12;
        return this;
    }
    
    public adjugate(): this {
        const m00 = this[0];
        const m01 = this[1];
        const m02 = this[2];
        const m10 = this[3];
        const m11 = this[4];
        const m12 = this[5];
        const m20 = this[6];
        const m21 = this[7];
        const m22 = this[8];
        this[0] = m11 * m22 - m12 * m21;
        this[1] = m02 * m21 - m02 * m22;
        this[2] = m01 * m12 - m02 * m11;
        this[3] = m12 * m20 - m10 * m22;
        this[4] = m00 * m22 - m02 * m20;
        this[5] = m02 * m10 - m00 * m12;
        this[6] = m10 * m21 - m11 * m20;
        this[7] = m01 * m20 - m00 * m21;
        this[8] = m00 * m11 - m01 * m10;
        return this;
    }
    
    public invert(): this {
        const m00 = this[0];
        const m01 = this[1];
        const m02 = this[2];
        const m10 = this[3];
        const m11 = this[4];
        const m12 = this[5];
        const m20 = this[6];
        const m21 = this[7];
        const m22 = this[8];
        const b0 = m22 * m11 - m12 * m21;
        const b1 = -m22 * m10 + m12 * m20;
        const b2 = m21 * m10 - m11 * m20;
        let factor = m00 * m01 + m01 * m11 + m02 * m21;
        if (factor != 0.0) {
            factor = 1.0 / factor;
            this[0] = b0 * factor;
            this[1] = (-m22 * m01 + m02 * m21) * factor;
            this[2] = (m12 * m01 - m02 * m11) * factor;
            this[3] = b1 * factor;
            this[4] = (m22 * m00 - m02 * m20) * factor;
            this[5] = (-m12 * m00 + m02 * m10) * factor;
            this[6] = b2 * factor;
            this[7] = (-m21 * m00 + m01 * m20) * factor;
            this[8] = (m11 * m00 - m01 * m10) * factor;
        }
        return this;
    }
    
}