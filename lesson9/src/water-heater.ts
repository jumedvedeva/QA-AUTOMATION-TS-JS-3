import { IWaterHeater } from './i-water-heater';
import { WaterHeaterProps } from './specific-water-heater-props';

//ISP, SRP
export abstract class WaterHeater implements IWaterHeater {
    public energySource: string;
    public capacity: number;
    public formFactor: string;
    public statusIndicator: string;
    public temperatureControl: string;
    public tIn: number;
    public tOut: number;

    public constructor(props: WaterHeaterProps) {
        this.energySource = props.energySource;
        this.capacity = props.capacity;
        this.formFactor = props.formFactor;
        this.statusIndicator = props.statusIndicator;
        this.temperatureControl = props.temperatureControl;
        this.tIn = props.tIn;
        this.tOut = props.tOut;
    }
    public abstract heatWater(): void;

    protected calculateHeatingTime(): number {
        const temperatureDifference = this.tOut - this.tIn;
        const heatingTime = (temperatureDifference * this.capacity) / 10;
        return heatingTime;
    }

    // private heatedWaterBasedOnSource(): void {
    //     switch (this.energySource) {
    //         case 'Electricity':
    //             console.log('Heating water using electricity...');
    //             break;
    //         case 'Gas':
    //             console.log('Heating water using gas...');
    //             break;
    //         default:
    //             console.log('Unknown energy source.Cannot heat water.');
    //     }
    // }
}
