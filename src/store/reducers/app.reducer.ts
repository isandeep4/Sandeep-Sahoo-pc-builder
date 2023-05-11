import { createReducer, on, Action } from '@ngrx/store';
import { AppState, CartItems } from '../app.interface';
import { didAllItemsLoaded, addProcessorToCart, addMbToCart, addRamToCart, updateProcessorCartItem, updateMbCartItem, updateRmCartItem, removeCartItem } from '../actions/app.action';
import { count } from 'rxjs';



export const initialState: AppState = {
    productList: {
      processorList: [],
      motherboardList: [],
      ramList: [],
    },
    selectedProducts: {
      processorList: [],
      motherboardList: [],
      ramList: [],
    },
    apiResponse: false,
  };

export const initialCartState: CartItems = {
  selectedProducts: {
    processorList: [],
      motherboardList: [],
      ramList: [],
  }
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
      selectedProducts: {
        processorList: [],
        motherboardList: [],
        ramList: [],
      },
      apiResponse: action.apiResponse,
    })),
    on(addProcessorToCart, (state, action) => ({ 
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        processorList: [action.processor],
      },
    })),
    on(addMbToCart, (state, action) => ({
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        motherboardList: [action.motherboard],
      },
    })),
    
    on(addRamToCart, (state, action) => ({
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        ramList: [action.ram],
      },
    })),
    on(updateProcessorCartItem, (state, action) => ({
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        processorList: [
          {
            ...state.selectedProducts.processorList[0],
            count: action.currentCount,
            price: action.currentPrice,
          }
        ]
      }
    })),
    
    on(updateMbCartItem, (state, action) => ({
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        motherboardList: [
          {
            ...state.selectedProducts.motherboardList[0],
            count: action.currentCount,
            price: action.currentPrice,
          }
        ]
      }
    })),
    on(updateRmCartItem, (state, action) => ({
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        ramList: [
          {
            ...state.selectedProducts.ramList[0],
            count: action.currentCount,
            price: action.currentPrice,
          }
        ]
      }
    })), 
)

export const PcBuilderReducer = (
    state: AppState,
    action: Action,
) => {
    return _PcBuilderReducer(state, action);
}