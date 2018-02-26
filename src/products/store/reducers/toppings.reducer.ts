import { Topping } from '../../models/topping.model';
import { LOAD_TOPPINGS, LOAD_TOPPINGS_FAIL, LOAD_TOPPINGS_SUCCESS, ToppingsAction, VISUALISE_TOPPINGS } from '../actions';

export type ToppingEntity = {
  [id: number]: Topping
}

export interface ToppingsState {
  entities: ToppingEntity;
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

export function toppingsReducer(
  state: ToppingsState = initialState,
  action: ToppingsAction
): ToppingsState {

  switch (action.type) {
    case VISUALISE_TOPPINGS: {
      const selectedToppings = action.payload;

      return {
        ...state,
        selectedToppings
      }
    }

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
          ...state.entities
        }
      );

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }
  }

  return state;
}

export const getToppingEntities = (state: ToppingsState): ToppingEntity => state.entities;
export const getToppingsLoading = (state: ToppingsState): boolean => state.loading;
export const getToppingsLoaded = (state: ToppingsState): boolean => state.loaded;
export const getSelectedToppings = (state: ToppingsState): number[] => state.selectedToppings;
