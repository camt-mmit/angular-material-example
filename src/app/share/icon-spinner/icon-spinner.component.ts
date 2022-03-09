import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-spinner',
  templateUrl: './icon-spinner.component.html',
  styleUrls: ['./icon-spinner.component.scss'],
})
export class IconSpinnerComponent implements OnInit {
  @Input() processing = false;

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
