export type Combination = {
    id: string;
    name: string;
    prices: {
        unit: number;
        dozen: number;
        hundred: number;
        pack: number;
    };
    pack: number;
    lids: CombinationLid[];
}

export type CombinationLid = {
    id: string;
    name: string;
    prices: {
        unit: number;
        dozen: number;
        hundred: number;
        pack: number;
    };
}

export type Container = {
    id: string;
    name: string;
    pack: number;
    prices: {
        unit: number;
        dozen: number;
        hundred: number;
        pack: number;
    };
    quantity: number;
    type: 'container';
    can_be_sell_alone?: boolean;
}

export type Lid = {
    id: string;
    name: string;
    pack: number;
    prices: {
        unit: number;
        dozen: number;
        hundred: number;
        pack: number;
    };
    colors: unknown;
    type: 'lid';
    can_be_sell_alone?: boolean;
}

export type Client = {
    id: string;
    name: string;
}