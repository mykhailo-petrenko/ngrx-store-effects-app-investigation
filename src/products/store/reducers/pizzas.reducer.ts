import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export type PizzaEntity = {
  [id: number]: Pizza
}

export interface PizzaState {
  entities: PizzaEntity;
  loaded: boolean,
  loading: boolean
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function pizzaReducer(state = initialState,
                             action: fromPizzas.PizzaAction): PizzaState {

  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      }
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      const entities = pizzas.reduce(
        (entities: PizzaEntity, pizza: Pizza) => {
          entities[pizza.id] = pizza;

          return entities;
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      }
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

    case fromPizzas.UPDATE_PIZZA_SUCCESS:
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza: Pizza = action.payload;
      const entities: PizzaEntity = {
        ...state.entities,
        [pizza.id]: pizza
      };

      return {
        ...state,
        entities
      }
    }

    case fromPizzas.DELETE_PIZZA_SUCCESS: {
      const pizza: Pizza = action.payload;

      const entities: PizzaEntity = {
        ...state.entities
      };
      entities[pizza.id] && delete entities[pizza.id];

      // const { [pizza.id]: removed, ...entities}  = state.entities;

      return {
        ...state,
        entities
      }
    }
  }

  return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
