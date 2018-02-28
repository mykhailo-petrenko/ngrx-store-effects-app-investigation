
import * as actions from '../action/router.action';

import { Injectable } from "@angular/core";
import { Location } from '@angular/common'
import { Actions, Effect } from "@ngrx/effects";
import { Router } from "@angular/router";
import { pluck, tap } from "rxjs/operators";

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({
    dispatch: false
  })
  navigate$ = this.actions$
    .ofType(actions.GO)
    .pipe(
      pluck('payload'),
      tap(({path, query: queryParams, extras}) => {

        this.router.navigate(
          path,
          {
            queryParams,
            ...extras
          }
        );

      })
    );

  @Effect({
    dispatch: false
  })
  back$ = this.actions$
    .ofType(actions.BACK)
    .pipe(
      tap(() => { this.location.back(); } )
    );

  @Effect({
    dispatch: false
  })
  forward$ = this.actions$
    .ofType(actions.BACK)
    .pipe(
      tap(() => { this.location.forward(); } )
    );
}

