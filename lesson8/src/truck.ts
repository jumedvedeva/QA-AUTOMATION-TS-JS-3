import { Car } from './car';

export interface Truck extends Car {
    loadCapacity: number;
    trailerCapacity: number;
    trailerType?: TrailerType[];
}

interface TrailerType {
    type: 'flatbed' | 'box' | 'tanker';
    weight: number;
}
