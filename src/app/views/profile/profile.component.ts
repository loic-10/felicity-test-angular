import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  links = ['info', 'services', 'subscriptions'];

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
