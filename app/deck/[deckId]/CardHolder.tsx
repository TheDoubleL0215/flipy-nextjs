import { Deck } from '@/types/DeckType';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function CardHolder({ isLoading, deckData }: {
    deckData: Deck | null;
    isLoading: boolean;
}) {
    return (
        <div className="flex flex-col gap-3">
            {isLoading ? (
                <Skeleton className='w-full h-32' />
            ) : (
                deckData?.cards?.map((card) => (
                    <div key={card.id} className="p-3 bg-secondary rounded-lg flex justify-between border border-border ">
                        <div className="w-full py-8 text-center">
                            <p className="text-sm text-neutral-400 font-semibold">Fogalom</p>
                            <p className="font-bold text-2xl">{card.term}</p>
                        </div>
                        <div className="border-l border-border mx-3"></div>
                        <div className="w-full py-8 text-center">
                            <p className="text-sm text-neutral-400 font-semibold">Definíció</p>
                            <p className="font-bold text-2xl">{card.definition}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
