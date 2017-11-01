import {Component, ViewChild, ElementRef} from '@angular/core';
import { NavController,AlertController ,NavParams ,ViewController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import {DomSanitizer} from '@angular/platform-browser';
import {HomePage} from "../home/home";
import {AuthUserProvider} from "../../providers/auth-user/auth-user";
import {Crop} from "@ionic-native/crop";
import {Base64} from "@ionic-native/base64";
import  * as Cropper  from 'cropperjs';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  cameraData:string;
  photoTaken:boolean;
  cameraUrl:string;
  photoSelected:boolean;
  pathFileImage;
  userAboutInfo;
  showBtnCrop = false;
  cropper: Cropper;

  @ViewChild('imageSrc') imageElement: ElementRef;
  croppedImg:any;
  cropperInstance: any;
  cameraUrlCropper: any;
  getCameraOptions() {
    // just an example working config
    let cameraOpts: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
    };

    return cameraOpts;
  }
  constructor(public navCtrl:NavController,
              public alertCtrl:AlertController,
              private camera:Camera,
              private _domSanitizer:DomSanitizer,
              public navParams:NavParams,
              private _authUserProvider:AuthUserProvider,
              private base64:Base64,
              public viewCtrl: ViewController) {
    this.photoTaken = false;
    this.userAboutInfo = this.navParams.get('userEmail');
  }

  imgURI;
  ngOnInit(){

    this.camera.getPicture(this.getCameraOptions()).then((imageData) => {

      this.imgURI = 'data:image/jpeg;base64,' + imageData;

     /* let alert = this.alertCtrl.create({
        title: "elem",
        subTitle: ""+this.imageElement.nativeElement,
        buttons: ['OK']
      });
      alert.present();*/

      this.imageElement.nativeElement.src = imageData;
      this.base64.encodeFile(imageData).then((base64File:string) => {
        this.cameraUrlCropper = base64File;
      });
     /* let alert = this.alertCtrl.create({
        title: "IMG",
        subTitle: ""+this.imgURI,
        buttons: ['OK']
      });*/

     /* this.cropImage();*/
    }, (error) => {
      let alert = this.alertCtrl.create({
        title: "ER",
        subTitle: ""+error,
        buttons: ['OK']
      });
      alert.present();
    });
  }


  cropImage() {
    this.cropperInstance = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: NaN, //1 / 1 square
      dragMode: 'move',
      modal: true,
      guides: true,
      highlight: false,
      background: false,
      autoCrop: true,
      autoCropArea: 0.9,
      responsive: true,
      zoomable: true,
      movable: false
    });

    return this.cropperInstance;
  }

  cropDone() {
   let croppedImgB64String:string = this.cropImage().getCroppedCanvas({
      width: 500,
      height: 500
    }).toDataURL('image/jpeg', (90 / 100));

    
  }

  rotateImage(){
    let alert = this.alertCtrl.create({
      title: "rotateImg",
      subTitle: "rotateImg Test",
      buttons: ['OK']
    });
    alert.present();
  }

  imageFullPath = null;
  imageData;
  cameraUrlImg;
  newImageBool = false;
  newImageP;
  newImageC;
  newUrlC;



  convertFileToDataURLviaFileReader(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }

  newUrl;

  selectFromGallery() {
    var options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI, //NATIVE_URI //FILE_URI,
      encodingType: 1,
      /* quality: 50,
       destinationType: 1,
       sourceType: 0,
       */
      /*allowEdit: false,
       encodingType: 1,
       mediaType: 0,
       correctOrientation: true,
       saveToPhotoAlbum: false,
       cameraDirection: 1*/
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      this.cameraUrl = /* 'data:image/jpeg;base64,' + */ imageData;
      this.base64.encodeFile(imageData).then((base64File:string) => {
        this.cameraUrlImg = base64File;
        this.newUrl = base64File.replace("*;charset=utf-8", 'jpeg');
        /* let alert = this.alertCtrl.create({
         title: "baseFile Data",
         subTitle: "D:"+this.newUrl,
         buttons: ['OK']
         });
         alert.present();*/
      });

      this.convertFileToDataURLviaFileReader(imageData, function (base64Data) {
        //do something with base64Date

        //show image
        /*let alert = this.alertCtrl.create({
         title: "Convert",
         subTitle: "64:"+ base64Data,
         buttons: ['OK']
         });
         alert.present();*/
      });

      this.photoSelected = true;
      this.newImageBool = false;
      this.showBtnCrop = true;
      this.photoTaken = false;
      /* let alert = this.alertCtrl.create({
       title: "Data",
       subTitle: "img" + imageData,
       buttons: ['OK']
       });
       alert.present();*/
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "" + err,
        buttons: ['OK']
      });
      alert.present();
    })
  }


  openCamera() {
    var options = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL
    };
    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = 'data:image/jpeg;base64,' + imageData;
      this.photoTaken = true;
      this.photoSelected = false;
    }, (err) => {
      // Handle error
    });
  }

  logOut() {
    this._authUserProvider.logOut();
    this.navCtrl.pop(HomePage);
  }






  /* cropImage() {
    this.crop.crop(this.cameraUrl, {quality: 75})
        .then(
            newImage => {
              //'data:image/jpeg;base64,' +
              this.newImageP =  newImage;
              this.base64.encodeFile(this.newImageP).then((base64File:string) => {
                    this.newImageC = base64File;
                    this.newImageBool = true;
                    this.photoSelected = false;
                    this.newUrlC = base64File.replace("*;charset=utf-8", 'jpeg');
                    let alert = this.alertCtrl.create({
                     title: "DataCrop",
                     subTitle: ""+this.newUrlC,
                     buttons: ['OK']
                     });
                     alert.present();
                     })
                  },
                  error => console.error('Error cropping image', error)
              );

            })
  }*/
}
