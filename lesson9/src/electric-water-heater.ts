import { SpecificWaterHeaterProps } from './specific-water-heater-props';
import { WaterHeater } from './water-heater';

export class ElectricWaterHeater extends WaterHeater {
    public constructor(props: SpecificWaterHeaterProps) {
        super({...props, energySource: 'Electricity'});
    }

    public heatWater(): void {
        console.log('Calling heatWater method of ElectricWaterHeater');
        console.log(`Using setup from ${this.temperatureControl} control. Heating water using ${this.energySource}...`);
    }

    public estimateHeatingTime(): number {
        const heatingTime = this.calculateHeatingTime();
        console.log(`Estimated heating time: ${heatingTime} minutes.`);
        return heatingTime;
    }
}
