import { Menu } from "../../../types/type";
import { getUrlFromStandartProducts } from "../ComboModal";


const value:Menu[] = [
    {
        "productName": "пицца Пепперони ",
        "idCombo": null,
        "description": "Пи́цца (итал. pizza) — традиционное итальянское блюдо в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и других продуктов. Небольшую пиццу иногда называют пиццеттой.",
        "url": "1.jpg",
        "productType": "Пицца",
        "ingridients": [
            {
                "price": 0,
                "name": "Говядина",
                "idIngridient": 3
            }
        ],
        "variations": [
            {
                "volume": "123 см",
                "id": 6,
                "price": 123
            }
        ]
    },
    {
        "productName": "Гавайская пицца",
        "idCombo": null,
        "description": "1",
        "url": "10.jpg",
        "productType": "Пицца",
        "ingridients": [
            {
                "price": 0,
                "name": "Говядина",
                "idIngridient": 3
            }
        ],
        "variations": [
            {
                "volume": "30 см",
                "id": 4,
                "price": 100
            },
            {
                "volume": "40 см",
                "id": 5,
                "price": 200
            }
        ]
    },
]

const expectedValue = {
    '4': "10.jpg",
    '5': "10.jpg",
    '6': "1.jpg",
}

test('Функция возвращает ключи с url', () =>{
    expect(getUrlFromStandartProducts(value)).toStrictEqual(expectedValue)
})


const test2:Menu[] = [{
    "productName": "комбо",
    "idCombo": 6,
    "description": "1",
    "url": "1.jpg",
    "productType": "Combo",
    "ingridients": null,
    "variations": {
        "defaultPrice": 1000,
        "positionArray": [
            {
                "positionName": "1",
                "content": [
                    {
                        "id_productPrice": 1,
                        "productName": "Пепси",
                        "added": 1
                    }
                ]
            },
            {
                "positionName": "3",
                "content": [
                    {
                        "id_productPrice": 3,
                        "productName": "Кола",
                        "added": 3
                    }
                ]
            },
            {
                "positionName": "2",
                "content": [
                    {
                        "id_productPrice": 2,
                        "productName": "Пепси",
                        "added": 2
                    }
                ]
            }
        ]
    }
}]



test('Элементы массивов не засчитываются', () =>{
    expect(getUrlFromStandartProducts(test2)).toStrictEqual({})
})

const final = [...value, ...test2]

test('Количество элементов равно 3', () =>{
    const objectRes = Object.keys(getUrlFromStandartProducts(final))
    expect(objectRes.length).toEqual(3)
})