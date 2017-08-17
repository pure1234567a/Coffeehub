import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App, Slides } from 'ionic-angular';
import { HomePage } from "../home/home";

import { LoginService } from "./login.service";
import { UserComponent } from "../../components/user/user";
/*
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private signindata = {
    username: 'admincyber01',
    password: 'P@ssw0rd1234'
  };
  public loginForm: any;
  public backgroundImage = 'assets/img/background/imgnew.jpg';
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public app: App,
    public loginservice: LoginService, private userComp: UserComponent) {
  }





  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  goToLogin() {
    this.slider.slideTo(0);
  }

  goToSignup() {
    this.slider.slideTo(1);
  }

  slideNext() {
    this.innerSlider.slideNext();
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
  }

  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }
  presentLoadingwarnings(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'warnings',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }

  login() {
    if (this.signindata.username !== ''
      && this.signindata.password !== ''
    ) {
      console.log('Username  ' + this.signindata.username + ' : ' + 'Password  ' + this.signindata.password);
      this.loginservice.logingin(this.signindata).then(res => {
        this.userComp.userData = res;
        // console.log("User Data : " + JSON.stringify(this.userComp.userData));
        console.log('User Login');
        this.navCtrl.push(HomePage);
      }).catch(err => { this.presentLoadingwarnings('รหัสผ่านไม่ถูกต้อง'); })
      // this.navCtrl.push(HomePage);
      // this.presentLoading('Thanks for signing up!');
    }

    else if (this.signindata.username !== '') {
      this.presentLoadingwarnings('กรุณาใส่ password ให้ถูกต้อง');
    }

    else if (this.signindata.password !== '') {
      this.presentLoadingwarnings('กรุณาใส่ username ให้ถูกต้อง');
    }

    else {
      this.presentLoadingwarnings('กรุณาใส่ Username' + 'และ password');
    }


  }

  signup() {
    this.presentLoading('Thanks for signing up!');
    // this.navCtrl.push(HomePage);
  }
  resetPassword() {
    this.presentLoading('An e-mail was sent with your new password.');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  gotohome() {
    this.navCtrl.push(HomePage);
  }
}
