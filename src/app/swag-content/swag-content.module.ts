import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwagContentPage } from './swag-content.page';
import { ComponentsModule } from '../components/components.module';
import { SafePipe } from '../safe.pipe';
import { SwagHighlightPipe } from '../pipes/swag-highlight.pipe';
import { SummaryPipe } from '../summary.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: SwagContentPage }])
  ],
  declarations: [
    SwagContentPage,
    SafePipe, 
    SummaryPipe,
    SwagHighlightPipe
  ]
})
export class SwagContentPageModule {}