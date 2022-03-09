import { Component, Input, OnInit } from '@angular/core';
import {
  ConnectionsList,
  displayEmailAddress,
  displayName,
  displayPhoneNumber,
  urlPhotos,
} from '../../models';

@Component({
  selector: 'app-google-connections-list',
  templateUrl: './google-connections-list.component.html',
  styleUrls: ['./google-connections-list.component.scss'],
})
export class GoogleConnectionsListComponent implements OnInit {
  @Input() data: ConnectionsList | null = null;

  readonly displayName = displayName;
  readonly displayPhoneNumber = displayPhoneNumber;
  readonly displayEmailAddress = displayEmailAddress;
  readonly urlPhotos = urlPhotos;

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
