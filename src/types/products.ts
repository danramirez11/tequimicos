export type Receipt = {
    client: string;
    date: string;
    hour: string;
    products: (ReceiptContainer | ReceiptLid | ReceiptChemical)[]
    total: number;
    personal: string;
    payment: string;
    isDelivery: boolean;
    isFinished: boolean;
}

export type PriceBy = 'unit' | 'dozen' | 'hundred' | 'pack';

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
    priceBy: 'unit' | 'dozen' | 'hundred' | 'pack';
    productId: string;
    type: 'lid';
    id: string;
    name: string;
    price: number;
    quantity: number;
    colors: Color[];
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