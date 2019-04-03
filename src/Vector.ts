export default function Vector(dimensions: number) {
    
    return class Vector extends Float32Array {
        
        private static get Epsilon(): number {
            return 0.000001;
        }
        
        public static get Dimensions(): number {
            return dimensions;
        }
        
        public static get Random(): Vector {
            const vector = new Vector();
            for (var count = 0; count < Vector.Dimensions; ++count) {
                vector[count] = Math.random();
            }
            return vector;
        }
        
        public static copy<T extends Vector>(v: T): T {
            const vector = new Vector();
            vector.copy(v);
            return vector as T;
        }
        
        public static fromValue(value: number): Vector {
            const vector = new Vector();
            vector.setValue(value);
            return vector;
        }
        
        public static fromValues(...values: number[]): Vector {
            const vector = new Vector();
            vector.setValues.apply(vector, values);
            return vector;
        }
        
        public static add(a: Vector, b: Vector): Vector {
            const vector = new Vector();
            vector.copy(a).add(b);
            return vector;
        }
        
        public static subtract(a: Vector, b: Vector): Vector {
            const vector = new Vector();
            vector.copy(a).subtract(b);
            return vector;
        }
        
        public static multiply(a: Vector, b: Vector): Vector {
            const vector = new Vector();
            vector.copy(a).multiply(b);
            return vector;
        }
        
        public static divide(a: Vector, b: Vector): Vector {
            const vector = new Vector();
            vector.copy(a).divide(b);
            return vector;
        }
        
        public static floor(v: Vector): Vector {
            const vector = new Vector();
            vector.copy(v).floor();
            return vector;
        }
        
        public static ceil(v: Vector): Vector {
            const vector = new Vector();
            vector.copy(v).ceil();
            return vector;
        }
        
        public static round(v: Vector): Vector {
            const vector = new Vector();
            vector.copy(v).round();
            return vector;
        }
        
        public static min(a: Vector, b: Vector): Vector {
            const vector = new Vector();
            vector.copy(a).min(b);
            return vector;
        }
        
        public static max(a: Vector, b: Vector): Vector {
            const vector = new Vector();
            vector.copy(a).max(b);
            return vector;
        }
        
        public static negate(v: Vector): Vector {
            const vector = new Vector();
            vector.copy(v).negate();
            return vector;
        }
        
        public static inverse(v: Vector): Vector {
            const vector = new Vector();
            vector.copy(v).inverse();
            return vector;
        }
        
        public static normalize(v: Vector): Vector {
            const vector = new Vector();
            vector.copy(v).normalize();
            return vector;
        }
        
        public static lerp(a: Vector, b: Vector, t: number): Vector {
            const vector = new Vector();
            for (var count = 0; count < Vector.Dimensions; ++count) {
                const aValue = a[count]
                    ? a[count]
                    : 0.0;
                const bValue = b[count]
                    ? b[count]
                    : 0.0;
                vector[count] = aValue + t * (bValue - aValue);
            }
            return vector;
        }
        
        public static hermite(a: Vector, b: Vector, c: Vector, d: Vector, t: number): Vector {
            const vector = new Vector();
            const tSquared = t * t;
            const aFactor = tSquared * (2.0 * t - 3.0) + 1.0;
            const bFactor = tSquared * (t - 2.0) + t;
            const cFactor = tSquared * (t - 1.0);
            const dFactor = tSquared * (3.0 - 2.0 * t);
            for (var count = 0; count < Vector.Dimensions; ++count) {
                const aValue = a[count]
                    ? a[count]
                    : 0.0;
                const bValue = b[count]
                    ? b[count]
                    : 0.0;
                const cValue = c[count]
                    ? c[count]
                    : 0.0;
                const dValue = d[count]
                    ? d[count]
                    : 0.0;
                vector[count] = aValue * aFactor + bValue * bFactor + cValue * cFactor + dValue * dFactor;
            }
            return vector;
        }
        
        public static bezier(a: Vector, b: Vector, c: Vector, d: Vector, t: number): Vector {
            const vector = new Vector();
            const factorSquared = t * t;
            const inverseFactor = 1.0 - t;
            const inverseFactorSquared = inverseFactor * inverseFactor;
            const aFactor = inverseFactorSquared * inverseFactor;
            const bFactor = 3.0 * t * inverseFactorSquared;
            const cFactor = 3 * factorSquared * inverseFactor;
            const dFactor = factorSquared * t;
            for (var count = 0; count < Vector.Dimensions; ++count) {
                const aValue = a[count]
                    ? a[count]
                    : 0.0;
                const bValue = b[count]
                    ? b[count]
                    : 0.0;
                const cValue = c[count]
                    ? c[count]
                    : 0.0;
                const dValue = d[count]
                    ? d[count]
                    : 0.0;
                vector[count] = aValue * aFactor + bValue * bFactor + cValue * cFactor + dValue * dFactor;
            }
            return vector;
        }
        
        public static equals(a: Vector, b: Vector): boolean {
            return a.equals(b);
        }
        
        public get magnitudeSquared(): number {
            var magnitudeSquared = 0.0;
            for (var count = 0; count < this.length; ++count) {
                magnitudeSquared += this[count] * this[count];
            }
            return magnitudeSquared;
        }
        
        public get magnitude(): number {
            return Math.sqrt(this.magnitudeSquared);
        }
        
        public constructor() {
            super(dimensions);
        }
        
        public copy(v: Vector): this {
            const size = Math.min(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                this[count] = v[count];
            }
            return this;
        }
        
        public setValue(value: number): this {
            for (var count = 0; count < this.length; ++count) {
                this[count] = value;
            }
            return this;
        }
        
        public setValues(...values: number[]): this {
            const size = Math.min(this.length, values.length);
            for (var count = 0; count < size; ++count) {
                this[count] = values[count];
            }
            return this;
        }
        
        public add(v: Vector): this {
            const size = Math.min(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                this[count] += v[count];
            }
            return this;
        }
        
        public subtract(v: Vector): this {
            const size = Math.min(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                this[count] -= v[count];
            }
            return this;
        }
        
        public multiply(v: Vector): this {
            const size = Math.min(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                this[count] *= v[count];
            }
            return this;
        }
        
        public divide(v: Vector): this {
            const size = Math.min(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                this[count] /= v[count];
            }
            return this;
        }
        
        public floor(): this {
            for (var count = 0; count < this.length; ++count) {
                this[count] = Math.floor(this[count]);
            }
            return this;
        }
        
        public ceil(): this {
            for (var count = 0; count < this.length; ++count) {
                this[count] = Math.ceil(this[count]);
            }
            return this;
        }
        
        public round(): this {
            for (var count = 0; count < this.length; ++count) {
                this[count] = Math.round(this[count]);
            }
            return this;
        }
        
        public min(v: Vector): this {
            const size = Math.min(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                this[count] = Math.min(this[count], v[count]);
            }
            return this;
        }
        
        public max(v: Vector): this {
            const size = Math.min(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                this[count] = Math.max(this[count], v[count]);
            }
            return this;
        }
        
        public scale(s: number): this {
            for (var count = 0; count < this.length; ++count) {
                this[count] *= s;
            }
            return this;
        }
        
        public distanceSquared(v: Vector): number {
            var squareSum = 0.0;
            const size = Math.max(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                const a = this[count]
                    ? this[count]
                    : 0.0;
                const b = v[count]
                    ? v[count]
                    : 0.0;
                const difference = b - a;
                squareSum += difference * difference;
            }
            return squareSum;
        }
        
        public distance(v: Vector): number {
            return Math.sqrt(this.distanceSquared(v));
        }
        
        public negate(): this {
            for (var count = 0; count < this.length; ++count) {
                this[count] *= -1.0;
            }
            return this;
        }
        
        public inverse(): this {
            for (var count = 0; count < this.length; ++count) {
                this[count] = 1.0 / this[count];
            }
            return this;
        }
        
        public normalize(): this {
            const magnitude = this.magnitude;
            for (var count = 0; count < this.length; ++count) {
                this[count] = this[count] / magnitude;
            }
            return this;
        }
        
        public dot(v: Vector): number {
            var dot = 0.0;
            const size = Math.min(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                dot += this[count] * v[count];
            }
            return dot;
        }
        
        public equals(v: Vector): boolean {
            const size = Math.min(this.length, v.length);
            for (var count = 0; count < size; ++count) {
                if (Math.abs(this[count] - v[count]) > Vector.Epsilon * Math.max(1.0, Math.abs(this[0]), Math.abs(v[0]))) {
                    return false;
                }
            }
            return true;
        }
        
    }
    
}