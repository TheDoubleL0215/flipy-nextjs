import { useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import Skeleton from 'react-loading-skeleton';

interface FlashcardProps {
    term: string | undefined;
    definition: string | undefined;
    onFlip: (flipped: boolean) => void;
    isFlipped: boolean;
}

export default function Flashcard({ term, definition, onFlip, isFlipped }: FlashcardProps) {
    const flipCard = () => {
        onFlip(!isFlipped);
    };

    useEffect(() => {
        onFlip(isFlipped);
    }, [isFlipped, onFlip]);

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" flipSpeedFrontToBack={0.3} flipSpeedBackToFront={0.3}>
            <div className="w-full flex justify-center bg-secondary rounded-lg border cursor-pointer border-border py-36" onClick={flipCard}>
                <p className='text-text font-bold text-4xl'>{term || <Skeleton />}</p>
            </div>
            <div className="w-full flex justify-center bg-secondary rounded-lg border cursor-pointer border-border py-36" onClick={flipCard}>
                <p className='text-text font-bold text-4xl'>{definition || <Skeleton />}</p>
            </div>
        </ReactCardFlip>
    );
}
