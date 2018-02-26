import { createSelector } from "@ngrx/store";
import { getProductsState, ProductsState } from "../reducers";
import * as toppingsReducer from "../reducers/toppings.reducer";
import { Topping } from "../../models/topping.model";


export const getToppingsState = createSelector(
  getProductsState,
  (state: ProductsState): toppingsReducer.ToppingsState => state.toppings
);

export const getToppingsEntities = createSelector(
  getToppingsState,
  toppingsReducer.getToppingEntities
);

export const getSelectedToppings = createSelector(
  getToppingsState,
  toppingsReducer.getSelectedToppings
);

export const getAllToppings = createSelector(
  getToppingsEntities,
  (entities: toppingsReducer.ToppingEntity): Topping[] => {
    return Object.keys(entities)
      .map((key: string): number => parseInt(key))
      .map((id: number): Topping => entities[id]);
  }
);

export const getToppingsLoaded = createSelector(
  getToppingsState,
  toppingsReducer.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  toppingsReducer.getToppingsLoading
);
