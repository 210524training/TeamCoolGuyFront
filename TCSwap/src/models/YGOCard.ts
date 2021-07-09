export const YGOCARD_WIDTH = 59;
export const YGOCARD_HEIGHT = 86;

export type cardImage = {
    id: number,
    image_url: string,
    image_url_small: string,
}

export default interface YGOCard{
    name: string,
    type: string, // example values are Normal Monster, Effect Monster, Synchro Monster, Spell Card or Trap Card
    desc: string,
    race: string, // values like Spellcaster, Warrior, Insect, Field, Equip, Counter
    card_images: cardImage[],
}

export interface MonsterCard extends YGOCard{
    level: number,
    atk: number,
    def: number,
    attribute: string,
}