const DATAfridgeproduct =[
    {
        "id_sale": 1,
        "sales_timestamp": "a",
        "cbemv_amount": "2.00",
        "cbcless_amount": "2",
        "lv_amount": "2.00",
        "lv_quantity": 2,
        "cash_amount": "2.00",
        "fk_id_fridge": 1,
        "Products": [
            {
                "id_product": 1,
                "label": "prod1",
                "image": "s",
                "price": 1,
                "ubd": "s",
                "description": "s",
                "fk_id_category": null,
                "products_sales": {
                    "id_products_sales": 1,
                    "quantity_product": 2,
                    "fk_id_product": 1,
                    "fk_id_sale": 1
                }
            },
            {
                "id_product": 2,
                "label": "prod2",
                "image": "e",
                "price": 2,
                "ubd": "s",
                "description": "s",
                "createdAt": "2021-11-26T13:39:06.000Z",
                "updatedAt": "2021-11-26T13:39:07.000Z",
                "fk_id_category": 2,
                "products_sales": {
                    "id_products_sales": 2,
                    "quantity_product": 3,
                    "createdAt": "2021-12-01T16:30:16.000Z",
                    "updatedAt": "2021-12-01T16:30:17.000Z",
                    "fk_id_product": 2,
                    "fk_id_sale": 1
                }
            }
        ]
    },
    {
        "id_sale": 2,
        "sales_timestamp": "c",
        "cbemv_amount": "1.00",
        "cbcless_amount": "1",
        "lv_amount": "1.00",
        "lv_quantity": 1,
        "cash_amount": "1.00",
        "createdAt": "2021-12-01T16:30:01.000Z",
        "updatedAt": "2021-12-01T16:30:02.000Z",
        "fk_id_fridge": 1,
        "Products": [
            {
                "id_product": 3,
                "label": "prod3",
                "image": "z",
                "price": 2,
                "ubd": "z",
                "description": "z",
                "createdAt": "2021-11-30T14:51:19.000Z",
                "updatedAt": "2021-11-30T14:51:20.000Z",
                "fk_id_category": 5,
                "products_sales": {
                    "id_products_sales": 3,
                    "quantity_product": 13,
                    "createdAt": "2021-12-01T16:33:43.000Z",
                    "updatedAt": "2021-12-01T16:33:43.000Z",
                    "fk_id_product": 3,
                    "fk_id_sale": 2
                }
            }
        ]
    }
]

export default DATAfridgeproduct