import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { ProductsState, getSelectedPizza } from "../../store";

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.components.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise: Pizza;
  toppings: Topping[];

  constructor(
    private store: Store<ProductsState>
  ) {}

  ngOnInit() {
    this.pizza$ = this.store.select(getSelectedPizza);
  }

  onSelect(event: number[]) {

  }

  onCreate(event: Pizza) {

  }

  onUpdate(event: Pizza) {

  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {

    }
  }
}
