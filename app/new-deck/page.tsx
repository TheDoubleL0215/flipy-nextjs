"use client"

import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/Button'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/Input'
import NewDeckCard from './NewDeckCard'
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from '@/firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

export default function NewDeck() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [cards, setCards] = useState([{ id: crypto.randomUUID() }]);
    const [user] = useAuthState(auth)
    const router = useRouter()


    //adds new card
    const addCard = () => {
        setCards([...cards, { id: crypto.randomUUID() }]);
    };

    //removes card
    const removeCard = (id: string) => {
        setCards(cards.filter(card => card.id !== id));
    };

    //updates card with new data
    const handleCardChange = (id: string, field: string, value: string) => {
        setCards(cards.map(card =>
            card.id === id ? { ...card, [field]: value } : card
        ));
    };

    //saves new deck to Firestore
    const handleSave = async () => {
        if (name && user) {
            try {
                const newDeck = { name, description, cards }
                console.log(newDeck)
                await addDoc(collection(db, "users", user.uid, "decks"), newDeck)
                Swal.fire({
                    background: "rgb(24, 24, 27)",
                    icon: "success",
                    title: `A(z) ${name} paklid sikeresen létrehozva!`,
                    color: "rgb(235, 233, 252)",
                    iconColor: "#41c23e",
                    showConfirmButton: false,
                    timer: 2000

                }).then(() => {
                    router.push('/')
                });
            } catch (e) {
                console.log("Hiba mentés közben: ", e)
            }

        } else {
            setNameError('Adj meg egy nevet a paklinak!')
        }
    };

    //clears name error when name changes
    useEffect(() => {
        name ? setNameError('') : null
    }, [name])

    return (
        <>
            <NavBar />

            <div className="flex max-md:flex-col">
                <div className="md:sticky max-md:top-0 top-20 px-5 sm:w-full h-full flex flex-col gap-3 bg-background rounded-lg">
                    <h1 className='text-text text-3xl font-bold'>Új pakli létrehozása</h1>
                    <div className="w-full flex flex-col gap-1">
                        <Input
                            placeholder="Pakli neve"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            className={`bg-secondary w-full ${nameError ? 'border-error' : 'border-neutral-700'}`} />
                        {nameError && <p className='text-error'>{nameError}</p>}
                    </div>
                    <textarea
                        placeholder='Leírás'
                        rows={3}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        className="bg-secondary border resize-none border-neutral-700 text-sm rounded-lg p-2.5 placeholder-neutral-400 text-white" />
                    <Button
                        variant="primary"
                        onClick={() => handleSave()}
                        className='max-w-fit'>
                        Mentés
                    </Button>
                </div>
                <div className="px-5 my-7 sm:w-full h-full flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        {cards.map((card, index) => (
                            <NewDeckCard
                                key={card.id}
                                quant={index + 1}
                                onDelete={() => removeCard(card.id)}
                                onChange={(field, value) => handleCardChange(card.id, field, value)}
                            />
                        ))}
                        <Button variant="secondary" onClick={addCard} className='p-6'>Új kártya</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
