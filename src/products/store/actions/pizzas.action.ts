import { Action } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

// Load pizzas
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

export class LoadPizzas implements Action {
    readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFails implements Action {
    readonly type = LOAD_PIZZAS_FAIL;

    constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
    readonly type = LOAD_PIZZAS_SUCCESS;

    constructor(public payload: Pizza[]) {}
}

// Create pizza
export const CREATE_PIZZA = '[Product] Create Pizza';
export const CREATE_PIZZA_FAIL = '[Product] Create Pizza Fail';
export const CREATE_PIZZA_SUCCESS = '[Product] Create Pizza Success';

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;

  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;

  constructor(public payoad: any) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {}
}

// Update Pizza
export const UPDATE_PIZZA = '[Products] Update Pizza';
export const UPDATE_PIZZA_FAIL = '[Products] Update Pizza Fail';
export const UPDATE_PIZZA_SUCCESS = '[Products] Update Pizza Success';

export class UpdatePizza implements Action {
  readonly type = UPDATE_PIZZA;

  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail implements Action {
  readonly type = UPDATE_PIZZA_FAIL;

  constructor(public payload: any) {}
}

export class UpdatePizzaSuccess implements Action {
  readonly type = UPDATE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {}
}

// Delete Pizza
export const DELETE_PIZZA = '[Products] Delete Pizza';
export const DELETE_PIZZA_FAIL = '[Products] Delete Pizza Fail';
export const DELETE_PIZZA_SUCCESS = '[Products] Delete Pizza Success';

export class DeletePizza implements Action {
  readonly type = DELETE_PIZZA;

  constructor(public payload: Pizza) {}
}

export class DeletePizzaFail implements Action {
  readonly type = DELETE_PIZZA_FAIL;

  constructor(public payload: any) {}
}

export class DeletePizzaSuccess implements Action {
  readonly type = DELETE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {}
}

// actions types
export type PizzaAction =
  | LoadPizzas
  | LoadPizzasFails
  | LoadPizzasSuccess
  | CreatePizza
  | CreatePizzaFail
  | CreatePizzaSuccess
  | UpdatePizza
  | UpdatePizzaFail
  | UpdatePizzaSuccess
  | DeletePizza
  | DeletePizzaFail
  | DeletePizzaSuccess;
