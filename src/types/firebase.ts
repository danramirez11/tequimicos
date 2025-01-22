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
}

export type Client = {
    id: string;
    name: string;
}