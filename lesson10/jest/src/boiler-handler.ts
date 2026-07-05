import { IWaterHeater } from './i-water-heater';

export class BoilerHandler {
    //SRP, DIP
    private boiler: IWaterHeater[];
    public constructor() {
        this.boiler = [];
    }

    public addBoiler(boiler: IWaterHeater): void {
        this.boiler.push(boiler);
    }
    //LSP, ISP,DIP
    public testBoilers(): void {
        this.boiler.forEach(boiler => {
            boiler.heatWater();
        });
    }
}
