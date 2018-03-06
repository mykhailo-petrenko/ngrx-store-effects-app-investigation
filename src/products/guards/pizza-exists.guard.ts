
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as store from '../store'
import { PizzaEntity } from '../store/reducers/pizzas.reducer';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store<store.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore()
      .pipe(
        switchMap(() => {
          const pizzaId = parseInt(route.params.pizzaId);

          return this.hasPizza(pizzaId);
        }),
        catchError(()=>of(false))
      );
  }

  hasPizza(id: number) {
    return this.store.select(store.getPizzasEntities)
      .pipe(
        map( (entities: PizzaEntity) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(store.getAllPizzasLoaded)
      .pipe(
        tap(loaded => {
          if (loaded) return;

          this.store.dispatch(new store.LoadPizzas());
        }),
        filter(loaded => loaded),
        take(1)
      )
  }
}
