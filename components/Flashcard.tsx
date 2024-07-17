"use client"
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import Skeleton from 'react-loading-skeleton';

type FlashcardProps = {
    term?: string;
    definition?: string;
}

export default function Flashcard({ term, definition }: FlashcardProps) {

    const [isFlipped, setIsFlipped] = useState(false);

    function flipCard() {
        setIsFlipped(!isFlipped);
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" flipSpeedFrontToBack={0.3} flipSpeedBackToFront={0.3}>
            <div className="w-full flex justify-center bg-secondary rounded-lg border cursor-pointer border-border py-36" onClick={flipCard}>
                <p className='text-text font-bold text-4xl'>{term || <Skeleton />}</p>
            </div>
            <div className="w-full flex justify-center bg-secondary rounded-lg border cursor-pointer border-border py-36" onClick={flipCard}>
                <p className='text-text font-bold text-4xl'>{definition || <Skeleton />}</p>
            </div>
        </ReactCardFlip>
    )
}
