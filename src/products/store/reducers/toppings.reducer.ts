import { Topping } from '../../models/topping.model';
import { LOAD_TOPPINGS, LOAD_TOPPINGS_FAIL, LOAD_TOPPINGS_SUCCESS, ToppingsAction } from '../actions/toppings.action';

export type ToppingEntity = {
  [id: number]: Topping
}

export interface ToppingState {
  toppings: ToppingEntity;
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingState = {
  toppings: {},
  loaded: false,
  loading: false
};

export function toppingsReducer(
  state: ToppingState = initialState,
  action: ToppingsAction
): ToppingState {

  switch (action.type) {
    case LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case LOAD_TOPPINGS_SUCCESS: {
      const toppings: Topping[] = action.payload;

      const entities: ToppingEntity = toppings.reduce(
        (entities: ToppingEntity, topping: Topping): ToppingEntity => {
          entities[topping.id] = topping;

          return entities;
        }, {
          ...state.toppings
        }
      );

      return {
        ...state,
        toppings: entities,
        loading: false,
        loaded: true
      };
    }
  }

  return state;
}

export const getToppingEntities = (state: ToppingState): ToppingEntity => state.toppings;
export const getToppingLoading = (state: ToppingState): boolean => state.loading;
export const getToppingLoaded = (state: ToppingState): boolean => state.loaded;
