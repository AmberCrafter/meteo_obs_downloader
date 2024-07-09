import {configureStore} from '@reduxjs/toolkit';
import { downloaderSlice } from './downloaderStore';
import { processStepSlice } from './processStepStore';

export const reduxStore = configureStore({
    reducer: {
        downloaderReducer: downloaderSlice.reducer,
        processStepReducer: processStepSlice.reducer,
    },
})

export type RootState = ReturnType<typeof reduxStore.getState>;
