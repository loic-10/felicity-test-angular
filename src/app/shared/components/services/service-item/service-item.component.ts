import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Service, User } from '../../../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SubscriptionFormComponent } from '../../subscriptions';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceItemComponent implements OnInit {
  @Input() service!: Service;
  @Input() user?: User | null;

  ngOnInit(): void {}

  constructor(public dialog: MatDialog, public store: Store) {}
  openModalToSubscribe() {
    this.dialog.open(SubscriptionFormComponent, {
      width: '500px',
      autoFocus: false,
      data: this.service,
    });
  }
}
