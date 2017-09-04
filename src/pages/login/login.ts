import { AuthorizationProvider } from '../../providers/authorization/authorization';
import { UserModel } from '../../components/user/user.model';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App, Slides } from 'ionic-angular';
import { HomePage } from "../home/home";

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
    /////// Comment when PRD useage //////
    username: 'admincyber01',
    password: 'P@ssw0rd1234'
    /////// Comment when PRD useage //////
  };

  private user: UserModel = new UserModel();
  public loginForm: any;
  public backgroundImage = 'assets/img/background/imgnew.jpg';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    private userComp: UserComponent,
    private authorizePVD: AuthorizationProvider
  ) {
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


  login() {
    const loading = this.loadingCtrl.create({
    });
    loading.present();
    if (this.signindata.username !== ''
      && this.signindata.password !== ''
    ) {
      console.log('Username  ' + this.signindata.username + ' : ' + 'Password  ' + this.signindata.password);
      this.authorizePVD.signin(this.signindata).then(res => {
        this.user = res;
        // this.userComp.userData = res;
        window.localStorage.setItem("user", JSON.stringify(this.user));
        // console.log("User Data : " + JSON.stringify(this.userComp.userData));
        console.log('User Login');
        loading.dismiss();
        this.navCtrl.push(HomePage);
      }).catch(err => {
        loading.dismiss();
        alert('Login failed \nPlease check your username or password');
      })
      // this.navCtrl.push(HomePage);
      // this.presentLoading('Thanks for signing up!');
    }

    else if (this.signindata.username !== '') {
      alert('กรุณาใส่ password ให้ถูกต้อง');
    }

    else if (this.signindata.password !== '') {
      alert('กรุณาใส่ username ให้ถูกต้อง');
    }

    else {
      alert('กรุณาใส่ Username' + 'และ password');
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
