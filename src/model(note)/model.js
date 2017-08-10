// product'model 
Product = {
    category: [
        {
            name: string,
            detail: string,
            subcate: string
        }
    ],
    image: [
        {
            url: string,
            id: string
        }
    ],
    shop_id: objectId,
    price: number
}

// shop'model 
Shop = {
    name: string,
    address: [
        {
            address: string,
            district: string,
            province: string,
            postcode: string
        }
    ],
    shopID: [
        {
            phone_number: string,
            email: string
        }
    ]
}

// order'model 
Order = {
    item: [
        {
            product_id: string,
            amount: number,
            qty: number
        }
    ],
    shop_id: string,
    date: date,
    net_amount: number,
    emp_id: string,
    receiptNo: string,
    change: number,
    cash: number
}