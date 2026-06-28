import { GasWaterHeater } from './gas-water-heater';
import { ICombinedGasWaterHeater } from './i-combined-gas-water-heater';
import { SpecificWaterHeaterProps } from './specific-water-heater-props';

//SRP, OCP, ICP
export class CombinedGasWaterHeater extends GasWaterHeater implements ICombinedGasWaterHeater{

    public constructor(props: SpecificWaterHeaterProps) {
        super(props, 'combined');
    }

    public heatHouse(): void {
        console.log('Heating house using combined gas water heater...');
    }
}
