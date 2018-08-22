export interface Armor {
    id?: number;
    armorName: string;
    armorType: ArmorTypeEnum;
    armorLevel: number;
    armorStats: Stats;
}

export interface Stats {
    health: number;
    power: number;
    defense: number;

}

export enum ArmorTypeEnum {
    Head= 'Head',
    Shoulder= 'Shoulder',
    Neck= 'Neck',
    Arm= 'Arm',
    Hand= 'Hand',
    Torso= 'Torso',
    Waist= 'Waist',
    Leg= 'Leg',
    Foot= 'Foot'
}

export interface HttpErrorTracker {
    errorNumber: number;
    message: string;
    friendlymessage: string;
}


