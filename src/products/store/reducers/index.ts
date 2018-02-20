import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';
import { Pizza } from '../../models/pizza.model';

export interface ProductsState {
    pizzas: fromPizzas.PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzas.reducer
}

export const getProductsState = createFeatureSelector<ProductsState>('products');

// Pizza State
export const getPizzaState = createSelector(
    getProductsState,
    (state: ProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(
    getPizzaState,
    fromPizzas.getPizzasEntities
);

export const getAllPizzas = createSelector(
    getPizzasEntities,
    (entities: fromPizzas.PizzaEntity) => {
        return Object.keys(entities).map(id => entities[parseInt(id)]);
    }
);

export const getAllPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
);

export const getAllPizzasLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
);
