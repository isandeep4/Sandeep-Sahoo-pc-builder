import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.interface";


export const selectPcBuilder = createFeatureSelector<AppState>('pcBuilder');

export const selectPcBuilderStatus = createSelector(
    selectPcBuilder,
    (state: AppState) => state.productList
);
export const selectPcBuilderCartStatus = createSelector(
    selectPcBuilder,
    (state: AppState) => state.selectedProducts
);