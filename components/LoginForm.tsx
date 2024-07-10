"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import Link from 'next/link'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { authErrorTranslate } from '@/util/auth-error-translate'

export default function LoginForm() {
    const [appError, setAppError] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const router = useRouter()

    const [signInWithEmailAndPassword, userEmailSignIn, loadingEmailSignIn, errorEmailSignIn] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, userGoogleSignIn, loadingGoogleSignIn, errorGoogleSignIn] = useSignInWithGoogle(auth);

    type Payload = {
        uid: string | null;
        email: string | null;
    };

    const createJwtTokenRequest = async (payload: Payload) => {

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            // Redirect to the homepage
            router.push('/');

        } catch (e) {
            // Handle errors, displaying an error message
            console.error('Error during API call:', e);
        }
    };

    useEffect(() => {
        const user = userEmailSignIn || userGoogleSignIn;

        if (user) {
            const payload: Payload = {
                uid: user.user.uid,
                email: user.user.email
            };
            createJwtTokenRequest(payload);
        }
    }, [userEmailSignIn, userGoogleSignIn]);

    useEffect(() => {
        setLoading(loadingEmailSignIn || loadingGoogleSignIn);
    }, [loadingEmailSignIn, loadingGoogleSignIn]);



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

            <Button typeof='button' isLoading={loading} onClick={() => signInWithEmailAndPassword(email, password)} className='w-full flex justify-center items-center' variant='primary'>
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
