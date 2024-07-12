import { useEffect, useState } from "react";
import DashboardDeckTile from "./DashboardDeckTile";
import { auth, db } from "@/firebase/config";
import { collection, doc, DocumentData, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "./ui/Spinner";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'; // Import the CSS
import NoDecksFound from "./NoDecksFound";

export default function DashboardDecks() {

    type Deck = {
        id: string;
    }

    const [user] = useAuthState(auth);
    const [decks, setDecks] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDecks = async () => {
            if (user) {
                const userDecksCollection = collection(db, `users/${user.uid}/decks`);
                const deckSnapshot = await getDocs(userDecksCollection);
                const deckList = deckSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDecks(deckList);
                console.log(deckList);
                setLoading(false);
            }
        };
        getDecks();
    }, [user]);


    return (
        <div className="flex flex-wrap gap-3 w-full">
            {loading ? (
                // Display skeletons while loading
                Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="">
                        <Skeleton className="flex max-sm:w-full flex-col w-64" height={150} width={256} />
                    </div>
                ))
            ) : (
                decks.length === 0 ? <NoDecksFound /> : decks.map(deck => (
                    <DashboardDeckTile
                        key={deck.id}
                        name={deck.name}
                        description={deck.description}
                        cards={deck.cards.length} />
                ))
            )}
        </div>
    );
}
