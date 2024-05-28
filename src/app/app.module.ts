import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./go-tickets/go-tickets.module').then((m) => m.GoTicketsModule),
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), HttpClientModule],
  exports: [RouterModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
