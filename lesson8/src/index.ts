import { TruckClass } from './abstract-truck-class.js';
import { CarClass } from './car-class.js';
import { getCarInfo, getTruckInfo, driveCar, driveTruck, towWithTruck } from './car-function.js';
import { Car } from './car.js';
import { FordF150 } from './ford-f150.js';
import { FordF250 } from './ford-f250.js';
import { Truck } from './truck.js';

const fordFocus: Car = {
    manufacturer: 'Ford',
    model: 'Focus',
    year: 2018,
    fuelType: 'gasoline',
    sitCount: 5
};
console.log(getCarInfo(fordFocus));

const mazda3: Car = {
    manufacturer: 'Mazda',
    model: '3',
    year: 2020,
    fuelType: 'gasoline',
    sitCount: 5
};
console.log(getCarInfo(mazda3));

const fordMustangGtShelby: Car = {
    manufacturer: 'Ford',
    model: 'MustangGtShelby',
    year: 2022,
    fuelType: 'gasoline',
    sitCount: 5,
    power: 760
};
console.log(getCarInfo(fordMustangGtShelby));

const FordF259: Truck = {
    manufacturer: 'Ford',
    model: 'F-250',
    year: 2021,
    fuelType: 'diesel',
    sitCount: 3,
    power: 450,
    loadCapacity: 3,
    trailerCapacity: 2
};
console.log(getTruckInfo(FordF259));

console.log('------------------Classes-------------');
const fordFocusInstance = new CarClass('Ford', 'Focus', 2018, 'gasoline', 5);
console.log(fordFocusInstance.getCarInfo());
fordFocusInstance.drive();
driveCar(fordFocusInstance);

const f150 = new FordF150(
    {
        manufacturer: 'Ford',
        model: 'F-150',
        year: 2020,
        fuelType: 'gasoline',
        sitCount: 5,
        power: 400,
        loadCapacity: 2,
        trailerCapacity: 1
    } as any);
console.log (driveTruck(f150));
console.log (towWithTruck(f150));

const f250 = new FordF250(
    {
        manufacturer: 'Ford',
        model: 'F-250',
        year: 2020,
        fuelType: 'diesel',
        sitCount: 5,
        power: 400,
        loadCapacity: 2,
        trailerCapacity: 1
    } as any);
console.log (driveTruck(f250));
console.log (towWithTruck(f250));

towWithTruck(f150);
towWithTruck(f250);

console.log('abstract property: of all cars', TruckClass.type);
