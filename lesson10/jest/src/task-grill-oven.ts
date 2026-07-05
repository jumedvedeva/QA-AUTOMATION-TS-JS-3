import { Oven } from './task-oven';
import { IGrillAppliance } from './task-I-grill-appliance';
import { HeatingApplianceProps } from './task-appliance-props';

// SRP, OCP, ISP
export class GrillOven extends Oven implements IGrillAppliance {

    public constructor(props: HeatingApplianceProps) {
        super(props, 'convection');
    }

    public grillFood(): void {
        console.log('Grilling food using GrillOven top heating element...');
    }
}
