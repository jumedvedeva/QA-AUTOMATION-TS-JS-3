//import { getCarInfo } from './car-function.js';

export interface Car {
    manufacturer: string;
    model: string;
    year: number;
    fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
    sitCount: number;
    power?: number;
}

export interface ICar {
    manufacturer: string;
    model: string;
    year: number;
    fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
    sitCount: number;
    power?: number;
    drive: () => void;
    getCarInfo(): string;
}
