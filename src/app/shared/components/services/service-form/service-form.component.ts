import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Service } from '../../../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ServiceActions, ServiceSelectors } from '../../../store';
import { CustomValidators } from '../../../helpers/custom-validators';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceFormComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  public form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    available: [true, Validators.required],
  });

  selectServiceSubmitLoading$ = this.store.select(
    ServiceSelectors.selectServiceSubmitLoading
  );
  selectServiceSubmitError$ = this.store.select(
    ServiceSelectors.selectServiceSubmitError
  );
  selectServiceSubmitSuccess$ = this.store.select(
    ServiceSelectors.selectServiceSubmitSuccess
  );

  constructor(
    public dialogRef: MatDialogRef<ServiceFormComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public service: Service,
    public store: Store,
    private cdRef: ChangeDetectorRef
  ) {
    if (service?.id) {
      this.form.setValue({
        name: service.name,
        description: service.description,
        price: service.price,
        available: service.available,
      });
    }
  }

  ngOnInit(): void {
    this.selectServiceSubmitSuccess$.subscribe((message) => {
      if (message) {
        this.close();
        this.store.dispatch(ServiceActions.successCreateServiceDto({}));
      }
    });
  }

  onSubmit() {
    this.store.dispatch(
      ServiceActions.tryCreateServiceDto({
        serviceCreate: {
          ...this.form.value,
        },
      })
    );
  }

  public customErrorField = (controlName: string, errorName: string) => {
    return CustomValidators.customErrorField(this.form, controlName, errorName);
  };

  close() {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
