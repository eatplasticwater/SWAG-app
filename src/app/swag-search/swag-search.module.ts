import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwagSearchPageRoutingModule } from './swag-search-routing.module';
import { SwagSearchPage } from './swag-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwagSearchPageRoutingModule
  ],
  declarations: [
    SwagSearchPage
  ]
})
export class SwagSearchPageModule {}
