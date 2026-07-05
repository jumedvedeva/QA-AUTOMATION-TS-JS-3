import { IHeatingAppliance } from './task-i-heating-appliance';

export class ApplianceHandler {
    // SRP, DIP
    private appliances: IHeatingAppliance[];

    public constructor() {
        this.appliances = [];
    }

    public addAppliance(appliance: IHeatingAppliance): void {
        this.appliances.push(appliance);
    }

    // LSP, ISP, DIP — any IHeatingAppliance instance can be passed in and called uniformly.
    public testAppliances(): void {
        this.appliances.forEach(appliance => {
            appliance.heatFood();
        });
    }
}
