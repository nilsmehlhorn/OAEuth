import {Component, OnInit} from '@angular/core';
import {Grant} from "../shared/model/grant";

@Component({
  selector: 'app-grants',
  templateUrl: './grants.component.html',
  styleUrls: ['./grants.component.scss']
})
export class GrantsComponent implements OnInit {

  grants = [
    new Grant("Spotify", Date.now(), "assets/spotify.png"),
    new Grant("Netflix", Date.now(), "assets/netflix.png")
  ]

  constructor() {
  }

  ngOnInit() {
  }

}
