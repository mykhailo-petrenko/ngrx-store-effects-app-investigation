import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { PizzaState, pizzaReducer } from './pizzas.reducer';
import { ToppingState, toppingsReducer } from './toppings.reducer';

export interface ProductsState {
  pizzas: PizzaState,
  toppings: ToppingState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzaReducer,
  toppings: toppingsReducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

