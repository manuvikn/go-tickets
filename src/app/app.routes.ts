import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/catalog/catalog-page.component').then(
        (c) => c.CatalogPageComponent
      ),
  },
  {
    path: 'purchase-details',
    loadComponent: () =>
      import('./pages/purchase-details/purchase-details-page.component').then(
        (c) => c.PurchaseDetailsPageComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
