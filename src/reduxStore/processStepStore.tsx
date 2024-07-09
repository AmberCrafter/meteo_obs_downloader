import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction, Slice } from '@reduxjs/toolkit';
import { DownloadStage } from './downloaderStore';

export interface ProcessStepBlock {
    name: string,
    value: string,
    stage: DownloadStage | number,
};

export const processStepSlice: Slice<{ list: ProcessStepBlock[] }> = createSlice({
    name: 'process_step',
    initialState: {
        list: [] as ProcessStepBlock[],
    },
    reducers: {
        'add_process_step': (state, action: PayloadAction<ProcessStepBlock>) => {
            state.list = [...state.list, action.payload];
        },
        'to_process_step': (state, action: PayloadAction<DownloadStage>) => {
            // check is member or not
            if (state.list.filter((member) => member.stage == action.payload ).length > 0) {
                console.log("[Debug] trigger remove");
                while (state.list.length > 0) {
                    let member = state.list.pop();
                    if (!member) {
                        break;
                    }
                    if (member.stage == action.payload) {
                        break;
                    }
                }
            }
        },
        'clear_process_step': (state) => {
            while (state.list.length > 0) {
                let member = state.list.pop();
                if (!member) {
                    break;
                }
            }
        }
    }
})

export const { add_process_step, to_process_step, clear_process_step } = processStepSlice.actions;
export default processStepSlice.reducer;