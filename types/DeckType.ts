export type Deck = {
    id: string;
    name: string;
    cards: {
        id: string;
        term: string;
        definition: string;
    }[];
    description: string;
}