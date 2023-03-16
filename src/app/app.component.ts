import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './shared/interfaces';
import { UserActions, UserSelectors } from './shared/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
  implements AfterViewInit, AfterViewChecked, OnInit, OnDestroy
{
  user$: Observable<User | null | undefined> = this.store.select(
    UserSelectors.selectCurrentUser
  );

  userLoading$: Observable<boolean> = this.store.select(
    UserSelectors.selectCurrentUserLoading
  );

  constructor(private store: Store, private cdRef: ChangeDetectorRef) {
    this.store.dispatch(UserActions.tryGetProfile());
  }

  ngAfterViewInit(): void {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit() {}
  ngOnDestroy() {}
}
