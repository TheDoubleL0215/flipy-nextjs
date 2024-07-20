"use client"

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button } from '../../../../components/ui/Button'
import congratsMessages from '@/util/congratsMessages'
import { redirect, useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function Modal({ open, setOpen, know, forget, pathname }:
    {
        open: boolean
        setOpen: (open: boolean) => void
        know: number
        forget: number
        pathname: string
    }
) {
    const router = useRouter()
    const [message, setMessage] = useState('')
    console.log(know, forget, pathname)

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-tertitary bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg border border-border bg-background text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-secondary p-6 flex flex-col gap-3">
                            <div className="mt-3 text-start sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className=" font-semibold text-2xl text-text">
                                    {message}
                                </DialogTitle>
                            </div>
                            <div className="flex justify-start items-center">
                                <div className="w-full">
                                    <CircularProgressbar
                                        styles={{
                                            path: { stroke: 'rgb(65 194 62)' },
                                            trail: { stroke: 'rgb(39 39 42)' },
                                            text: { fill: 'rgb(65 194 62)' },
                                        }}
                                        className='h-24 font-bold text-5xl'
                                        strokeWidth={12}
                                        minValue={0}
                                        maxValue={100}
                                        text={`${know}/${know + forget}`}
                                        value={((know / (know + forget)) * 100)} // Use the delayed progress value
                                    />
                                </div>
                                <div className="w-full">
                                    {know > 0 && <p className='text-primary-500 font-bold text-xl'>{`${((know / (know + forget)) * 100).toString().substring(0, 3)}%-át tudod`}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="bg-secondary px-4 py-3 sm:flex gap-3 sm:flex-row-reverse sm:px-6">
                            {(know / (forget + know)) != 1 ? <Button
                                typeof="button"
                                variant='primary'
                                onClick={() => setOpen(false)}
                            >
                                Tovább
                            </Button> : null}
                            <Button
                                typeof="button"
                                variant='secondary'
                                onClick={() => router.push(pathname.split('/').slice(0, -1).join('/'))}
                            >
                                Kilépés
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
