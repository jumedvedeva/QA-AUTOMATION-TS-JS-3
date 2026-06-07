import { Dog, List, StringOrNumber } from './new-types.js';

export function sum(a: number, b: number): number {
    return a + b;
}

export function doNothing(): void {
    console.log('This function does nothing');
}

export function getCurrentEnumAsString(value: List): StringOrNumber {
    return value;
}

export function createNewDog(name: string, age: number, height: number, weight: number): Dog {
    return {
        name,
        age,
        height,
        weight
    };
}

export function selectNumbers(arr: number[] | string[]): number[] {
    //return arr.filter((item) => typeof item === 'number' && !isNaN(item)) as number[];
    if (typeof arr[0] === 'number') {
        return arr as number [];
    }
    return [];
}

export function selectNumbersForMixedArray(arr: (number  | string)[]): number[] {
    return arr.filter((item) => typeof item === 'number' && !isNaN(item)) as number[];
}

export function listObjectKeysWithUnknownParameter(obj: unknown): string[] {
    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj);
    }
    return [];
}

export function listObjectKeysWithObjectParameter(obj: object): string[] {
    return Object.keys(obj);
}

export function createNewDogWithOptionalParameters(name: string, age: number, height: number, weight?: number): Partial<Dog> {
    return {
        name,
        age,
        height,
        weight
    };
}

export function listObjectKeysWithRecordParameter(obj: Record<string, unknown>): string[] {
    return Object.keys(obj);
}
