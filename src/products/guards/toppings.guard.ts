import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import * as store from '../store';
import { Observable } from 'rxjs/Observable';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<store.ProductsState>) {}

  canActivate() {
    return this.checkStore()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  private checkStore(): Observable<boolean> {
    return this.store.select(store.getToppingsLoaded)
      .pipe(
        tap((loaded: boolean) => {
          if (loaded) return;

          this.store.dispatch(new store.LoadToppings());
        }),
        filter(loaded => loaded),
        take(1)
      )
  }
}
