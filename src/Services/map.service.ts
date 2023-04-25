
import {geoContains} from 'd3-geo'
import {GeoJSON, GeoJsonObject, FeatureCollection, Feature,Geometry, GeoJsonProperties} from 'geojson'


export type myType={
    metadata?: {}
} & FeatureCollection

 export const testjson:myType[]  =[
    {
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
    },
    {
        "type": "FeatureCollection",
        "metadata": {
            "name": "Spires Москва",
            "creator": "Yandex Map Constructor"
        },
        "features": [
            {
                "type": "Feature",
                "id": 2,
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                30.265777627546232,
                                59.954088052660765
                            ],
                            [
                                30.226123849470067,
                                59.9625242854299
                            ],
                            [
                                30.20827106626692,
                                59.962266065381954
                            ],
                            [
                                30.20930103452865,
                                59.92807712595938
                            ],
                            [
                                30.262001077253256,
                                59.917908352808915
                            ],
                            [
                                30.275562326032563,
                                59.933677233332126
                            ],
                            [
                                30.304744760114584,
                                59.94082676074733
                            ],
                            [
                                30.30817798765364,
                                59.94401340112301
                            ],
                            [
                                30.241230050641942,
                                59.960716702686476
                            ],
                            [
                                30.23556522520248,
                                59.96037238999238
                            ],
                            [
                                30.265777627546232,
                                59.954088052660765
                            ]
                        ]
                    ]
                },
                "properties": {
                    "description": "{\"restarauntId\": 2, \"deliveryPrice\": 100}",
                    "fill": "#ed4543",
                    "fill-opacity": 0.6,
                    "stroke": "#ed4543",
                    "stroke-width": 5,
                    "stroke-opacity": 0.9
                }
            }
        ]
    }
]




export const objectContain = (geojson:myType[], point:[number,number] ): Feature<Geometry, GeoJsonProperties> | null =>{       
    const [filterResult] = testjson
        .map(restaraunt =>{
            const geo_in = restaraunt.features.filter(
                (e:any) => !geoContains(e, point)
            );
            if (geo_in.length) return geo_in[0]
            return false
        })
        .filter(e => e !== false)
    if (filterResult) return filterResult
    return null
}
