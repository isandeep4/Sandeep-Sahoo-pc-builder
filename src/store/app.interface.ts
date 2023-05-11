export interface AppState {
    productList: Products,
    selectedProducts: Products,
    apiResponse?: boolean,
}
export interface Products {
    processorList: Processor[],
    motherboardList: Motherboard[],
    ramList: Ram[],
}

export interface Processor {
    productName: string,
    price: string,
    count: number,
}
export interface Motherboard {
    productName: string,
    price: string,
    count: number,
}
export interface Ram {
    productName: string,
    price: string,
    count: number,
}
export interface CartItems {
    selectedProducts: Products,
}
