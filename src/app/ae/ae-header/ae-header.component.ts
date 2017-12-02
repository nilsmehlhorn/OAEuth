import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ae-header',
  templateUrl: './ae-header.component.html',
  styleUrls: ['./ae-header.component.scss']
})
export class AeHeaderComponent implements OnInit {

  @Input('name') name;

  constructor() { }

  ngOnInit() {
  }

}
