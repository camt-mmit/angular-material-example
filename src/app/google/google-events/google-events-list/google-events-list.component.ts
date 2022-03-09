import { Component, Input, OnInit } from '@angular/core';
import { displayEventTimeRange, EventsList } from '../../models';

@Component({
  selector: 'app-google-events-list',
  templateUrl: './google-events-list.component.html',
  styleUrls: ['./google-events-list.component.scss'],
})
export class GoogleEventsListComponent implements OnInit {
  @Input() data: EventsList | null = null;

  readonly displayEventTimeRange = displayEventTimeRange;

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
