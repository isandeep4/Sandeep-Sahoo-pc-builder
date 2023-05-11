export interface AppState {
    productList: Products,
    selectedProducts: Product[],
    apiResponse?: boolean,
}
export interface Product {
    productName: string,
    price: string,
    count: number,
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
    selectedProducts: Product[],
}
