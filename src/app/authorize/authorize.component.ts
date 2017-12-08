import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {TokenRequest} from "../shared/model/token-request";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IdentityService} from "../shared/identity.service";

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  req: TokenRequest;

  constructor(private activatedRoute: ActivatedRoute, private idService: IdentityService,
              private location: Location) {
  }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.queryParams
      .map((params: Params) => {
        const req = new TokenRequest();
        req.clientId = params['client_id'];
        req.redirectUri = params['redirect_uri'];
        req.responseType = params['response_type'];
        return req;
      })
      .subscribe((req) => {
        this.req = req
      });
  }

  addGrant(request: TokenRequest) {
    this.idService.generateToken(request).subscribe(token => {
      console.log("Token: " + token);
      window.location.href = request.redirectUri + "#" + token;
    });
  }

  cancel() {
    // return
    this.location.back();
  }

}
