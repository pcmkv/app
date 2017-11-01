import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistrationProvider } from '../providers/registration/registration';
import {HttpModule} from "@angular/http";
//import {SecondPage} from "../pages/second/second";
import { Camera} from '@ionic-native/camera';
import { AuthUserProvider } from '../providers/auth-user/auth-user';
import { GetTokenProvider } from '../providers/get-token/get-token';
import {Crop} from "@ionic-native/crop";
import {Base64} from "@ionic-native/base64";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    //SecondPage
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    //SecondPage
  ],
  providers: [
    StatusBar,
    Camera,
    Base64,
    SplashScreen,
    Crop,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegistrationProvider,
    AuthUserProvider,
    GetTokenProvider
  ]
})
export class AppModule {}
