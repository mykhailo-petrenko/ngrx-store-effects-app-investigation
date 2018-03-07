import * as reducers from './pizzas.reducer';
import * as actions from '../actions/pizzas.action';

describe('Pizzas Reducers', function() {

  describe('undefined action', function() {

    it('should return the default state', function() {
      const { initialState } = reducers;
      const action = {} as any;
      const state = reducers.pizzaReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PIZZAS action', function() {

    it('should set loading to true', function() {
      const { initialState } = reducers;
      const action = new actions.LoadPizzas();
      const state = reducers.pizzaReducer(initialState, action);

      expect(state.entities).toEqual(jasmine.objectContaining<object>({}));
      expect(state.loading).toBeTruthy();
      expect(state.loaded).toBeFalsy();
    });
  });
});
