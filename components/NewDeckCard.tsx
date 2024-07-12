import React from 'react'
import { Input } from './ui/Input'
import { Trash2 } from 'lucide-react'

type Props = {
    quant: number
    onDelete: () => void
    onChange: (term: string, value: string) => void
}

export default function NewDeckCard({ quant, onDelete, onChange }: Props) {
    return (
        <div className="flex bg-secondary rounded-lg py-5 items-center">
            <div className="w-14">
                <h1 className='text-neutral-400 text-3xl text-center font-bold'>{quant}</h1>
            </div>
            <div className="flex max-sm:flex-col gap-3 w-full">
                <Input placeholder='Fogalom' className='sm:w-full' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("term", e.target.value)} />
                <Input placeholder='Definíció' className='sm:w-full' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("definition", e.target.value)} />
            </div>
            <div className="p-3">
                <Trash2 onClick={onDelete} className='text-neutral-500 hover:text-primary-500 cursor-pointer transition-colors duration-200' />
            </div>
        </div>
    )
}
