import { NextRequest, NextResponse } from "next/server";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET || "";

export function middleware(request: NextRequest) {

    const cookie = request.cookies.get("OutSiteJWT");

    if (cookie) {
        const jwtValue = cookie.value;
        const decodedToken = decode(jwtValue);

        if (!decodedToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
    } else {
        console.log("No token found");
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/", "/new-deck"]
};
