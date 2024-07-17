import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

export async function GET() {
    const cookieStore = cookies()
    const jwtToken = cookieStore.get('OutSiteJWT')
    if (jwtToken) {
        const decodedToken = verify(jwtToken.value, process.env.JWT_SECRET as string);
        return new Response(JSON.stringify(decodedToken));
    }
    return new Response(JSON.stringify({ status: 401 }));
}