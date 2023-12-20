import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwagIndexPage } from './swag-index.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: SwagIndexPage }])
  ],
  declarations: [SwagIndexPage]
})
export class SwagIndexPageModule {}