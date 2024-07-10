'use server'

import { cookies } from 'next/headers'

export async function deleteUserCookie() {
    cookies().delete('OutSiteJWT')
}