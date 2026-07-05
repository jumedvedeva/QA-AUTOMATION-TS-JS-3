import { BoilerHandler } from './boiler-handler';
import { CombinedGasWaterHeater } from './combined-gas-water-heater';
import { ElectricWaterHeater } from './electric-water-heater';
//import { GasWaterHeater } from './gas-water-heater';
//import { WaterHeater } from './water-heater';

// const boilerBosch = new WaterHeater ({
//     energySource: 'Electricity',
//     capacity: 50,
//     formFactor: 'Tankless',
//     statusIndicator: 'LED',
//     temperatureControl: 'Digital',
//     tIn: 15,
//     tOut: 60
// });

// const boilerAriston = new WaterHeater ({
//     energySource: 'Electricity',
//     capacity: 45,
//     formFactor: 'Cylinder',
//     statusIndicator: 'LED',
//     temperatureControl: 'Analog',
//     tIn: 25,
//     tOut: 90
// });

// const gasBoilerBeretta = new WaterHeater ({
//     energySource: 'Gas',
//     capacity: 0,
//     formFactor: 'Tankless',
//     statusIndicator: 'LED',
//     temperatureControl: 'Analog',
//     tIn: 13,
//     tOut: 70
// });

const electricBosch = new ElectricWaterHeater ({
    energySource: 'Electricity',
    capacity: 50,
    formFactor: 'Tankless',
    statusIndicator: 'LED',
    temperatureControl: 'Digital',
    tIn: 13,
    tOut: 70
});

const combinedGasBeretta = new CombinedGasWaterHeater({
    energySource: 'Gas',
    capacity: 45,
    formFactor: 'Cylinder',
    statusIndicator: 'LED',
    temperatureControl: 'Analog',
    tIn: 25,
    tOut: 90
});

// boilerAriston.heatWater();
// boilerBosch.heatWater();
// gasBoilerBeretta.heatWater();
//electricBosch.heatWater();
electricBosch.estimateHeatingTime();

//combinedGasBeretta.heatWater();
combinedGasBeretta.estimateHeatingTime();

//LSP
const boilerHandler = new BoilerHandler();
boilerHandler.addBoiler(electricBosch);
boilerHandler.addBoiler(combinedGasBeretta);
boilerHandler.testBoilers();
