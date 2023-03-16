import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { warningAssistance } from '../../helpers/warning-assistance';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { UserActions } from '../../store';
import { User } from '../../interfaces';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionFormComponent } from '../subscriptions';
import { RegisterComponent } from '../auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = 'Disconnection';
  message = `Are you sure you want to do it?`;
  loadingNavigation = false;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  @Input() user: User | null | undefined = null;
  @Input() drawer!: MatDrawer;

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loadingNavigation = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loadingNavigation = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    warningAssistance(this.title, this.message, () => {
      this.store.dispatch(UserActions.tryLogout());
    });
  }

  openModalToRegister() {
    this.dialog.open(RegisterComponent, {
      width: '500px',
      autoFocus: false,
    });
  }
}
