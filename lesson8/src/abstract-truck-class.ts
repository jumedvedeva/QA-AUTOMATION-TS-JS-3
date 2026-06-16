import { CarClass } from './car-class.js';

export abstract class TruckClass extends CarClass {
    public loadCapacity: number;
    public trailerCapacity: number;

    public constructor(truck: TruckClass) {
        super(truck.manufacturer, truck.model, truck.year!, truck.fuelType, truck.power!);
        this.loadCapacity = truck.loadCapacity;
        this.trailerCapacity = truck.trailerCapacity;
    }
    public getTruckInfo(): string {
        return `${this.getCarInfo()}\n It has a load capacity of ${this.loadCapacity} tons and a trailer capacity of ${this.trailerCapacity} tons`;
    }

    public abstract tow(): void;

    protected hitchTrailer(): void {
        console.log(`The ${this.manufacturer} ${this.model} is hitting a trailer...`);
    }
}
