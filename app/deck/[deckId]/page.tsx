"use client"

import { useEffect, useState } from 'react';
import { queryDecks } from '@/firebase/queryDecks';
import { useRouter } from 'next/navigation';
import DeckProperties from './DeckProperties';
import { Deck } from '@/types/DeckType';
import NavBar from '@/components/NavBar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CardHolder from './CardHolder';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function Page({ params }: { params: { deckId: string } }) {
    const router = useRouter();
    const [deckData, setDeckData] = useState<Deck | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <>
            <NavBar />
            <div className="flex max-md:flex-col gap-10">
                <div className="px-5 md:sticky md:top-[90px] sm:w-full h-full flex flex-col gap-3 bg-background rounded-lg">
                    <DeckProperties isLoading={isLoading} deckData={deckData} />
                    <div className="flex gap-3 w-full">
                        <Button className='flex w-full justify-center items-center gap-3' onClick={() => router.push(`/deck/${params.deckId}/learn`)}>
                            <Image src="/icons/learnSetLogo.svg" width={32} height={32} alt="learn"></Image>
                            <p className="text-2xl font-bold">Tanulás</p>
                        </Button>
                        <Button className='flex w-full justify-center items-center gap-3'>
                            <Image src="/icons/testSheetLogo.svg" width={32} height={32} alt="learn"></Image>
                            <p className="text-2xl font-bold">Teszt</p>
                        </Button>
                    </div>
                </div>
                <div className="px-5 sm:w-full h-full flex flex-col gap-3">
                    <CardHolder isLoading={isLoading} deckData={deckData} />
                </div>
            </div>
        </>
    );
}
