import { createAction, props } from '@ngrx/store';
import { AppState, Products, Processor, Motherboard, Ram } from '../app.interface';

export const loadAllItems = createAction(
    '[PcBuilder API] load-all-items',
  );
  
  export const didAllItemsLoaded = createAction(
    '[PcBuilder API] All-items-Retrieved',
    props<{
      statusResponse: Products;
      apiResponse: boolean;
    }>()
  );

  export const addProcessorToCart = createAction(
    '[PcBuilder API] Add-Processor-to-cart',
    props<{
      processor: Processor;
    }>()
  );

  export const addMbToCart = createAction(
    '[PcBuilder API] Add-Motherboard-to-cart',
    props<{
      motherboard: Motherboard;
    }>()
  );
  export const addRamToCart = createAction(
    '[PcBuilder API] Add-Ram-to-cart',
    props<{
      ram: Ram;
    }>()
  );
  export const updateProcessorCartItem = createAction(
    '[PcBuilder API] Update-Processor-CartItem',
    props<{
      currentCount: number;
      currentPrice: string;
    }>()
  );
  export const updateMbCartItem = createAction(
    '[PcBuilder API] Update-Motherboard-CartItem',
    props<{
      currentCount: number;
      currentPrice: string;
    }>()
  );
  export const updateRmCartItem = createAction(
    '[PcBuilder API] Update-Ram-CartItem',
    props<{
      currentCount: number;
      currentPrice: string;
    }>()
  );
  export const removeCartItem = createAction(
    '[PcBuilder API] delete-Ram-CartItem',
    props<{
      currentIndex: number;
    }>()
  )