export class PromotionModel {
    promotions: Array<promoArray>;
}
export class promoArray {
    code: string;
    name: string;
    created: string;
    detail: string;
    discounttype: string;
    startdate: Date;
    enddate: Date;
    status: string;
    user: string;
    log: string;
    value: number;
    shop_id: string;
}