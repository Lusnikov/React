import { YMaps, Map, GeoObject, Placemark, Polygon } from '@pbe/react-yandex-maps'
import React, { useEffect, useState } from 'react'
import { objectContain,  } from '../../../Services/map.service';

import { booleanPointInPolygon, polygon as polig } from '@turf/turf';

type Props = {}

const apiResponse = [
    [
        [
            [-73.939877, 40.737633],
            [-73.94434, 40.708751],
            [-73.910866, 40.700422],
            [-73.912926, 40.736332],
            [-73.939877, 40.737633]
        ]
    ],
    [
        [
            [-74.000559, 40.72251],
            [-74.00528, 40.717046],
            [-73.989787, 40.712004],
            [-73.989959, 40.722738],
            [-74.000559, 40.72251]
        ]
    ],
    [
        [
            [-73.993092, 40.701073],
            [-73.999443, 40.686236],
            [-73.959103, 40.6753],
            [-73.948803, 40.6986],
            [-73.993092, 40.701073]
        ]
    ]
  
]

//   const turfPolygon = polig(polygon.coordinates)

//   console.log(booleanPointInPolygon([1, 1], turfPolygon));

const Delivery = (props: Props) => {
  const [selectedAdress, setPoints] = useState<[number, number] | null>(null)
  const [adressIsValid, setAdressIsValid] = useState<'init' | 'loading'| 'notValid' | 'valid'>('loading')

//   иммитируем запрос
useEffect(() => {
    setTimeout(() => {
        setAdressIsValid('init')
    }, 1000);
}, [])

  useEffect(() => {
    if (adressIsValid === 'loading' ) return
    if (!selectedAdress) return setAdressIsValid('notValid')
    const arr = JSON.parse(JSON.stringify(apiResponse)) as typeof apiResponse
    const result = arr.map(e => {
        const turfPolygon =  polig(e)
        const coordReversed = [...selectedAdress].reverse()
        const res = booleanPointInPolygon(coordReversed, turfPolygon)

        return res;
    }).find(e => e === true)
    if (!result) return setAdressIsValid('notValid')
    setAdressIsValid('valid')
 
  }, [selectedAdress])
  return (
    <>
        {adressIsValid === 'notValid' && "Не валидный адрес, выберите корректный"}
        {adressIsValid === 'valid' && "адрес подходит"}
         <YMaps>
              <Map  
                  width={'100%'}
                  instanceRef={(ref) => {
                    console.log(1)
                    if (ref) {
                      ref.events.add("click", (e) => {
                        setPoints( e.get('coords'))
                      });

                      
                    }
                  }}
                  defaultState={{ center:     [-74.000559, 40.72251].reverse(), zoom: 9 }}   
               >
                    <Placemark
                        geometry={selectedAdress ?? []}
                    />
                 
                 {apiResponse.map(e => {
                    const copy = JSON.parse(JSON.stringify(e))  as typeof e
                    const res = copy.map(e => e.map(el => el.reverse()))
                    return <Polygon
                    instanceRef={(ref) => {
                        if (ref) {
                            console.log(ref)
                             ref.events.add("click", (e) => {
                                setPoints( e.get('coords'))
                              
                             });
                             
                           }
                    }}
                    geometry={res}
                  />
                 })}
                  
               </Map>
          </YMaps>
    </>
  )
}

export default Delivery