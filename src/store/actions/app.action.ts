import { createAction, props } from '@ngrx/store';
import { AppState, Products, Processor, Motherboard, Ram, Product } from '../app.interface';

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

  export const addItemToCart =  createAction(
      '[PcBuilder API] Add-Item-to-cart',
      props<{
        product:Product;
      }>()
    );
    export const updateCartItem = createAction(
      '[PcBuilder API] Update-CartItem',
      props<{
        index: number;
        currentCount: number;
        currentPrice: string;
      }>()
    );
  export const removeCartItem = createAction(
    '[PcBuilder API] delete-Ram-CartItem',
    props<{
      currentProduct: string;
    }>()
  )