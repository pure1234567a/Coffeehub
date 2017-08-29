import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { NewandpromotionPage } from '../pages/newandpromotion/newandpromotion';
import { OrderlistPage } from '../pages/orderlist/orderlist';
import { ShopmanagementPage } from '../pages/shopmanagement/shopmanagement';
import { LoginPage } from '../pages/login/login';
import { PagetestPage } from "../pages/pagetest/pagetest";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  public test1: any;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Orderlist', component: OrderlistPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'News & Promotion', component: NewandpromotionPage },
      { title: 'Shopmanagement', component: ShopmanagementPage },
      { title: 'Log out', component: LoginPage }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}