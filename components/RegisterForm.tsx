"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import Link from 'next/link'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/config'
import { X } from 'lucide-react'
import { authErrorTranslate } from '@/util/auth-error-translate'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import { createJwtTokenRequest } from '@/hooks/userJwtTokenRequest'

export default function RegisterForm() {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const [createUserWithEmailAndPassword, userEmailSignUp, loadingEmailSignUp, errorEmailSignUp] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, userGoogleSignUp, loadingGoogleSignUp, errorGoogleSignUp] = useSignInWithGoogle(auth);

    type Payload = {
        uid: string | null;
        email: string | null;
    };


    useEffect(() => {
        //if error in email sign in
        if (errorEmailSignUp) {
            setError(authErrorTranslate(errorEmailSignUp.code))
        }

        //if error in google sign in
        if (errorGoogleSignUp) {
            setError(authErrorTranslate(errorGoogleSignUp.code))
        }
    }, [errorEmailSignUp, errorGoogleSignUp])

    useEffect(() => {
        setLoading(loadingEmailSignUp || loadingGoogleSignUp);
    }, [loadingEmailSignUp, loadingGoogleSignUp]);

    useEffect(() => {
        const user = userEmailSignUp || userGoogleSignUp;

        if (user) {
            const payload: Payload = {
                uid: user.user.uid,
                email: user.user.email
            };
            createJwtTokenRequest(payload).then(() => {
                router.push('/');
            }).catch(e => {
                console.error('Error during API call:', e);
                setError('Failed to create JWT token');
            });
        }
    }, [userEmailSignUp, userGoogleSignUp]);



    return (
        <div className="flex gap-5 flex-col justify-center items-center w-full">
            {error &&
                <div className="border border-red-500 p-3 flex gap-3 rounded-lg">
                    <p className="text-red-500">{error}</p>
                    <button type='button' className='text-red-500' onClick={() => setError("")}>
                        <X />
                    </button>
                </div>
            }
            {/*email field*/}
            <div className="w-full flex flex-col gap-1">
                <label className='text-white'>Email</label>
                <Input
                    type='email'
                    placeholder='nev@email.com'
                    className='w-full'
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            </div>

            {/*password field*/}
            <div className="w-full flex flex-col gap-1">
                <label className='text-white'>Jelszó</label>
                <Input
                    type='password'
                    placeholder="••••••••"
                    className='w-full'
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            </div>

            {/*confirm password field*/}
            <div className="w-full flex flex-col gap-1">
                <label className='text-white'>Jelszó megerősítése</label>
                <Input
                    type='password'
                    placeholder="••••••••"
                    className='w-full'
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
            </div>

            <Button className='w-full' variant='primary' isLoading={loadingEmailSignUp} onClick={() => password === confirmPassword ? createUserWithEmailAndPassword(email, password) : setError("A jelszavak nem egyeznek")}>Regisztrálás</Button>
            <div className="flex text-sm text-neutral-200 justify-end w-full">
                <div className="flex gap-1">
                    <p>Már van fiókod?</p>
                    <Link href={"/login"} className='font-bold hover:text-primary-500 hover:underline transition-all duration-150'>Jelentkezz be!</Link>
                </div>
            </div>

            {/*google login button*/}
            <Button className='w-full flex gap-3 font-normal items-center justify-center' variant='secondary' onClick={() => signInWithGoogle()}>
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google logo" />
                <p>Regisztrálás Google-el</p>
            </Button>
        </div>
    )
}



