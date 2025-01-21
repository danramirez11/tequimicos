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

type CombinationLid = {
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
}

export type Lid = {
    name: string;
    pack: number;
    prices: {
        unit: number;
        dozen: number;
        hundred: number;
        pack: number;
    };
    quantity: number;
    colors: string[];
    type: 'lid';
}

export type Client = {
    id: string;
    name: string;
}