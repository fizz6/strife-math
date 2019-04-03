import Vector from './Vector';

export default class Vector2 extends Vector(2) {
    
    public static get Zero(): Vector2 {
        return new Vector2();
    }
    
    public static get Left(): Vector2 {
        return new Vector2().setValues(-1.0, 0.0);
    }
    
    public static get Right(): Vector2 {
        return new Vector2().setValues(1.0, 0.0);
    }
    
    public static get Down(): Vector2 {
        return new Vector2().setValues(0.0, -1.0);
    }
    
    public static get Up(): Vector2 {
        return new Vector2().setValues(0.0, 1.0);
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
    
}