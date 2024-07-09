import {createSlice} from '@reduxjs/toolkit';

import type {Slice, PayloadAction} from '@reduxjs/toolkit';

export enum DownloadStage {
    SelectSite,
    SelectTime,
    SelectParameter,
    Downloading,
};

interface DownloadControlBlock {
    stage: DownloadStage | number,
    site: string,
    starttime: string,
    endtime: string,
    parameter: string[],
    parameterCode: number[]
};

export const downloaderSlice: Slice<DownloadControlBlock> = createSlice({
    name: 'downloader',
    initialState: {
        stage: DownloadStage.SelectSite,
        site: "",
        starttime: new Date(0).toISOString(),
        endtime: new Date(0).toISOString(),
        parameter: [] as string[],
        parameterCode: [] as number[],
    },
    reducers: {
        'setStage': (stage, action: PayloadAction<DownloadStage>) => {
            stage.stage = action.payload;
        },
        'setSite': (state, action: PayloadAction<string>) => {
            state.site = action.payload;
        },
        'setTimeRange': (state, action: PayloadAction<{starttime: string, endtime: string}>) => {
            state.starttime = action.payload.starttime;
            state.endtime = action.payload.endtime;
        },
        'setParameters': (state, action: PayloadAction<{paras: string[], paraCodes: number[]}>) => {
            state.parameter = action.payload.paras;
            state.parameterCode = action.payload.paraCodes;
        },
        'addParameter': (state, action: PayloadAction<{para: string, paraCode: number}>) => {
            if (state.parameter.filter((val) => val==action.payload.para).length > 0) {
                return;
            }
            state.parameter = [...state.parameter, action.payload.para];
            state.parameterCode = [...state.parameterCode, action.payload.paraCode];
            // console.log(state.parameter);
        },
        'delParameter': (state, action: PayloadAction<{para: string, paraCode: number}>) => {
            state.parameter = state.parameter.filter((val) => val!==action.payload.para);
            state.parameterCode = state.parameterCode.filter((val) => val!==action.payload.paraCode);
            // console.log(state.parameter);
        },
        'clearParameters': (state) => {
            state.parameter = [] as string[];
            state.parameterCode = [] as number[];
        },
        'clear': (state) => {
            state.site = "";
            state.starttime = new Date(0).toISOString();
            state.endtime = new Date(0).toISOString();
            state.parameter = [];
            state.parameterCode = [];
        }
    }
})

export const {setStage, setSite, setTimeRange, setParameters, addParameter, delParameter, clearParameters, clear} = downloaderSlice.actions;
export default downloaderSlice.reducer;