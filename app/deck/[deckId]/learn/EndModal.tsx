"use client"

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button } from '../../../../components/ui/Button'
import congratsMessages from '@/util/congratsMessages'
import { redirect, useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from 'react'



export default function Modal({ open, setOpen, know, forget, pathname }: {
    open: boolean,
    setOpen: (open: boolean) => void
    know: number
    forget: number
    pathname: string
}) {
    const router = useRouter()
    const [messsage, setMessage] = useState('')

    useEffect(() => {
        setMessage(congratsMessages((know / (know + forget)) * 100))
    }, [messsage, know, forget])

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
                                    {messsage}
                                </DialogTitle>
                            </div>
                            <div className="w-full bg-red-500 rounded-full h-2.5 ">
                                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${(know / (know + forget)) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between">
                                {know > 0 && <p className='text-primary-500 font-bold text-xl'>{`${((know / (know + forget)) * 100).toString().substring(0, 3)}%-át tudod`}</p>}
                                {forget > 0 && <p className='text-red-500 font-bold text-xl'>{`${((forget / (know + forget)) * 100).toString().substring(0, 3)}%`}</p>}
                            </div>
                        </div>
                        <div className="bg-secondary px-4 py-3 sm:flex gap-3 sm:flex-row-reverse sm:px-6">
                            {(know / forget) == 1 && <Button
                                typeof="button"
                                variant='primary'
                                onClick={() => setOpen(false)}
                            >
                                Tovább
                            </Button>}
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
