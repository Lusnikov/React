import { objectContain } from "./map.service"
import { myType } from "./map.service"
// Москва - Матвеевский район
const MoscowGeoJson:myType[] =  [{
    "type": "FeatureCollection",
    "metadata": {
        "name": "Без названия",
        "creator": "Yandex Map Constructor"
    },
    "features": [
        {
            "type": "Feature",
            "id": 0,
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            37.491998438171095,
                            55.71534380424217
                        ],
                        [
                            37.477578882507004,
                            55.72343448570666
                        ],
                        [
                            37.4688241522824,
                            55.72149675122378
                        ],
                        [
                            37.46676421575897,
                            55.718444623597236
                        ],
                        [
                            37.45466208868381,
                            55.71170971693813
                        ],
                        [
                            37.455777887633985,
                            55.71025598695155
                        ],
                        [
                            37.4564645331418,
                            55.70788144447838
                        ],
                        [
                            37.45955443792696,
                            55.70167787421798
                        ],
                        [
                            37.46607757025119,
                            55.70104776878769
                        ],
                        [
                            37.477407221130086,
                            55.702307969446096
                        ],
                        [
                            37.48882270269748,
                            55.70734836400371
                        ],
                        [
                            37.491998438171095,
                            55.71534380424217
                        ]
                    ]
                ]
            },
            "properties": {
                "description": "{\n\"restarauntId\": 1, \n\"deliveryPrice\": 100\n}",
                "fill": "#ed4543",
                "fill-opacity": 0.6,
                "stroke": "#ed4543",
                "stroke-width": "5",
                "stroke-opacity": 0.9
            }
        },
        {
            "type": "Feature",
            "id": 1,
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            37.44972724156898,
                            55.72332564318498
                        ],
                        [
                            37.454619590812136,
                            55.71160084159322
                        ],
                        [
                            37.466292564444956,
                            55.71857800889486
                        ],
                        [
                            37.46852416234533,
                            55.7217754589844
                        ],
                        [
                            37.47976798253578,
                            55.72390694632787
                        ],
                        [
                            37.481312934928354,
                            55.72913828356147
                        ],
                        [
                            37.44972724156898,
                            55.72332564318498
                        ]
                    ]
                ]
            },
            "properties": {
                "description": "{\"restarauntId\": 1, \"deliveryPrice\": 200}",
                "fill": "#ff40ff",
                "fill-opacity": 0.6,
                "stroke": "#7a7a7a",
                "stroke-width": 5,
                "stroke-opacity": 0.9
            }
        }
    ]
}]
 


describe('Тестирование функции object contain', () =>{
    test('Метро славянски бульвар не входит в зону доставки', () =>{
        // Точка славянского бульваара
        const point:[number,number] = [ 37.472885, 55.730642]

        
        const obj = objectContain(MoscowGeoJson, point)
        expect(obj).toEqual(null)
        // expect(1+1).toEqual(2)
    })
    test('Доставка в океанию выйдет 200 рублей', () =>{
        // Точка океании
        const point:[number,number] = [ 37.47702, 55.727683,]
        const obj = objectContain(MoscowGeoJson, point)
        expect(obj).toStrictEqual( {
            "type": "Feature",
            "id": 1,
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            37.44972724156898,
                            55.72332564318498
                        ],
                        [
                            37.454619590812136,
                            55.71160084159322
                        ],
                        [
                            37.466292564444956,
                            55.71857800889486
                        ],
                        [
                            37.46852416234533,
                            55.7217754589844
                        ],
                        [
                            37.47976798253578,
                            55.72390694632787
                        ],
                        [
                            37.481312934928354,
                            55.72913828356147
                        ],
                        [
                            37.44972724156898,
                            55.72332564318498
                        ]
                    ]
                ]
            },
            "properties": {
                "description": "{\"restarauntId\": 1, \"deliveryPrice\": 200}",
                "fill": "#ff40ff",
                "fill-opacity": 0.6,
                "stroke": "#7a7a7a",
                "stroke-width": 5,
                "stroke-opacity": 0.9
            }
        })
        expect(JSON.parse(obj?.properties?.description).deliveryPrice).toEqual(200)
  
    })
})