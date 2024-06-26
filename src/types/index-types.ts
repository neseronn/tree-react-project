import { EditSave, Save } from './history-types';

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
  Company: string;
  CuttingArea: string;
  CountMonth: number;
  FirstMonth: number;
  markCar: string;
  TotalStock: number;
  AvgStock: number;
  ZoneLength: number;
  ShiftsNumber: number;
  replaceableMachinePerfomance: number;
  N: number;
}

export interface ChangedCommonInputData {
  Company?: string | undefined;
  CuttingArea?: string | undefined;
  CountMonth?: number | undefined;
  FirstMonth?: number | undefined;
  markCar?: string | undefined;
  TotalStock?: number | undefined;
  AvgStock?: number | undefined;
  ZoneLength?: number | undefined;
  ShiftsNumber?: number | undefined;
  replaceableMachinePerfomance?: number | undefined;
  N?: number | undefined;
}

export interface MonthInputData {
  MainCountCars: Array<number | ''>;
  MainCountShift: Array<number | ''>;
  MainShiftProduction: Array<number | ''>;
  AdditionalCountCars: Array<number | ''>;
  AdditionalCountShift: Array<number | ''>;
  AdditionalShiftProduction: Array<number | ''>;
  TP: number;
}

export type MonthInputDataWithoutTP = Omit<MonthInputData, 'TP'>;

export interface AllMonthInputData {
  MainMarkCars: string[];
  AdditionalMarkCars: string[];
  DATA: MonthInputData[];
}

export interface ChangedAllMonthInputData {
  MainMarkCars?: string[];
  AdditionalMarkCars?: string[];
  DATA?: MonthInputData[];
}

export interface InputData {
  DataAboutRecord: Save;
  DataCalculated: CommonInputData;
  DataMonthInfo: AllMonthInputData;
}
export interface EnteredData {
  DataCalculated: CommonInputData;
  DataMonthInfo: AllMonthInputData;
}

export interface SaveInputData {
  DataAboutRecord: EditSave;
  DataCalculated: CommonInputData;
  DataMonthInfo: AllMonthInputData;
}
