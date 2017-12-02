import {Component, OnInit} from '@angular/core';
import {Grant} from "../shared/model/grant";
import {IdentityService} from "../shared/identity.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TokenRequest} from "../shared/model/token-request";

@Component({
  selector: 'app-grants',
  templateUrl: './grants.component.html',
  styleUrls: ['./grants.component.scss']
})
export class GrantsComponent implements OnInit {

  dummyClient: string = "";

  dummyRedirect: string = "";

  grants: Array<Grant> = [];

  constructor(private idService: IdentityService, private router: Router) {
  }

  ngOnInit() {
    this.idService.getGrants().subscribe(grants => {
      this.grants = grants
    })
  }

  create() {
    this.router.navigateByUrl(
      `/authorize?response_type=token&client_id=${this.dummyClient}&redirect_uri=${this.dummyRedirect}`
    )
  }
}
