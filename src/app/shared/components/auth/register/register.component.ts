import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserActions, UserSelectors } from '../../../store';
import { CustomValidators } from '../../../helpers/custom-validators';

@Component({
  selector: 'app-service-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  public form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    full_name: ['', Validators.required],
    role: ['', Validators.required],
  });

  roles = ['customer', 'admin'];

  selectUserSubmitLoading$ = this.store.select(
    UserSelectors.selectUserSubmitLoading
  );
  selectUserSubmitError$ = this.store.select(
    UserSelectors.selectUserSubmitError
  );
  selectUserSubmitSuccess$ = this.store.select(
    UserSelectors.selectUserSubmitSuccess
  );

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    public fb: FormBuilder,
    public store: Store,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.selectUserSubmitSuccess$.subscribe((message) => {
      if (message) {
        this.close();
        this.store.dispatch(UserActions.successRegister({}));
      }
    });
  }

  onSubmit() {
    this.store.dispatch(
      UserActions.tryRegister({
        register: {
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
