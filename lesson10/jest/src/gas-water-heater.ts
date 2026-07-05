import { SpecificWaterHeaterProps } from './specific-water-heater-props';
import { WaterHeater } from './water-heater';

export class GasWaterHeater extends WaterHeater {
    protected heatExchangerType: string;

    public constructor(props: SpecificWaterHeaterProps, heatExchangerType: string) {
        super({...props, energySource: 'Gas'});
        this.heatExchangerType = heatExchangerType;
    }

    public heatWater(): void {
        console.log('Calling heatWater method of GasWaterHeater');
        console.log(`Using setup from ${this.temperatureControl} control. Heating water using ${this.energySource}...`);
    }

    public estimateHeatingTime(): number {
        return 0;
    }
}
