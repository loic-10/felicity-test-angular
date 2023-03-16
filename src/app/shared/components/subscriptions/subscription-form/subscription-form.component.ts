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
import { SubscriptionActions, SubscriptionSelectors } from '../../../store';
import { CustomValidators } from '../../../helpers/custom-validators';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubscriptionFormComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  public form: FormGroup = this.fb.group({
    service: [0, Validators.required],
    period: [0, Validators.required],
  });

  selectSubscriptionSubmitLoading$ = this.store.select(
    SubscriptionSelectors.selectSubscriptionSubmitLoading
  );
  selectSubscriptionSubmitError$ = this.store.select(
    SubscriptionSelectors.selectSubscriptionSubmitError
  );
  selectSubscriptionSubmitSuccess$ = this.store.select(
    SubscriptionSelectors.selectSubscriptionSubmitSuccess
  );

  constructor(
    public dialogRef: MatDialogRef<SubscriptionFormComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public service: Service,
    public store: Store,
    private cdRef: ChangeDetectorRef
  ) {
    if (service?.id) {
      this.form.setValue({
        service: service.id,
        period: 0,
      });
    }
  }

  ngOnInit(): void {
    this.selectSubscriptionSubmitSuccess$.subscribe((message) => {
      if (message) {
        this.close();
        this.store.dispatch(
          SubscriptionActions.successCreateSubscriptionDto({})
        );
      }
    });
  }

  onSubmit() {
    this.store.dispatch(
      SubscriptionActions.tryCreateSubscriptionDto({
        subscriptionCreate: {
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
