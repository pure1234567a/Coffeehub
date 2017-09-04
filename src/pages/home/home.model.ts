export class HomeModel {
    // orders: Array<OrderItemModel>;
    products: Array<ProductItemModel>;
}

////// USE FOR ORDER PVD //////
export class OrderItemModel {
    item: Array<itemArray>;
    shop_id: string;
    date: string;
    net_amount: number;
    receiptNo: string;
    change: number;
    cash: number;
}

export class itemArray {
    product_id: string;
    amount: number;
    qty: number;
    sweetness: string;
    degrees: string;
}
////// USE FOR ORDER PVD //////

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



export class ItemOfOrder {
    product_id: string;
    amount: number;
    qty: number;
}