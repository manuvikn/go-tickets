import { NgModule } from '@angular/core';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GoTicketsComponent } from './go-tickets.component';

const ROUTES: Routes = [
  {
    path: '',
    component: GoTicketsComponent,
    children: [
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
          import(
            './pages/purchase-details/purchase-details-page.component'
          ).then((c) => c.PurchaseDetailsPageComponent),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule,
    NavBarComponent,
    FooterComponent,
  ],
  exports: [RouterModule],
  declarations: [GoTicketsComponent],
})
export class GoTicketsModule {}
