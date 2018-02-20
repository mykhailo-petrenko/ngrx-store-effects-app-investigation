import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Pizza } from '../../models/pizza.model';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStrore from '../../store';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit {
  protected pizzas$: Observable<Pizza[]>;

  constructor(
    private store: Store<fromStrore.ProductsState>
  ) {}

  ngOnInit() {
    this.pizzas$ = this.store.select<Pizza[]>(fromStrore.getAllPizzas);
    this.store.dispatch(new fromStrore.LoadPizzas());
  }
}
