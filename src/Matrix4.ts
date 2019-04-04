import { Epsilon } from './index';
import Vector3 from './Vector3';
import Quaternion from './Quaternion';

export default class Matrix4 extends Float32Array {
    
    public static get Identity(): Matrix4 {
        return new Matrix4();
    }
    
    public static copy(m4: Matrix4): Matrix4 {
        return new Matrix4().copy(m4);
    }
    
    public static fromValue(value: number): Matrix4 {
        return new Matrix4().setValue(value);
    }
    
    public static fromValues(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): Matrix4 {
        return new Matrix4().setValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    }
    
    public static fromTranslation(v3: Vector3): Matrix4 {
        return new Matrix4().translate(v3);
    }
    
    public static fromRotation(radians: number): Matrix4 {
        return new Matrix4().rotate(radians);
    }
    
    public static fromScaling(v3: Vector3): Matrix4 {
        return new Matrix4().scale(v3);
    }
    
    // public static projection(width: number, height: number): Matrix4 {
    //     const m4 = new Matrix4();
    //     m4[0] = 2.0 / width;
    //     m4[4] = -2.0 / height;
    //     m4[6] = -1.0;
    //     m4[7] = 1.0;
    //     return m4;
    // }
    
    public get determinant(): number {
        const m00 = this[0];
        const m01 = this[1];
        const m02 = this[2]
        const m03 = this[3]
        const m10 = this[4];
        const m11 = this[5];
        const m12 = this[6];
        const m13 = this[7];
        const m20 = this[8];
        const m21 = this[9];
        const m22 = this[10];
        const m23 = this[11];
        const m30 = this[12];
        const m31 = this[13];
        const m32 = this[14];
        const m33 = this[15];
        const b00 = m00 * m11 - m01 * m10;
        const b01 = m00 * m12 - m02 * m10;
        const b02 = m00 * m13 - m03 * m10;
        const b03 = m01 * m12 - m02 * m11;
        const b04 = m01 * m13 - m03 * m11;
        const b05 = m02 * m13 - m03 * m12;
        const b06 = m20 * m31 - m21 * m30;
        const b07 = m20 * m32 - m22 * m30;
        const b08 = m20 * m33 - m23 * m30;
        const b09 = m21 * m32 - m22 * m31;
        const b10 = m21 * m33 - m23 * m31;
        const b11 = m22 * m33 - m23 * m32;
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }
    
