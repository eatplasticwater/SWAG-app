import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwagIndexPage } from './swag-index.page';

const routes: Routes = [
  {
    path: '',
    component: SwagIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwagIndexPageRoutingModule {}
