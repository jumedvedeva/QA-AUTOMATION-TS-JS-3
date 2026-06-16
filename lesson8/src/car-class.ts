import { Car } from './car.js';
//import { getCarInfo } from './car-function.js';

export class CarClass implements Car {
    public static type = 'Car';
    public fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
    public sitCount: number;
    public power?: number;

    public constructor(
        public manufacturer: string,
        public model: string,
        public year: number,
        fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid',
        sitCount: number,
        power?: number
    ) {
        this.fuelType = fuelType;
        this.sitCount = sitCount;
        this.power = power;
    }
    public getCarInfo(): string {
        return `We just bought a ${this.year} ${this?.manufacturer} ${this.model} that runs on ${this.fuelType} and has ${this.sitCount} seats!\n${this.power}? It has a power of ${this.power} HP. : ''`;
    }
    public drive(): void{
        console.log(`The ${this.manufacturer} ${this.model} is driving.`);
    }

}