    public get frobenius(): number {
        return Math.hypot(this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]);
    }
    
    public get transposed(): Matrix4 {
        return new Matrix4(this).transpose();
    }
    
    public get adjugated(): Matrix4 {
        return new Matrix4(this).adjugate();
    }
    
    public get inverted(): Matrix4 {
        return new Matrix4(this).invert();
    }
    
    public constructor();
    public constructor(m4: Matrix4);
    public constructor(array: Float32Array);
    public constructor(value: number);
    public constructor(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number);
    public constructor(...args: any[]) {
        super(16);
        
        if (args.length == 0) {
            this[0] = 1.0;
            this[5] = 1.0;
            this[10] = 1.0;
            this[15] = 1.0;
            return;
        } else if (args.length == 1) {
            const value = args[0];
            if (value.constructor == Float32Array) {
                this.copy(value);
            } else if (value.constructor == Matrix4) {
                this.copy(value);
            } else if (value.constructor == Quaternion) {
                // TODO: Implement this... better...
                const m4 = Matrix4.fromQuaternion(value);
                this.copy(m4);
            } else if (typeof(value) == "number") {
                this.setValue(value);
            }
        } else if (args.length == 16) {
            const m00 = args[0];
            const m01 = args[1];
            const m02 = args[2]
            const m03 = args[3]
            const m10 = args[4];
            const m11 = args[5];
            const m12 = args[6];
            const m13 = args[7];
            const m20 = args[8];
            const m21 = args[9];
            const m22 = args[10];
            const m23 = args[11];
            const m30 = args[12];
            const m31 = args[13];
            const m32 = args[14];
            const m33 = args[15];
            if (typeof(m00) == "number" && typeof(m01) == "number" && typeof(m02) == "number" && typeof(m03) == "number" && typeof(m10) == "number" && typeof(m11) == "number" && typeof(m12) == "number" && typeof(m13) == "number" && typeof(m20) == "number" && typeof(m21) == "number" && typeof(m22) == "number" && typeof(m23) == "number" && typeof(m30) == "number" && typeof(m31) == "number" && typeof(m32) == "number" && typeof(m33) == "number") {
                this.setValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
            }
        }
    }
    
    public copy(m4: Matrix4): this {
        this.set(m4);
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
        this[9] = value;
        this[10] = value;
        this[11] = value;
        this[12] = value;
        this[13] = value;
        this[14] = value;
        this[15] = value;
        return this;
    }
    
    public setValues(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): this {
        this[0] = m00;
        this[1] = m01;
        this[2] = m02;
        this[3] = m03;
        this[4] = m10;
        this[5] = m11;
        this[6] = m12;
        this[7] = m13;
        this[8] = m20;
        this[9] = m21;
        this[10] = m22;
        this[11] = m23;
        this[12] = m30;
        this[13] = m31;
        this[14] = m32;
        this[15] = m33;
        return this;
    }
    
    public add(m4: Matrix4): this {
        this[0] += m4[0];
        this[1] += m4[1];
        this[2] += m4[2];
        this[3] += m4[3];
        this[4] += m4[4];
        this[5] += m4[5];
        this[6] += m4[6];
        this[7] += m4[7];
        this[8] += m4[8];
        this[9] += m4[9];
        this[10] += m4[10];
        this[11] += m4[11];
        this[12] += m4[12];
        this[13] += m4[13];
        this[14] += m4[14];
        this[15] += m4[15];
        return this;
    }
    
    public subtract(m4: Matrix4): this {
        this[0] -= m4[0];
        this[1] -= m4[1];
        this[2] -= m4[2];
        this[3] -= m4[3];
        this[4] -= m4[4];
        this[5] -= m4[5];
        this[6] -= m4[6];
        this[7] -= m4[7];
        this[8] -= m4[8];
        this[9] -= m4[9];
        this[10] -= m4[10];
        this[11] -= m4[11];
        this[12] -= m4[12];
        this[13] -= m4[13];
        this[14] -= m4[14];
        this[15] -= m4[15];
        return this;
    }
    
    public multiply(m4: Matrix4): this;
    public multiply(s: number) : this;
    public multiply(...args: any[]): this {
        const value = args[0];
        if (value.constructor == Matrix4) {
            return this.multiplyMatrix4(value);
        } else if (typeof(value) == "number") {
            return this.multiplyScalar(value);
        }
        return this;
    }
    
    public multiplyMatrix4(m4: Matrix4): this {
        const a00 = this[0];
        const a01 = this[1];
        const a02 = this[2];
        const a03 = this[3];
        const a10 = this[4];
        const a11 = this[5];
        const a12 = this[6];
        const a13 = this[7];
        const a20 = this[8];
        const a21 = this[9];
        const a22 = this[10];
        const a23 = this[11];
        const a30 = this[12];
        const a31 = this[13];
        const a32 = this[14];
        const a33 = this[15]
        const b00 = m4[0];
        const b01 = m4[1];
        const b02 = m4[2];
        const b03 = m4[3];
        const b10 = m4[4];
        const b11 = m4[5];
        const b12 = m4[6];
        const b13 = m4[7];
        const b20 = m4[8];
        const b21 = m4[9];
        const b22 = m4[10];
        const b23 = m4[11];
        const b30 = m4[12];
        const b31 = m4[13];
        const b32 = m4[14];
        const b33 = m4[15]
        this[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        this[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        this[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        this[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        this[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        this[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        this[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        this[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        this[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        this[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        this[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        this[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        this[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        this[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        this[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        this[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
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
        this[9] *= s;
        this[10] *= s;
        this[11] *= s;
        this[12] *= s;
        this[13] *= s;
        this[14] *= s;
        this[15] *= s;
        return this;
    }
    
    public equals(m4: Matrix4): boolean {
        const a00 = this[0];
        const a01 = this[1];
        const a02 = this[2];
        const a03 = this[3];
        const a10 = this[4];
        const a11 = this[5];
        const a12 = this[6];
        const a13 = this[7];
        const a20 = this[8];
        const a21 = this[9];
        const a22 = this[10];
        const a23 = this[11];
        const a30 = this[12];
        const a31 = this[13];
        const a32 = this[14];
        const a33 = this[15]
        const b00 = m4[0];
        const b01 = m4[1];
        const b02 = m4[2];
        const b03 = m4[3];
        const b10 = m4[4];
        const b11 = m4[5];
        const b12 = m4[6];
        const b13 = m4[7];
        const b20 = m4[8];
        const b21 = m4[9];
        const b22 = m4[10];
        const b23 = m4[11];
        const b30 = m4[12];
        const b31 = m4[13];
        const b32 = m4[14];
        const b33 = m4[15]
        return (
            Math.abs(a00 - b00) <= Epsilon * Math.max(1.0, Math.abs(a00), Math.abs(b00)) &&
            Math.abs(a01 - b01) <= Epsilon * Math.max(1.0, Math.abs(a01), Math.abs(b01)) &&
            Math.abs(a02 - b02) <= Epsilon * Math.max(1.0, Math.abs(a02), Math.abs(b02)) &&
            Math.abs(a03 - b03) <= Epsilon * Math.max(1.0, Math.abs(a03), Math.abs(b03)) &&
            Math.abs(a10 - b10) <= Epsilon * Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= Epsilon * Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a12 - b12) <= Epsilon * Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
            Math.abs(a13 - b13) <= Epsilon * Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
            Math.abs(a20 - b20) <= Epsilon * Math.max(1.0, Math.abs(a20), Math.abs(b20)) &&
            Math.abs(a21 - b21) <= Epsilon * Math.max(1.0, Math.abs(a21), Math.abs(b21)) &&
            Math.abs(a22 - b22) <= Epsilon * Math.max(1.0, Math.abs(a22), Math.abs(b22)) &&
            Math.abs(a23 - b23) <= Epsilon * Math.max(1.0, Math.abs(a23), Math.abs(b23)) &&
            Math.abs(a30 - b30) <= Epsilon * Math.max(1.0, Math.abs(a30), Math.abs(b30)) &&
            Math.abs(a31 - b31) <= Epsilon * Math.max(1.0, Math.abs(a31), Math.abs(b31)) &&
            Math.abs(a32 - b32) <= Epsilon * Math.max(1.0, Math.abs(a32), Math.abs(b32)) &&
            Math.abs(a33 - b33) <= Epsilon * Math.max(1.0, Math.abs(a33), Math.abs(b33))
        );
    }
    
    public exactEquals(m4: Matrix4): boolean {
        return (
            this[0] === m4[0] &&
            this[1] === m4[1] &&
            this[2] === m4[2] &&
            this[3] === m4[3] &&
            this[4] === m4[4] &&
            this[5] === m4[5] &&
            this[6] === m4[6] &&
            this[7] === m4[7] &&
            this[8] === m4[8] &&
            this[9] === m4[9] &&
            this[10] === m4[10] &&
            this[11] === m4[11] &&
            this[12] === m4[12] &&
            this[13] === m4[13] &&
            this[14] === m4[14] &&
            this[15] === m4[15]
        );
    }
    
    public translate(v3: Vector3): this {
        const x = v3[0];
        const y = v3[1];
        const z = v3[2];
        this[12] = x * this[0] + y * this[4] + z * this[8] + this[12];
        this[13] = x * this[1] + y * this[5] + z * this[9] + this[13];
        this[14] = x * this[2] + y * this[6] + z * this[10] + this[14];
        this[15] = x * this[3] + y * this[7] + z * this[11] + this[15];
        return this;
    }
    
    public rotate(axis: Vector3, radians: number): this {
        // TODO: Implement this...
        return this;
    }
    
    public scale(v3: Vector3): this {
        const x = v3[0];
        const y = v3[1];
        const z = v3[2];
        this[0] *= x;
        this[1] *= x;
        this[2] *= x;
        this[3] *= x;
        this[4] *= y;
        this[5] *= y;
        this[6] *= y;
        this[7] *= y;
        this[8] *= z;
        this[9] *= z;
        this[10] *= z;
        this[11] *= z;
        return this;
    }
    
    public transpose(): this {
        const m01 = this[1];
        const m02 = this[2];
        const m03 = this[3];
        const m12 = this[6];
        const m13 = this[7];
        const m23 = this[11];
        this[1] = this[4];
        this[2] = this[8];
        this[3] = this[12];
        this[4] = m01;
        this[6] = this[9];
        this[7] = this[13];
        this[8] = m02;
        this[9] = m12;
        this[11] = this[14];
        this[12] = m03;
        this[13] = m13;
        this[14] = m23;
        return this;
    }
    
    public adjugate(): this {
        const m00 = this[0];
        const m01 = this[1];
        const m02 = this[2]
        const m03 = this[3]
        const m10 = this[4];
        const m11 = this[5];
        const m12 = this[6];
        const m13 = this[7];
        const m20 = this[8];
        const m21 = this[9];
        const m22 = this[10];
        const m23 = this[11];
        const m30 = this[12];
        const m31 = this[13];
        const m32 = this[14];
        const m33 = this[15];
        this[0] = (m11 * (m22 * m33 - m23 * m32) - m21 * (m12 * m33 - m13 * m32) + m31 * (m12 * m23 - m13 * m22));
        this[1] = -(m01 * (m22 * m33 - m23 * m32) - m21 * (m02 * m33 - m03 * m32) + m31 * (m02 * m23 - m03 * m22));
        this[2] = (m01 * (m12 * m33 - m13 * m32) - m11 * (m02 * m33 - m03 * m32) + m31 * (m02 * m13 - m03 * m12));
        this[3] = -(m01 * (m12 * m23 - m13 * m22) - m11 * (m02 * m23 - m03 * m22) + m21 * (m02 * m13 - m03 * m12));
        this[4] = -(m10 * (m22 * m33 - m23 * m32) - m20 * (m12 * m33 - m13 * m32) + m30 * (m12 * m23 - m13 * m22));
        this[5] = (m00 * (m22 * m33 - m23 * m32) - m20 * (m02 * m33 - m03 * m32) + m30 * (m02 * m23 - m03 * m22));
        this[6] = -(m00 * (m12 * m33 - m13 * m32) - m10 * (m02 * m33 - m03 * m32) + m30 * (m02 * m13 - m03 * m12));
        this[7] = (m00 * (m12 * m23 - m13 * m22) - m10 * (m02 * m23 - m03 * m22) + m20 * (m02 * m13 - m03 * m12));
        this[8] = (m10 * (m21 * m33 - m23 * m31) - m20 * (m11 * m33 - m13 * m31) + m30 * (m11 * m23 - m13 * m21));
        this[9] = -(m00 * (m21 * m33 - m23 * m31) - m20 * (m01 * m33 - m03 * m31) + m30 * (m01 * m23 - m03 * m21));
        this[10] = (m00 * (m11 * m33 - m13 * m31) - m10 * (m01 * m33 - m03 * m31) + m30 * (m01 * m13 - m03 * m11));
        this[11] = -(m00 * (m11 * m23 - m13 * m21) - m10 * (m01 * m23 - m03 * m21) + m20 * (m01 * m13 - m03 * m11));
        this[12] = -(m10 * (m21 * m32 - m22 * m31) - m20 * (m11 * m32 - m12 * m31) + m30 * (m11 * m22 - m12 * m21));
        this[13] = (m00 * (m21 * m32 - m22 * m31) - m20 * (m01 * m32 - m02 * m31) + m30 * (m01 * m22 - m02 * m21));
        this[14] = -(m00 * (m11 * m32 - m12 * m31) - m10 * (m01 * m32 - m02 * m31) + m30 * (m01 * m12 - m02 * m11));
        this[15] = (m00 * (m11 * m22 - m12 * m21) - m10 * (m01 * m22 - m02 * m21) + m20 * (m01 * m12 - m02 * m11));
        return this;
    }
    
    public invert(): this {
        const m00 = this[0];
        const m01 = this[1];
        const m02 = this[2]
        const m03 = this[3]
        const m10 = this[4];
        const m11 = this[5];
        const m12 = this[6];
        const m13 = this[7];
        const m20 = this[8];
        const m21 = this[9];
        const m22 = this[10];
        const m23 = this[11];
        const m30 = this[12];
        const m31 = this[13];
        const m32 = this[14];
        const m33 = this[15];
        const b0 = m00 * m11 - m01 * m10;
        const b1 = m00 * m12 - m02 * m10;
        const b2 = m00 * m13 - m03 * m10;
        const b3 = m01 * m12 - m02 * m11;
        const b4 = m01 * m13 - m03 * m11;
        const b5 = m02 * m13 - m03 * m12;
        const b6 = m20 * m31 - m21 * m30;
        const b7 = m20 * m32 - m22 * m30;
        const b8 = m20 * m33 - m23 * m30;
        const b9 = m21 * m32 - m22 * m31;
        const b10 = m21 * m33 - m23 * m31;
        const b11 = m22 * m33 - m23 * m32;
        let factor = b0 * b11 - b1 * b10 + b2 * b9 + b3 * b8 - b4 * b7 + b5 * b6;
        if (factor != 0.0) {
            factor = 1.0 / factor;
            this[0] = (m11 * b11 - m12 * b10 + m13 * b9) * factor;
            this[1] = (m02 * b10 - m01 * b11 - m03 * b9) * factor;
            this[2] = (m31 * b5 - m32 * b4 + m33 * b3) * factor;
            this[3] = (m22 * b4 - m21 * b5 - m23 * b3) * factor;
            this[4] = (m12 * b8 - m10 * b11 - m13 * b7) * factor;
            this[5] = (m00 * b11 - m02 * b8 + m03 * b7) * factor;
            this[6] = (m32 * b2 - m30 * b5 - m33 * b1) * factor;
            this[7] = (m20 * b5 - m22 * b2 + m23 * b1) * factor;
            this[8] = (m10 * b10 - m11 * b8 + m13 * b6) * factor;
            this[9] = (m01 * b8 - m00 * b10 - m03 * b6) * factor;
            this[10] = (m30 * b4 - m31 * b2 + m33 * b0) * factor;
            this[11] = (m21 * b2 - m20 * b4 - m23 * b0) * factor;
            this[12] = (m11 * b7 - m10 * b9 - m12 * b6) * factor;
            this[13] = (m00 * b9 - m01 * b7 + m02 * b6) * factor;
            this[14] = (m31 * b1 - m30 * b3 - m32 * b0) * factor;
            this[15] = (m20 * b3 - m21 * b1 + m22 * b0) * factor;
        }
        return this;
    }
    
}