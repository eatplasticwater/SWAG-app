import { Component} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';

import { counterRangeValidator } from '../../components/counter-input/counter-input.component';

@Component({
  selector: 'app-forms-filters-page',
  templateUrl: './forms-filters.page.html',
  styleUrls: [
    './styles/forms-filters.page.scss',
    './styles/forms-filters.ssr.scss'
  ]
})
export class FormsFiltersPage {
  rangeForm: any;
  checkboxForm: UntypedFormGroup;
  radioForm: UntypedFormGroup;
  checkboxTagsForm: UntypedFormGroup;
  radioTagsForm: UntypedFormGroup;
  switchersForm: UntypedFormGroup;
  counterForm: any;
  ratingForm: UntypedFormGroup;
  radioColorForm: UntypedFormGroup;

  constructor() {
    this.rangeForm = new UntypedFormGroup({
      single: new UntypedFormControl(25),
      dual: new UntypedFormControl({lower: 12, upper: 23})
    });

    this.checkboxForm = new UntypedFormGroup({
      person_1: new UntypedFormControl(true),
      person_2: new UntypedFormControl(false),
      person_3: new UntypedFormControl(false),
      person_4: new UntypedFormControl(true),
      person_5: new UntypedFormControl(false)
    });

    this.radioForm = new UntypedFormGroup({
      selected_option: new UntypedFormControl('apple')
    });

    this.checkboxTagsForm = new UntypedFormGroup({
      tag_1: new UntypedFormControl(true),
      tag_2: new UntypedFormControl(false),
      tag_3: new UntypedFormControl(true),
      tag_4: new UntypedFormControl(true),
      tag_5: new UntypedFormControl(false),
      tag_6: new UntypedFormControl(false),
      tag_7: new UntypedFormControl({value: true, disabled: true}),
      tag_8: new UntypedFormControl(false)
    });

    this.radioTagsForm = new UntypedFormGroup({
      selected_option: new UntypedFormControl('any')
    });

    this.switchersForm = new UntypedFormGroup({
      notifications: new UntypedFormControl(true),
      email_notifications: new UntypedFormControl(false)
    });

    this.counterForm = new UntypedFormGroup({
      counter: new UntypedFormControl(5, counterRangeValidator(1, 7)),
      counter2: new UntypedFormControl(2, counterRangeValidator(1, 5))
    });

    this.ratingForm = new UntypedFormGroup({
      rate: new UntypedFormControl(2.5),
      rate2: new UntypedFormControl(1.5)
    });

    this.radioColorForm = new UntypedFormGroup({
      selected_color: new UntypedFormControl('#fc9961')
    });
  }

  rangeChange(range: Range) {
    console.log('range change', range);
  }
}
