import { Injectable } from '@angular/core';
import { ShoppingCart } from '../interfaces/shopping-cart.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private _shoppingCart: BehaviorSubject<ShoppingCart> = new BehaviorSubject(
    {}
  );

  getShoppingCart$(): Observable<ShoppingCart> {
    return this._shoppingCart.asObservable();
  }

  updateShoppingCart$(shoppingCart: ShoppingCart): void {
    this._shoppingCart.next(JSON.parse(JSON.stringify(shoppingCart)));
  }

  getShoppingCart(): ShoppingCart {
    return this._shoppingCart.getValue();
  }

  updateSessionsAmount(
    sum: boolean,
    sessionId: string,
    eventId: string,
    eventTitle: string = ''
  ): void {
    const shoppingCart = this.getShoppingCart();
    const shoppingCartById = shoppingCart[eventId];

    if (shoppingCartById) {
      const amount: number = shoppingCartById.sessionsMap[sessionId];

      const result: number =
        amount != undefined ? (sum ? amount + 1 : amount - 1) : 1;

      if (result) {
        shoppingCartById.sessionsMap[sessionId] = result;
      } else {
        delete shoppingCartById.sessionsMap[sessionId];
      }

      if (Object.keys(shoppingCartById.sessionsMap).length) {
        shoppingCart[eventId] = shoppingCartById;
      } else {
        delete shoppingCart[eventId];
      }
    } else {
      const sessionsMap: { [date: string]: number } = {};
      sessionsMap[sessionId] = 1;

      shoppingCart[eventId] = {
        title: eventTitle,
        sessionsMap,
      };
    }
    this.updateShoppingCart$(shoppingCart);
  }
}
