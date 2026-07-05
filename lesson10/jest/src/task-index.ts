import { ApplianceHandler } from './task-appliance-handler';
import { GrillHandler } from './task-grill-handler';
import { GrillOven } from './task-grill-oven';
import { Microwave } from './task-microwave';


const microwaveSamsung = new Microwave({
    brand: 'Samsung',
    modelName: 'MS23K3513AW',
    powerWatts: 800,
    controlType: 'Digital',
    statusIndicator: 'Display',
    minTempCelsius: 40,
    maxTempCelsius: 180
});

const grillOvenBosch = new GrillOven({
    brand: 'Bosch',
    modelName: 'HBG675BB1',
    powerWatts: 3600,
    controlType: 'Analog',
    statusIndicator: 'LED',
    minTempCelsius: 50,
    maxTempCelsius: 300
});

microwaveSamsung.estimateCookingTime(120);
grillOvenBosch.estimateCookingTime(200);

// LSP
const applianceHandler = new ApplianceHandler();
applianceHandler.addAppliance(microwaveSamsung);
applianceHandler.addAppliance(grillOvenBosch);
applianceHandler.testAppliances();

// DIP
const grillHandler = new GrillHandler();
grillHandler.addGriller(grillOvenBosch);
grillHandler.testGrillers();
