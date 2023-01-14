type Ingridients  = {
    price: number,
    name: string,
    idIngridient: number
}

type CompoPosition = {
    positionName: string,
    content: {id_productPrice: number, productName: string, added: number}[]
}

type ComboVariation = {
    defaultPrice: number,
    positionArray: CompoPosition[]
}

type ProductVariation = {
    volume: string,
    id: number,
    price: number
}

type Menu = {
    productName: string,
    idCombo: null | number,
    description: string,
    url: string,
    productType: string,
    ingridients: null | Ingridients[],
    variations: ComboVariation | ProductVariation[]
}

type ComboElement = {
    productName: string,
    idCombo:  number,
    description: string,
    url: string,
    productType: string,
    ingridients: null ,
    variations: ComboVariation 
}

type StandartElement = {
    productName: string,
    idCombo:  null,
    description: string,
    url: string,
    productType: string,
    ingridients: Ingridients[] ,
    variations: ProductVariation[] 
}

type ComboCartItem = {
    idCart: number[],
    idCombo: number,
    name: string,
    url: string,
    idProductPrice: null,
    productPrice: number,
    count: number,
    selectedIngrigients: null,
    existingIngridients: null,
    comboContent: string
}
type StandartCartItem = {
    idCart: number[],
    idCombo: null,
    name: string,
    url: string,
    idProductPrice: number,
    productPrice: number,
    count: number,
    selectedIngrigients: string[],
    existingIngridients: Ingridients[],
    comboContent: null
}


type Cart = (StandartCartItem | ComboCartItem)[]


type User = {
    userName: string,
    bonuses: number,
    userId: number,
    cart : Cart,
    cartStatus: "waiting" | "loaded"
}
type TsendInfo ={
    email: string,
    password: string
}

type SignInResponse = {
    accessToken: string,
    user: User

}


export {
    type Menu,
    type User,
    type TsendInfo,
    type SignInResponse,
    type ComboElement,
    type StandartElement ,
    type ComboVariation ,
    type ProductVariation,
    type Ingridients,
    type Cart ,
    type CompoPosition ,
    type StandartCartItem ,
    type ComboCartItem
}