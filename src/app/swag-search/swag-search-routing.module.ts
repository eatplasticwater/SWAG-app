import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwagSearchPage } from './swag-search.page';

const routes: Routes = [
  {
    path: '',
    component: SwagSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwagSearchPageRoutingModule {}
