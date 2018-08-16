export interface Armor {
    id?: number;
    armorName: string;
    armorType: ArmorTypeEnum;
    armorStats: Stats;
}

export interface Stats {
    health: number;
    power: number;
    defence: number;

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
