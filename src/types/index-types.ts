export enum TECH_SYSTEM_VAL {
    VTSP1 = 'В+Т+С+П',
    VSTP1 = 'В+С+Т+П',
    VSTP2 = 'В+С+Т+П',
    VTSP2 = 'В+Т+С+П',
    VTS = 'В+Т+С',
    VTP = 'В+Т+П',
    VSRTP = 'ВСР+Т+П',
    VT = 'В+Т',
    VSRT = 'ВСР+Т',
    VTSRP = 'ВТ+СР+П',
    VTSR = 'ВТ+СР',
    VT_P = 'ВТ+П',
}

export interface CommonInputData {
    CountMonth: number;
    FirstMonth: number;
    markCar: string;
    TotalStock: number;
    AvgStock: number;
    ZoneLength: number;
    ShiftsNumber: number;
    replaceableMachinePerfomance: number;
    N: number | null;
}

export interface MonthInputData {
    id?: number;
    MainCountCars: number[];
    MainCountShift: number[];
    MainShiftProduction: number[];
    AdditionalCountCars: number[];
    AdditionalCountShift: number[];
    AdditionalShiftProduction: number[];
    TP: number;
}

export interface AllMonthInputData {
    MainMarkCars: string[];
    AdditionalMarkCars: string[];
    DATA: Array<MonthInputData>;
}
