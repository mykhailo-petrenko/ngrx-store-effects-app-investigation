import * as store from '../store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PizzasGuard implements CanActivate {

  constructor(
    private store: Store<store.ProductsState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
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
