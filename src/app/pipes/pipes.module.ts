import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgFloorPipeModule } from 'angular-pipes';

import { TimeDifferencePipe } from './time-difference.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { SwagHighlightPipe } from './swag-highlight.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgFloorPipeModule
  ],
  declarations: [
    TimeDifferencePipe,
    TimeAgoPipe,
    SwagHighlightPipe
  ],
  exports: [
    NgFloorPipeModule,
    TimeDifferencePipe,
    TimeAgoPipe
  ]
})
export class PipesModule {}
