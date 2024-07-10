import { NextRequest, NextResponse } from "next/server";
import { decode } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get("OutSiteJWT");

    if (cookie) {
        const jwtValue = cookie.value;

        try {
            // Token dekódolása (nem validáció!)
            const decodedToken = decode(jwtValue);

            if (!decodedToken) {
                throw new Error("Invalid token");
            }

            console.log("Token verified:", decodedToken);
            return NextResponse.next();
        } catch (error) {
            console.error("Error decoding token:", error);
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        console.log("No token found");
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: "/"
};
