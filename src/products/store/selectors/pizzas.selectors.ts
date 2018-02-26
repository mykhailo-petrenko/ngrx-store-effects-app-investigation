import { createSelector } from "@ngrx/store";

import * as fromRoot from '../../../app/store';
import { getProductsState, ProductsState } from "../reducers";
import * as fromPizzas from "../reducers/pizzas.reducer";

import { Pizza } from "../../models/pizza.model";
import { getSelectedToppings, getToppingsEntities } from "./toppings.selectors";
import { ToppingEntity } from "../reducers/toppings.reducer";
import { Topping } from 'src/products/models/topping.model';

export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);

export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => router.state && entities[router.state.params.pizzaId]
);

export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  getToppingsEntities,
  getSelectedToppings,
  (pizza: Pizza, toppingEntities: ToppingEntity, selectetToppings: number[]) => {
    const toppings:Topping[] =  selectetToppings.map(id => toppingEntities[id]);
    return {
      ...pizza,
      toppings
    } as Pizza;
  }
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
