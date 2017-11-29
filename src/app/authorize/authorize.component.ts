import {Component, OnInit} from '@angular/core';
import {TokenRequest} from "../shared/model/token-request";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  req: TokenRequest;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
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
        console.log(req)
        this.req = req
      });
  }

  addGrant(request: TokenRequest) {
    const token = "";
    window.location.href = request.redirectUri + "#" + token;
  }

  cancel() {
    this.router.navigateByUrl("/")
  }

}
