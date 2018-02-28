import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as action from '../actions/pizzas.action';
import * as rootActions from '../../../app/store/action';
import { PizzasService } from '../../services';
import { Pizza } from '../../models/pizza.model';

@Injectable()
export class PizzasEffect {
  constructor(private actions$: Actions,
              private pizzaService: PizzasService) {
  }

  @Effect()
  loadPizzas$ = this.actions$.ofType(action.LOAD_PIZZAS)
    .pipe(
      switchMap(
        () => this.pizzaService.getPizzas()
          .pipe(
            map(pizzas => new action.LoadPizzasSuccess(pizzas)),
            catchError(error => of(new action.LoadPizzasFails(error)))
          )
      )
    );


  @Effect()
  createPizza$ = this.actions$
    .ofType(action.CREATE_PIZZA)
    .pipe(
      pluck('payload'),
      // map((action: action.CreatePizza): Pizza => action.payload),
      switchMap(
        (pizza: Pizza) => this.pizzaService.createPizza(pizza)
          .pipe(
            map(pizza => new action.CreatePizzaSuccess(pizza)),
            catchError(error => of(new action.CreatePizzaFail(error)))
          )
      )
    );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(action.CREATE_PIZZA_SUCCESS)
    .pipe(
      pluck<action.CreatePizzaSuccess, Pizza>('payload'),
      map((pizza: Pizza) => {
        const path = ['/products', pizza.id ];

        return new rootActions.Go({path});
      })
    );

  @Effect()
  updatePizza$ = this.actions$
    .ofType(action.UPDATE_PIZZA)
    .pipe(
      pluck('payload'),
      switchMap(
        (pizza: Pizza) => this.pizzaService.updatePizza(pizza)
          .pipe(
            map(pizza => new action.UpdatePizzaSuccess(pizza)),
            catchError(error => of(new action.UpdatePizzaFail(error)))
          )
      )
    );

  @Effect()
  deletePizza$ = this.actions$
    .ofType(action.DELETE_PIZZA)
    .pipe(
      pluck('payload'),
      switchMap(
        (pizza: Pizza) => this.pizzaService.removePizza(pizza)
          .pipe(
            map(() => new action.DeletePizzaSuccess(pizza)),
            catchError(error => of(new action.DeletePizzaFail(error)))
          )
      )
    );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      action.UPDATE_PIZZA_SUCCESS,
      action.DELETE_PIZZA_SUCCESS
    )
    .pipe(
      map(() => new rootActions.Go({path: ['/products']}))
    );
}
