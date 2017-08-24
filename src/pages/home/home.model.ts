export class HomeModel {
    // orders: Array<OrderItemModel>;
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
    category: Array<CategoryModel>;
    image: Array<imgModel>;
    name: string;
    shop_id: string;
    price: number;
    user: string;
    created: string;
    _id: string;
}
export class CategoryModel {
    name: string;
    detail: string;
    subcate: string;
}
export class imgModel {
    url: string;
    id: string;
}