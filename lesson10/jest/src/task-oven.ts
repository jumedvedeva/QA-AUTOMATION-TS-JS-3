import { HeatingAppliance } from './task-heating-appliance';
import { HeatingApplianceProps } from './task-appliance-props';

export class Oven extends HeatingAppliance {
    protected heatMode: string; // e.g. 'convection' | 'conventional' | 'steam'

    public constructor(props: HeatingApplianceProps, heatMode: string) {
        super(props);
        this.heatMode = heatMode;
    }

    public heatFood(): void {
        console.log('Calling heatFood method of Oven');
        console.log(`Using ${this.controlType} control. Heating food in ${this.heatMode} mode (${this.powerWatts}W)...`);
    }

    public estimateCookingTime(targetTemp: number): number {
        return this.calculateCookingTime(targetTemp);
    }
}
