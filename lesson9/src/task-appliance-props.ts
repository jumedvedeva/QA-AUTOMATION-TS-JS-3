export interface ApplianceProps {
    brand: string;
    modelName: string;
    powerWatts: number;
    controlType: string;    // 'Digital' | 'Analog' | 'Knob'
    statusIndicator: string; // 'LED' | 'Display' | 'None'
}

export interface HeatingApplianceProps extends ApplianceProps {
    minTempCelsius: number;
    maxTempCelsius: number;
}
