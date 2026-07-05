import { HeatingAppliance } from './task-heating-appliance';
import { HeatingApplianceProps } from './task-appliance-props';

export class Microwave extends HeatingAppliance {
    public constructor(props: HeatingApplianceProps) {
        super(props);
    }

    public heatFood(): void {
        console.log('Calling heatFood method of Microwave');
        console.log(`Using ${this.controlType} control. Heating food with microwave radiation (${this.powerWatts}W)...`);
    }

    public estimateCookingTime(targetTemp: number): number {
        const cookingTime = this.calculateCookingTime(targetTemp);
        console.log(`Estimated cooking time for Microwave: ${cookingTime} minutes.`);
        return cookingTime;
    }
}
