import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwagContentPage } from './swag-content.page';

const routes: Routes = [
  {
    path: '',
    component: SwagContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwagContentPageRoutingModule {}