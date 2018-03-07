import { LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LoadPizzas, LoadPizzasFails } from "./pizzas.action";

describe('Pizzas Actions', function() {

  describe('LoadPizzas Actions', function() {

    describe('LoadPizzas', function() {

      it('should create an action', function() {
        const action = new LoadPizzas();

        expect(action).toEqual(jasmine.objectContaining<object>({
          type: LOAD_PIZZAS
        }));
      });
    });

    describe('LoadPizzasFails', function() {

      it('should create an action', function() {
        const payload = { message: 'Error loading pizzas'};
        const action = new LoadPizzasFails(payload);

        expect(action).toEqual(jasmine.objectContaining<object>({
          type: LOAD_PIZZAS_FAIL,
          payload
        }));
      });
    });
  });
});
