import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appStatus]',
})
export class StatusDirective implements OnInit, OnChanges {
  @Input('status') status!: string;

  @Input() @HostBinding('class') public class!: string;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    let custom: { text: string; class: string };
    switch (this.status) {
      case 'cancel':
        custom = {
          text: 'Cancel',
          class: 'text-danger',
        };
        break;
      case 'in_pending':
        custom = {
          text: 'In Pending',
          class: 'text-accent',
        };
        break;
      case 'in_composition':
        custom = {
          text: 'In Composition',
          class: 'text-warning',
        };
        break;
      case 'valid':
        custom = {
          text: 'Valid',
          class: 'text-info',
        };
        break;
      case 'delivered':
        custom = {
          text: 'Delivered',
          class: 'text-success',
        };
        break;
      case 'paid':
        custom = {
          text: 'Paid',
          class: 'text-success',
        };
        break;
      case 'unpaid':
        custom = {
          text: 'Unpaid',
          class: 'text-danger',
        };
        break;
      case 'false':
        custom = {
          text: 'Disable',
          class: 'text-danger',
        };
        break;
      case 'true':
        custom = {
          text: 'Enable',
          class: 'text-success',
        };
        break;
      case 'invited':
        custom = {
          text: 'Invited',
          class: 'text-warning',
        };
        break;
      case 'standard':
        custom = {
          text: 'Standard',
          class: 'text-info',
        };
        break;
      case 'admin':
        custom = {
          text: 'Admin',
          class: 'text-success',
        };
        break;
      default:
        custom = {
          text: 'Cancel',
          class: 'text-danger',
        };
        break;
    }
    this.el.nativeElement.className = custom.class;
    this.el.nativeElement.innerHTML = custom.text;
  }
}
