import { Injectable } from '@angular/core';
import {Http, RequestOptions ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthUserProvider {

  userToken = null;
  url = 'http://code.shoptostop.site/';

  constructor(public http: Http) {
    console.log('Hello AuthUserProvider Provider');
  }

  logOut(){
    this.userToken = null;
    localStorage.clear();
  }

  authorizationUser(){
    this.userToken = localStorage.getItem("token");
    let userInfo = {
      "token":""+this.userToken
    };
    const body = JSON.stringify(userInfo);
    console.log("Body from authorizationUser services", body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'index2.php/api/auth/', body, options)
        .map((res) => {
          console.log("Res", res);
          return res.json();
        }).toPromise();
  }

}
