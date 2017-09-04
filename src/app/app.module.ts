import { HttpModule } from '@angular/http';
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

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { HomeService } from "../pages/home/home.service";

import { IonicStorageModule } from '@ionic/storage';
import { UserComponent } from "../components/user/user";
import { PromotionComponent } from '../components/promotion/promotion';
import { MenulistComponent } from '../components/menulist/menulist';
import { ProductlistComponent } from '../components/productlist/productlist';
import { AuthorizationProvider } from '../providers/authorization/authorization';
import { OrdersProvider } from '../providers/orders/orders';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e54a9601'
  }
};

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
    ReceiptPage,
    UserComponent,
    PromotionComponent,
    MenulistComponent,
    ProductlistComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
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
    HomeService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserComponent,
    PromotionComponent,
    CalculatePage,
    AuthorizationProvider,
    OrdersProvider
  ]
})
export class AppModule { }
