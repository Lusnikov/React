import React from 'react'
import Container from '../../Components/styled/Container'
import { GeoObject, Map, YMaps } from '@pbe/react-yandex-maps'
import { testjson } from '../../Services/map.service'
import Delivery from './Delivery/Delivery'

type Props = {}


type ApiReturnedGeoJson = {
  type: "Polygon",
  coordinates: Array<Array<Array<number>>>
}

const mockData: ApiReturnedGeoJson[] = [
  {
    "type": "Polygon",
    "coordinates": [
        [
            [-74.000559, 40.72251],
            [-74.00528, 40.717046],
            [-73.989787, 40.712004],
            [-73.989959, 40.722738],
            [-74.000559, 40.72251]
        ].map(e => e.reverse())
    ]
  }
]


const Ordering = (props: Props) => {
  console.warn(testjson[0].features[0].geometry)
  return (
    <Container>
        <>
        <Delivery/>
        </>
    </Container>
  )
}

export default Ordering