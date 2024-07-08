import React from 'react'
import LoginForm from '../../components/LoginForm'
import Image from 'next/image'

const login = () => {
  return (
    <>
      <div className="bg-background flex gap-3 flex-col justify-center items-center px-2 py-8 min-h-screen lg:py-5">
        <div className="">
          <Image src="/header.svg" width={300} height={300} alt="loginUserSvg" />
        </div>
        <div className="w-full max-w-md bg-secondary rounded-lg border border-neutral-800 p-5">
          <div className="pb-5 flex items-center gap-3">
            <div className="bg-tertitary border border-neutral-700 p-3 rounded-full">
              <Image className='' src="/icons/user.svg" width={32} height={32} alt="loginUserSvg" />
            </div>
            <h1 className='text-white font-black text-2xl'>Jelentkezz be a fiókodba</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default login