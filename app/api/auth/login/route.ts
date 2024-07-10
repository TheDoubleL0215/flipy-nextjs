import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: Request) {
    const body = await request.json();
    const { uid, email } = body;
    const secret = process.env.JWT_SECRET || "";
    const token = sign(
        {
            uid, email
        },
        secret,
        {
            expiresIn: MAX_AGE
        }
    );

    const serialized = serialize("OutSiteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/",
    });


    const response = {
        message: "Authenticated"
    };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Set-Cookie': serialized }
    });
}
