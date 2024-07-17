import NewDeckCard from "./NewDeckCard"
import { Button } from '@/components/ui/Button'
import React, { useState } from 'react'

type Props = {
    cards: any[]
    addCard: () => void
    removeCard: (id: number) => void
    handleCardChange: (id: number, field: string, value: string) => void
}

export default function CardsHolder({ cards, addCard, removeCard, handleCardChange }: Props) {
    return (
        <div className="flex flex-col gap-3">
            {cards.map((card: { uniqueId: React.Key | null | undefined; id: any; }, index: number) => (
                <NewDeckCard
                    key={card.uniqueId}
                    quant={index + 1}
                    onDelete={() => removeCard(card.id)}
                    onChange={(field, value) => handleCardChange(card.id, field, value)}
                />
            ))}
            <Button variant="secondary" onClick={addCard} className='p-6'>Új kártya</Button>
        </div>
    );
}