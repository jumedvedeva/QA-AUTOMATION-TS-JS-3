import { IHeatingAppliance } from './task-i-heating-appliance';
import { HeatingApplianceProps } from './task-appliance-props';

// ISP, SRP, OCP
export abstract class HeatingAppliance implements IHeatingAppliance {
    public brand: string;
    public modelName: string;
    public powerWatts: number;
    public controlType: string;
    public statusIndicator: string;
    public minTempCelsius: number;
    public maxTempCelsius: number;

    public constructor(props: HeatingApplianceProps) {
        this.brand = props.brand;
        this.modelName = props.modelName;
        this.powerWatts = props.powerWatts;
        this.controlType = props.controlType;
        this.statusIndicator = props.statusIndicator;
        this.minTempCelsius = props.minTempCelsius;
        this.maxTempCelsius = props.maxTempCelsius;
    }

    // OCP
    public abstract heatFood(): void;

    // DRY — shared formula used by both subclasses via estimateCookingTime().
    protected calculateCookingTime(targetTemp: number): number {
        const tempRange = this.maxTempCelsius - this.minTempCelsius;
        const load = targetTemp / tempRange;
        return Math.round((load * this.powerWatts) / 100);
    }
}
