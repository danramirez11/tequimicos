export type Receipt = {
    id: string;
    client: string;
    date: string;
    hour: string;
    products: (ReceiptContainer | ReceiptLid | ReceiptChemical | ReceiptMisc | ReceiptContOnly)[]
    total: number;
    personal: string;
    payment: string;
    isDelivery: boolean;
    isFinished: boolean;
}

export type PriceBy = 'unit' | 'dozen' | 'hundred' | 'pack';
export type Spout = 'eco' | 'lab' 

export type ReceiptContainer = {
    priceBy: PriceBy;
    productId: string;
    id: string;
    type: 'container';
    name: string;
    price: number;
    quantity: number;
    lids: ReceiptLid[];
    pack: number;
}

export type ReceiptLid = {
    priceBy: PriceBy;
    productId: string;
    type: 'lid';
    id: string;
    name: string;
    price: number;
    quantity: number;
    colors: Color[];
    spout?: Spout;
    pack?: number;
    lazo?: Color[];
}

type Color = {
    name: string;
    quantity: number;
}

export type ReceiptChemical = {
    productId: string;
    type: 'chemical';
    id: string;
    name: string;
    price: number;
    quantity: number;
    unit: string;
}

export type ReceiptMisc = {
    productId: string;
    id: string;
    type: 'misc';
    name: string;
    price: number;
    priceUnit: number;
    quantity: number;
}

export type ReceiptContOnly = {
    id: string;
    type: 'containerOnly';
    name: string;
    price: number;
    quantity: number;
    priceBy: PriceBy;
    productId: string;
    pack: number;
}