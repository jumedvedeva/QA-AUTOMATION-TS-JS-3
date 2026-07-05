import { IGrillAppliance } from './task-i-grill-appliance';

// DIP, ISP
export class GrillHandler {
    private grillers: IGrillAppliance[];

    public constructor() {
        this.grillers = [];
    }

    public addGriller(griller: IGrillAppliance): void {
        this.grillers.push(griller);
    }

    // LSP, ISP, DIP
    public testGrillers(): void {
        this.grillers.forEach(griller => {
            griller.grillFood();
        });
    }
}
