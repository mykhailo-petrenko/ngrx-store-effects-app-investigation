import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as pizzasActions from '../actions/pizzas.action';
import { PizzasService } from '../../services/pizzas.service';

@Injectable()
export class PizzasEffect {
    constructor(
        private actions$: Actions,
        private pizzaService: PizzasService
    ) {}

    @Effect()
    loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS)
        .pipe(
            switchMap(
                () => this.pizzaService.getPizzas()
                    .pipe(
                        map(pizzas => new pizzasActions.LoadPizzasSuccess(pizzas)),
                        catchError(error => of(new pizzasActions.LoadPizzasFails(error)))
                    )
            )
        );


}