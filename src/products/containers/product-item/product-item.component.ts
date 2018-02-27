import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { ProductsState, getSelectedPizza, getAllToppings } from "../../store";
import { CreatePizza, DeletePizza, UpdatePizza, VisualizeToppings } from "../../store/actions";
import { getPizzaVisualized } from "../../store/selectors";

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.components.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  protected pizza$: Observable<Pizza>;
  protected visualise$: Observable<Pizza>;
  protected toppings$: Observable<Topping[]>;

  constructor(
    private store: Store<ProductsState>
  ) {}

  ngOnInit() {
    this.pizza$ = this.store.select(getSelectedPizza)
      .pipe(
        tap(
          (pizza: Pizza = null) => {
            const isPizzaExist = !!(pizza && pizza.toppings);
            const toppings = isPizzaExist ? pizza.toppings.map(topping => topping.id) : [];
            this.store.dispatch(new VisualizeToppings(toppings));
          }
        )
      );
    this.visualise$ = this.store.select(getPizzaVisualized);
    this.toppings$ = this.store.select(getAllToppings);

  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualizeToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new DeletePizza(event));
    }
  }
}
