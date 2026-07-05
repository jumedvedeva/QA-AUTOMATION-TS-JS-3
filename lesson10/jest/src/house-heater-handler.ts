import { ICombinedGasWaterHeater } from './i-combined-gas-water-heater';

//DIP, ISP
export class HouseHeaterHandler {
    private heaters: ICombinedGasWaterHeater[];
    public constructor() {
        this.heaters = [];
    }

    public addHeater(heater: ICombinedGasWaterHeater): void {
        this.heaters.push(heater);
    }
    //LSP, ISP,DIP
    public testHeaters(): void {
        this.heaters.forEach(heater => {
            heater.heatHouse();
        });
    }
}
