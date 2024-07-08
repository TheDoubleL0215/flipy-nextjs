"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import Link from 'next/link'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { setCookie } from 'cookies-next'
import { authErrorTranslate } from '@/util/auth-error-translate'
import Spinner from './ui/Spinner'

export default function LoginForm() {
    const [appError, setAppError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const [signInWithEmailAndPassword, userEmailSignIn, loadingEmailSignIn, errorEmailSignIn] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, userGoogleSignIn, loadingGoogleSignIn, errorGoogleSignIn] = useSignInWithGoogle(auth);

    useEffect(() => {
        //if error in email sign in
        if (errorEmailSignIn) {
            setAppError(authErrorTranslate(errorEmailSignIn.code))
        }

        //if error in google sign in
        if (errorGoogleSignIn) {
            setAppError(authErrorTranslate(errorGoogleSignIn.code))
        }
    }, [errorEmailSignIn, errorGoogleSignIn])

    useEffect(() => {
        //if user signed in with one of the methods
        if (userEmailSignIn || userGoogleSignIn) {
            const user = userEmailSignIn || userGoogleSignIn;
            setCookie("user", JSON.stringify(user?.user))
            router.push("/")
        }
    }, [userEmailSignIn, userGoogleSignIn, router])


    return (
        <div className="flex gap-5 flex-col justify-center items-center w-full">
            {appError &&
                <div className="border border-red-500 p-3 flex gap-3 rounded-lg">
                    <p className="text-red-500">{appError}</p>
                    <button type='button' className='text-red-500' onClick={() => setAppError("")}>
                        <X />
                    </button>
                </div>
            }

            {/*email field*/}
            <div className="w-full flex flex-col gap-1">
                <label className='text-white'>Email</label>
                <Input
                    type='text'
                    placeholder='nev@email.com'
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className='w-full' />
            </div>

            {/*password field*/}
            <div className="w-full flex flex-col gap-1">
                <label className='text-white'>Jelszó</label>
                <Input
                    type='password'
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className='w-full' />
            </div>

            <Button typeof='button' isLoading={loadingEmailSignIn} onClick={() => signInWithEmailAndPassword(email, password)} className='w-full flex justify-center items-center' variant='primary'>
                Bejelentkezés
            </Button>

            <div className="flex text-sm text-neutral-200 justify-between w-full">
                <Link href={""} className='hover:text-primary-500 hover:underline transition-all duration-150'>Elfelejtetted a jelszót?</Link>
                <div className="flex gap-1">
                    <p>Még nincs fiókod?</p>
                    <Link href={"/sign-up"} className='font-bold hover:text-primary-500 hover:underline transition-all duration-150'>Regisztrálj!</Link>
                </div>
            </div>

            {/*google login button*/}
            <Button className='w-full flex gap-3 font-normal items-center justify-center' variant='secondary' onClick={() => signInWithGoogle()}>
                <Image src="/google-color-icon.svg" width={20} height={20} alt="loginUserSvg" />
                <p>Bejelentkezés Google-el</p>
            </Button>
        </div>
    )
}
