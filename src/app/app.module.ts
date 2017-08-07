import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePage } from '../pages/profile/profile';
import { NewandpromotionPage } from '../pages/newandpromotion/newandpromotion';
import { OrderlistPage } from '../pages/orderlist/orderlist';
import { ShopmanagementPage } from '../pages/shopmanagement/shopmanagement';
import { LoginPage } from '../pages/login/login';
import { NewsPage } from '../pages/news/news';
import { PromotionPage } from '../pages/promotion/promotion';
import { CalculatePage } from '../pages/calculate/calculate';
import { ReceiptPage } from '../pages/receipt/receipt';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    NewandpromotionPage,
    OrderlistPage,
    ShopmanagementPage,
    LoginPage,
    NewsPage,
    PromotionPage,
    CalculatePage,
    ReceiptPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    NewandpromotionPage,
    OrderlistPage,
    ShopmanagementPage,
    LoginPage,
    NewsPage,
    PromotionPage,
    CalculatePage,
    ReceiptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
