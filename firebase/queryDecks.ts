import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

interface Card {
  id: string;
  term: string;
  definition: string;
}

interface Deck {
  id: string;
  name: string;
  cards: Card[];
  description: string;
}

export async function queryDecks(search?: string): Promise<Deck[]> {
  try {
    const response = await fetch('/api/auth/validate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const userData = await response.json();

    const userDecksCollection = collection(db, `users/${userData.uid}/decks`);
    const deckSnapshot = await getDocs(userDecksCollection);

    const queriedDecks = deckSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        cards: data.cards || [],
        description: data.description
      } as Deck;
    });

    if (search) {
      return queriedDecks.filter(deck => deck.id === search);
    } else {
      return queriedDecks;
    }
  } catch (e) {
    console.error('Hiba történt a pakli(k) lekérdezése közben: ', e);
    throw e;
  }
}
