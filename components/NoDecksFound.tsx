import React from 'react'

export default function NoDecksFound() {
    return (
        <div className='bg-secondary rounded-lg border border-neutral-800 w-full flex flex-col justify-center items-center'>
            <h1 className='text-text text-2xl font-bold mb-3'>Nincsenek pakliaid</h1>
            <p className='text-text'>Hozz létre új paklit az "Új pakli létrehozása gombbal, vagy idekattintva"</p>
        </div>
    )
}
