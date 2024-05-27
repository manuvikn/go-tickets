export interface ShoppingCart {
  [id: string]: ShoppingCartById | undefined;
}

export interface ShoppingCartById {
  title: string;
  sessionsMap: SessionsMap;
}

export interface SessionsMap {
  [date: string]: number;
}
