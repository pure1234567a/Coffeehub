import { Component } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { PromotionModel } from "../../pages/calculate/calculate.model";
/**
 * Generated class for the PromotionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'promotion',
  templateUrl: 'promotion.html'
})
export class PromotionComponent {

  promotiondata: PromotionModel = new PromotionModel();
  promotiondata2: Array<any> = [];
  constructor(public http: Http,
    public events: Events) {

  }

  validatePromotion(promocode) {
    this.getData().then((res) => {
      this.promotiondata = res;
      let today: Date = new Date;
      // console.log(this.promotiondata);
      // let dataaa = res.promotions.find(promocode);
      // console.log("LOG : " + dataaa);
      let getpromo = this.promotiondata.promotions.find(data2 => { return data2.code == promocode; });
      if (!getpromo) {
        alert("Promoion code not found");
      } else if (getpromo) {
        this.events.publish('getpro', getpromo);
        // console.log("Send Promo / Promotions.ts " + JSON.stringify(getpromo));
      }
      // res.promotions.forEach(function (data) {
      //   if (data.code === promocode) {
      //     console.log("Today : " + today + "\n StartDate : " + data.startdate);
      //     // if (today > data.startdate) {

      //     // }
      //     // return data;
      //   } else {
      //     alert("Promoion code not found");
      //   }

      // });
      // alert("YEAH!!! : " + promocode + " : " + this.promotiondata.promotions.find();
      // if (this.promotiondata2["code"] == promocode) {
      //   alert("ssss");
      // } else {
      //   alert("NOOOOOOO!!!");
      // }
      // console.log("PROMOTION DATA : " + res);
    }
    ).catch((err) => {
      console.log("Error Promotion : " + err);
    }
      );


  }
  getData(): Promise<PromotionModel> {
    return this.http.get('./assets/data/promotions.json')
      .toPromise()
      .then(response => response.json() as PromotionModel)
      .catch();
  }
}
