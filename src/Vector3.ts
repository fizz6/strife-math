import Vector from './Vector';

export default class Vector3 extends Vector(3) {
    
    public static get Zero(): Vector3 {
        return new Vector3();
    }
    
    public static get Left(): Vector3 {
        return new Vector3().setValues(-1.0, 0.0);
    }
    
    public static get Right(): Vector3 {
        return new Vector3().setValues(1.0, 0.0);
    }
    
    public static get Down(): Vector3 {
        return new Vector3().setValues(0.0, -1.0);
    }
    
    public static get Up(): Vector3 {
        return new Vector3().setValues(0.0, 1.0);
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
    
}