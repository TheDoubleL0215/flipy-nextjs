"use client"

import NavBar from '@/components/NavBar'
import { queryDecks } from '@/firebase/queryDecks';
import { Deck } from '@/types/DeckType';
import { Button } from '@/components/ui/Button';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Flashcard from '@/components/Flashcard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Modal from './EndModal';

export default function LearnPage({ params }: { params: { deckId: string } }) {
    const router = useRouter();
    const pathname = usePathname();
    const [deckData, setDeckData] = useState<Deck | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cardIndex, setCardIndex] = useState(0);
    const [isEndModalOpen, setIsEndModalOpen] = useState(false);
    const [know, setKnow] = useState(0);
    const [forget, setForget] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = (flipped: boolean) => {
        setIsFlipped(flipped);
    };

    useEffect(() => {
        queryDecks(params.deckId).then((deckList: Deck[]) => {
            if (deckList.length > 0) {
                setDeckData(deckList[0]);
                setIsLoading(false);
            } else {
                router.push("/");
            }
        });
    }, [params.deckId, router]);

    console.log("Ez a hossza: ", deckData?.cards.length);

    const handleButton = (learnt: boolean) => {
        if (learnt) setKnow(know + 1); else setForget(forget + 1);
        setIsFlipped(false);

        setTimeout(() => {
            setCardIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                if (deckData && newIndex === deckData.cards.length) {
                    console.log("End of deck");
                    setIsEndModalOpen(true);
                    return prevIndex;
                }
                console.log("Current card index: ", newIndex);
                return newIndex;
            });
        }, 100); // 300ms delay
    };

    return (
        <>
            <NavBar />
            <div className="px-8 lg:w-1/2 mx-auto flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-text">{deckData?.name || <Skeleton />}</h1>
                <div className="w-full bg-tertitary rounded-full h-2.5 my-2">
                    {deckData ? <div className="bg-primary-500 h-2.5 rounded-full transition-all duration-300" style={{ width: deckData?.cards.length > 0 ? `${((cardIndex + 1) / deckData.cards.length) * 100}%` : '100%' }}></div> : <Skeleton />}
                </div>
                <Flashcard
                    term={deckData?.cards[cardIndex].term}
                    definition={deckData?.cards[cardIndex].definition}
                    onFlip={handleFlip}
                    isFlipped={isFlipped}
                />
                <div className="flex w-full gap-3">
                    <Button className='w-full transition-all duration-300' onClick={() => handleButton(false)}>Nem tudom</Button>
                    <Button className='w-full transition-all duration-300' onClick={() => handleButton(true)}>Tudom</Button>
                </div>
            </div>
            <Modal open={isEndModalOpen} setOpen={setIsEndModalOpen} know={know} forget={forget} pathname={pathname} />
        </>
    )
}
