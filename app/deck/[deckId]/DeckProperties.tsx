import { Deck } from '@/types/DeckType'
import React from 'react'
import Skeleton from 'react-loading-skeleton';



export default function DeckProperties({ isLoading, deckData }: {
    deckData: Deck | null
    isLoading: boolean
}) {
    return (
        <div className='bg-secondary flex flex-col gap-5 rounded-lg border border-border w-full p-8'>
            <div className="">
                <p className='text-neutral-400 text-sm font-bold'>Pakli neve</p>
                {isLoading ? (
                    <Skeleton className='h-10' />
                ) : (
                    <h1 className='text-text text-4xl font-bold'>{deckData?.name}</h1>
                )}
            </div>
            <div className="">
                <p className='text-neutral-400 text-sm font-bold'>Leírás</p>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <h1 className='text-text text-2xl font-bold'>{deckData?.description}</h1>
                )}
            </div>
        </div>
    );
};

