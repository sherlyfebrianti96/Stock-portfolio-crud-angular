import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Stock} from "../../../interface/stock";

@Component({
  selector: 'app-shared-form-stock-admin',
  templateUrl: './stock-admin.component.html',
  styleUrls: ['./stock-admin.component.scss'],
})
export class StockAdminComponent implements OnInit {
  public stockAdminFormGroup: FormGroup;

  public name: AbstractControl;
  public isin: AbstractControl;
  public price: AbstractControl;
  public submissionTouched: boolean;

  @Input() defaultValue: Stock | null = null;
  @Input() disabledField: Array<string> = [];

  @Output() formSubmission = new EventEmitter<string>();

  constructor() {
    this.stockAdminFormGroup = new FormGroup({
      name: new FormControl('', { updateOn: 'change', validators: Validators.required }),
      isin: new FormControl('', { updateOn: 'change', validators: Validators.required }), // Stock Symbol
      price: new FormControl('', { updateOn: 'change', validators: Validators.required }),
    });
    this.name = this.stockAdminFormGroup.controls.name;
    this.isin = this.stockAdminFormGroup.controls.isin;
    this.price = this.stockAdminFormGroup.controls.price;
    this.submissionTouched = false;
  }

  ngOnInit(): void {
    // Check if the form has default value
    this.name.setValue(this.defaultValue?.name);
    this.isin.setValue(this.defaultValue?.isin);
    this.price.setValue(this.defaultValue?.price);
    if (this.disabledField.includes('isin')) {
      this.isin.disable();
    }
  }

  submission(evt: Event) {
    evt.preventDefault();
    this.submissionTouched = true;
    if (this.stockAdminFormGroup.valid) {
      this.formSubmission.emit(this.stockAdminFormGroup.value);
    }
  }

}
