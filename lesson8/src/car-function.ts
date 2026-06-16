import { TruckClass } from './abstract-truck-class';
import {Car} from './car';
import { CarClass } from './car-class';
import { Truck } from './truck';

export function getCarInfo(car: Car): string {
    return `We just bought a ${car.year} ${car.manufacturer} that runs on ${car.fuelType} and has ${car.sitCount} seats!\n ${car.power ? `It has a power of ${car.power} HP.` : ''}`;
}

export function getTruckInfo(truck: Truck): string {
    return `${getCarInfo(truck)}\n It has a load capacity of ${truck.loadCapacity} tons and a trailer capacity of ${truck.trailerCapacity} tons`;
}

export function driveCar(car: CarClass): void {
    console.log(`We are getting  ${car.getCarInfo()} and we are starting to drive it....`);
    car.drive();
}

export function driveTruck(truck: TruckClass): void {
    console.log(`We are getting truck: ${truck.getTruckInfo()} and we are starting to drive it...`);
    truck.drive();
}

export function towWithTruck(truck: TruckClass): void {
    console.log(`We are getting tuck: ${truck.getTruckInfo()} and we are starting to tow it...`);
    truck.tow();
}

