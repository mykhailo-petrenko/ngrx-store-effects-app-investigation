import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as action from '../actions/pizzas.action';
import { PizzasService } from '../../services/pizzas.service';
import { Pizza } from '../../models/pizza.model';

@Injectable()
export class PizzasEffect {
    constructor(
        private actions$: Actions,
        private pizzaService: PizzasService
    ) {}

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
}
