import { createReducer, on, Action } from '@ngrx/store';
import { AppState, CartItems } from '../app.interface';
import { didAllItemsLoaded, removeCartItem, addItemToCart, updateCartItem } from '../actions/app.action';
import { count } from 'rxjs';
import { mutableOn } from 'ngrx-etc';



export const initialState: AppState = {
    productList: {
      processorList: [],
      motherboardList: [],
      ramList: [],
    },
    selectedProducts: [],
    apiResponse: false,
  };

export const initialCartState: CartItems = {
  selectedProducts: []
}

export const _PcBuilderReducer = createReducer(
    initialState,
    on(didAllItemsLoaded, (state, action) => ({
      ...state,
      productList: {
        ...state.productList,
        processorList: action.statusResponse.processorList,
        motherboardList: action.statusResponse.motherboardList,
        ramList: action.statusResponse.ramList,
      },
      selectedProducts: [],
      apiResponse: action.apiResponse,
    })),
    on(addItemToCart, (state,action)=>({
      ...state,
      selectedProducts:[...state.selectedProducts, action.product]
    })),
    mutableOn(updateCartItem, (state, action) => {
      state.selectedProducts[action.index].count = action.currentCount,
      state.selectedProducts[action.index].price = action.currentPrice
    }),
    on(removeCartItem, (state, action) => ({
      ...state,
      selectedProducts: state.selectedProducts.filter(item => item.productName !== action.currentProduct),
    }))
)

export const PcBuilderReducer = (
    state: AppState,
    action: Action,
) => {
    return _PcBuilderReducer(state, action);
}