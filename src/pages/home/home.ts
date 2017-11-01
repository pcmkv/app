import {Component} from '@angular/core';
import {NavController , AlertController , ModalController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {RegistrationProvider} from "../../providers/registration/registration";
import {AboutPage} from "../about/about";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  private registrtionProviderData;
  private successFlag = false;
  private formRegistration:FormGroup;
  private formAuthorization:FormGroup;
  private authorization = false;
  private registration = true;

  constructor(private navCtrl: NavController,
              public modalCtrl:ModalController,
              private formBuilder:FormBuilder,
              private _registrationProvider: RegistrationProvider,
              public alertCtrl: AlertController,
              public _authUserProvider:AuthUserProvider) {

    this.formRegistration = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });


    this.formAuthorization = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    
    
  }




  logForm() {
    var obj = {
      mail: this.formRegistration.value.email,
      pass: this.formRegistration.value.password,
    };
    this._registrationProvider.registration(obj).then((data) => {
      this.registrtionProviderData = data;
      if(data.success) {
        this._registrationProvider.getUserToken(obj);
        let alert = this.alertCtrl.create({
          title: "Welcome",
          subTitle: "Registration good",
          buttons: [
            {
              text: 'GO',
             /*handler: () => {
                this.navCtrl.push(AboutPage);
              }*/
            }
          ],
        });
        alert.present();
        this.registration = false;
        this.authorization = true;
        this.successFlag = true;
      }
      else{
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: ""+data.error,
          buttons: ['OK']
        });
        alert.present();
        this.registration = true;
        this.authorization = false;
      }
      console.log("data regi",data);

    });
    console.log(obj);
  }
  
  authData;
  authUser(){
    this._authUserProvider.authorizationUser().then((data) => {
      this.authData = data; 
      console.log('authorizationUser Data', this.authData[0]);
      if (this.authData.length > 0) {
        let alert = this.alertCtrl.create({
          title: "Authorization",
          subTitle: "Authorization good",
          buttons: [
            {
              text: 'GO',
              handler: () => {
                this.navCtrl.push(AboutPage,{
                  userEmail:this.authData[0].mail
                });
              }
            }
          ],
        });
        alert.present();
      }
    });
  }




}