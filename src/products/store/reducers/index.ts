import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { PizzaState, pizzaReducer } from './pizzas.reducer';
import { ToppingsState, toppingsReducer } from './toppings.reducer';

export interface ProductsState {
  pizzas: PizzaState,
  toppings: ToppingsState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzaReducer,
  toppings: toppingsReducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

