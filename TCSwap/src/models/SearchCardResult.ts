export type SearchCardResult = {
    id: number,
    card_owner: string,
    card_identifier: string,
    game: string,
    condition: string,
    num_owned: number,
    role: 'player'| 'store owner',
}
export interface MonsterCard extends SearchCardResult{
    level: number,
    atk: number,
    def: number,
    attribute: string,
}
export type cardImage = {
    id: number,
    image_url: string,
    image_url_small: string,
}

export type cardPrice = {
    ebay_price: string,
}