import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Stock} from "../../../interface/stock";
import {StockManagementService} from "../../../service/stock-management.service";
import {StockAdminService} from "../../../service/stock-admin.service";

@Component({
  selector: 'app-shared-form-stock-admin',
  templateUrl: './stock-admin.component.html',
  styleUrls: ['./stock-admin.component.scss'],
})
export class StockAdminComponent implements OnInit {
  public stockAdminFormGroup: FormGroup;

  public vwdKey: AbstractControl;
  public submissionTouched: boolean;

  @Input() defaultValue: Stock | null = null;
  @Input() disabledField: Array<string> = [];

  @Output() formSubmission = new EventEmitter<string>();

  constructor() {
    this.stockAdminFormGroup = new FormGroup({
      vwdKey: new FormControl('', { updateOn: 'change', validators: Validators.required }), // Stock Symbol
    });
    this.vwdKey = this.stockAdminFormGroup.controls.vwdKey;
    this.submissionTouched = false;
  }

  ngOnInit(): void {
    // Check if the form has default value
    this.vwdKey.setValue(this.defaultValue?.vwdKey);
    if (this.disabledField.includes('vwdKey')) {
      this.vwdKey.disable();
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
