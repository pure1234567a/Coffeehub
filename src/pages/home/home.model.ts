export class HomeModel {
    orders: Array<OrderItemModel>;
    products: Array<ProductItemModel>;
}

export class OrderItemModel {
    item: [
        {
            product_id: string;
            amount: number;
            qty: number;
        }
    ];
    shop_id: string;
    date: string;
    net_amount: number;
    emp_id: string;
    receiptNo: string;
    change: number;
    cash: number;
}
export class ProductItemModel {
    category: [
        {
            name: string;
            detail: string;
            subcate: string;
        }
    ];
    image: [{
        url: string,
        id: string
    }]
    name: string;
    shop_id: string;
    price: number;
    user: {
        id: string;
        displayName: string;
    }
    created: Date;
}

