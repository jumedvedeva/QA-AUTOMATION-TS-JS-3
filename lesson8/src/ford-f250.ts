import { TruckClass } from './abstract-truck-class.js';

export class FordF250 extends TruckClass {
    public tow(): void {
        console.log(`The ${this.manufacturer} ${this.model} is towing a trailer without problem!`);
    }
}
