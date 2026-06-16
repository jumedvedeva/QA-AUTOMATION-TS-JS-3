import { TruckClass } from './abstract-truck-class.js';

export class FordF150 extends TruckClass {
    public tow(): void {
        this.hitchTrailer();
        console.log(`The ${this.manufacturer} ${this.model} is towing a trailer!`);
    }
}
