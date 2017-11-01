import { Injectable } from '@angular/core';
import {Http, RequestOptions ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the RegistrationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegistrationProvider {

    url = 'http://code.shoptostop.site/';

    constructor(public http:Http) {
    }


    token:string = null;

    registration(data:any) {
        const body = JSON.stringify(data);
        console.log("Body from services", body);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.url + 'index2.php/api/registration/', body, options)
            .map((res) => {
                console.log("Res", res);
                return res.json();
            }).toPromise();
    }


    getUserToken(data:any) {
        const body = JSON.stringify(data);
        console.log("Body from services", body);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.url + 'index2.php/api/token/', body, options)
            .map((res) => { 
                console.log("Res", res);
                return res.json(); 
            }).toPromise().then((data) => {
                this.token  =  data.token;
                console.log('getUserTokenService Data', data);
                localStorage.setItem('token', data.token);
            })
    }
}
